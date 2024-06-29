import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const text1 = `La implementación de una autenticación mediante JWT consiste en tres procesos escenciales, el primero s
la generación del token al iniciar sesión, luego se debe implementar un interceptor que ocurre cada vez que se realiza una peticion a la API
que se encarga de verificar si en la petición se envió correctamente un token, y finalmente se implementan funciones para
verificar la validez del token`

const text2 = `Dependiendo del framework, el interceptor se llama FilterChain en el caso de Spring Boot y además se debe configurar Una cadena seguridad
la cual ejecuta el interceptor, en Django se le llama decorador y en Express recibe el nombre de middleware.`

const code1 = `//Archivo src/main/Services/JwtService.java
//interfaz que contiene la de declaración de la función de generar token
public interface JwtService {
    //Función de generación de token
    public String getToken(UserDetails user, TokenType tokenType);
}

//Archivo src/main/Services/ServiceImpl/JwtServiceImpl.java
//Servicio encargado de implementar la interfaz, la anotación Service permite inyectarla donde se requiera
@Service
public class JwtServiceImpl implements JwtService {

    //Uso de clave secreta localizada en application.properties
    @Value("${`SECRETKEY`}")
    private String secretKey;   
    //Implementación de la función de la interfaz
    @Override
    public String getToken(UserDetails user, TokenType tokenType){
        return getToken(new HashMap<>(), user, tokenType);
    }

    //Generación de token interna del servicio la cual no puede ser modificada por otras partes de código
    public String getToken(Map<String, Object> extraClaims, UserDetails user, TokenType tokenType) {
            Date now = new Date();
            long expirationMillis;

            //Configuraciónde vencimiento según el tipo de token
            if (tokenType == TokenType.RECOVERY) {
                expirationMillis = now.getTime() + 1000 * 60 * 20; // 20 minutos
                extraClaims.put("tokenType", TokenType.RECOVERY);
            } else {
                expirationMillis = now.getTime() + 1000 * 60 * 60 * 4; // 4 horas
                extraClaims.put("tokenType", TokenType.LOGIN);
            }
            //Codificación de clave secreta a base64
            String encodedKey = Base64.getEncoder().encodeToString(secretKey.getBytes());

            //Construcción del token en sí
            return Jwts.builder()
                    .setHeaderParam("alg", "HS256")
                    .setHeaderParam("typ", "JWT")
                    .setClaims(extraClaims)
                    .setSubject(user.getUsername())
                    .setIssuedAt(now)
                    .setExpiration(new Date(expirationMillis))
                    .signWith(SignatureAlgorithm.HS256, encodedKey)
                    .compact();
        }
}`

const code2 = `//Archivo src/main/Services/JwtService.java
    public interface JwtService {
        //Revisar si el token es de tipo login
        public boolean isTokenLogin(String token);
        //Obtener el usuario almacenado en el token
        String getUserNameFromToken(String token);
        //Validar token
        boolean isTokenValid(String token, UserDetails userDetails);
    }
    @Service
    public class JwtServiceImpl implements JwtService {
        @Override
        public String getUserNameFromToken(String token) {
            return getClaims(token,Claims::getSubject);
        }

        //Decodificación del token
        private Claims getAllClaims(String token){
            return Jwts.parserBuilder().setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes())).build().parseClaimsJws(token).getBody();
        }

        //Obtención de los datos del token decodificado
        public <T> T getClaims (String token, Function<Claims, T> claimsResolver){
            final Claims claims = getAllClaims(token);
            return claimsResolver.apply(claims);
        }
        //Implementación de verificación del tipo de token
        @Override
        public boolean isTokenLogin(String token) {
            Claims claims = getAllClaims(token);
            String tokenType = (String) claims.get("tokenType");
            return tokenType != null && tokenType.equals("LOGIN");
        }

        //Verificación del token, se verifica si este tiene un usuario valido y si no está vencido
        @Override
        public boolean isTokenValid(String token, UserDetails userDetails) {
            final String username = getUserNameFromToken(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        }
        //Verificación de expiración del token
        private Boolean isTokenExpired (String token){
            return getExpiration(token).before(new Date());
        }
        //Obtención de la expiración
        private Date getExpiration(String token){
            return getClaims(token, Claims::getExpiration);
        }
    }`

const code3 = `/*La implementación de la autenticación en Spring Boot requiere de programar una
cadena de filtrado que verifica el jwt y luego cargar esta a una cadena de filtrado de seguridad
la cual sobreescribe la configuración de Spring Security y permite autenticar mediante la clase
personalizada de filtro por JWT.*/

//Este archivo es la cadena de filtrado de JWT
//Archivo src/main/jwt/JwtAuthenticationFilter.java

//Se declara como un componente de la API
@Component
@RequiredArgsConstructor                     
/*Clase que se extiende de OncePerRequestFilter la cual hace que se ejecute automáticamente para
cada petición a la API*/
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    //Anotación que permite inyectar servicios
    @Autowired
    private JwtService jwtService;
    //Servicio predefinido de la clase UserDetails
    @Autowired
    private UserDetailsService userDetailsService;

    //Funcion que realiza el filtro
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //Se obtiene token
        final String token = getTokenFromRequest(request);
        final String username;
        if(token == null){
            filterChain.doFilter(request,response);
            //Si el token no existe retorna
            return;
        }
        //Si el token existe se genera la autenticación
        username = jwtService.getUserNameFromToken(token);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if(jwtService.isTokenValid(token,userDetails) && jwtService.isTokenLogin(token)){
                //Se instancia el objeto autenticador
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request,response);
    }

    //Obtención del token del encabezado o header de la petición http con el estandar Bearer de Oauth2.0
    private String getTokenFromRequest(HttpServletRequest request){
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer "))
        {
            return authHeader.substring(7);
        }
        return null;
    }
}

/*Con el filtro JWT creado se debe agregar una configuración personalizada de la aplicación para poder
autenticar*/

//Archivo src/main/Config/ApplicationConfig.java

//Anotación que indica que el archivo pesonaliza configuraciónes de la API
@Configuration
public class ApplicationConfig {
    @Autowired
    private UserRepository userRepository;

    //Se obtiene una instancia controlada del manejador de la autenticación
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }
    //Se obtiene una instancia controlada del provededor de autenticación
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
    //Se obtiene una instancia controlada del servicio de la clase UserDetails
    @Bean
    public UserDetailsService userDetailService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(()->new UsernameNotFoundException("Usuario no encontrado"));
    }
    //Se obitiene una instancia controlada de el codificador de contraseña
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

//Con estas configuraciónes hechas se debe junar ambas a la configuración de spring security
//Archivo src/main/Config/SecurityConfig.java

//Anotación que permite el uso de todos los origenes para el proceso de desarrollo local
@CrossOrigin("*")
@Configuration
//Anotación que habilita la seguridad a travéz de esta clase
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    //Inyección del filtro jwt y proveedor de autenticación
    @Autowired
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

    //Instancia controlada de cadena de seguridad
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        //Configuración de cors
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Collections.singletonList("*"));
        List<String> allowedmethods = new ArrayList<>();
        List<String> allowedHeaders = new ArrayList<>();
        allowedHeaders.add("Authorization");
        allowedHeaders.add("Content-Type");
        allowedmethods.add("GET");
        allowedmethods.add("POST");
        allowedmethods.add("PUT");
        allowedmethods.add("DELETE");
        allowedmethods.add("OPTIONS");
        corsConfig.setAllowedMethods(allowedmethods);
        corsConfig.setMaxAge(3600L);
        corsConfig.setAllowedHeaders(Collections.singletonList("*"));
        corsConfig.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authRequest ->
                        authRequest
                                //Deifnición de rutas no protegidas y protegidas por autenticación
                                .requestMatchers( "/api/auth/login").permitAll()
                                .requestMatchers( "/api/auth/register").permitAll()
                                .requestMatchers("/api/auth/recover-password").permitAll()
                                .requestMatchers("/api/auth/recover-authenticated").permitAll()
                                .anyRequest().authenticated()
                )
                .exceptionHandling(config -> config.authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
                .sessionManagement(sessionManager ->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                //Uso del filtro JWT previamente creado
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}`
const AuthenticationJwt = () => {
    return (
      <div className="flex flex-col">
       <TextBlock title="Implementación de autenticación por JWT"/>
       <TextBlock textContent={text1}/>
       <TextBlock textContent={text2}/>
       <TextBlock title="Generación de token."/>
       <CodeBlock 
        code1={code1}
        language1={"java"}
       />
        <TextBlock title="Verificación de token."/>
        <CodeBlock 
        code1={code2}
        language1={"java"}
       />
        <TextBlock title="Implementación de interceptores."/>
        <CodeBlock 
        code1={code3}
        language1={"java"}
       />
      </div>
    );
  };
  
  export default AuthenticationJwt;
  