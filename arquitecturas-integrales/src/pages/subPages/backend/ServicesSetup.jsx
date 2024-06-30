import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const text1 = `La capa de lógica de negocios se encarga de manejar todos los proceso sinternos de la aplicación
en el caso de ejemplo se manejan funciones sencillas de tipo CRUD además del envio de correos como parte del
proceso de recuperación de contraseña.`

const text2 = `Todas las funcionalidaes estan desarrolladas con la misma estructura en todos los front end, la cual es
se reciben los datos de los controladores, se declara un objeto de tipo response, se verifican casos donde se requiere
el uso de excepciones manuales se ejecuta la acción correspondiente y se devuelve la respuesta en formato tipo Json con
el formato HTTP correspondiente, en caso de que ocurra un error inesperado, todo este proceos está encerrado en un 
try-catch el cual se encargará de obtener el mensaje de error e informar al cliente del servidor el problema que se presenta
`
const text3 = `En el caso especifico de Spring Boot se debe realizar una configuración separada para el envio de correos electrónicos`

const code1 = `//Archivo src/main/Services/AuthService.java
//Interfaz que declara todos los métodos
public interface AuthService {
    public ResponseEntity<HashMap<String, Object>> sendRecoveryEmail(String email);
    public ResponseEntity<HashMap<String, Object>> login(LoginRequest request);
    public ResponseEntity<HashMap<String, Object>> register(RegisterRequest request);
    public ResponseEntity<HashMap<String, Object>> recoverPassword(RecoveryDTO request);
}

//Archivo src/main/services/AuthServiceImpl.java
//Clase que implementa los métodos de la interfaz

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JavaMailSender javaMailSender;


    //Envio de correo parar ecuperar contraseña
    @Override
    public ResponseEntity<HashMap<String, Object>> sendRecoveryEmail(String email) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            UserDetails user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundException("User not found"));
            String token = jwtService.getToken(user, TokenType.RECOVERY);

            MailStructureUtil mailStructureUtil = new MailStructureUtil();
            //Envio de correo requiere una configuración por aparte
            javaMailSender.send(new MimeMessagePreparator() {
                @Override
                public void prepare(MimeMessage mimeMessage) throws MessagingException {
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
                    helper.setTo(email);
                    helper.setSubject("Password Recovery");
                    helper.setText(mailStructureUtil.EmailTemplate(token), true); // Set HTML content
                }
            });
            response.put("status", "success");
            response.put("message", "Recovery email send successfully");
            return ResponseEntity.status(200).body(response);
        } catch (NotFoundException | MailException e) {
            // Catch specific exceptions and handle them
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    //Inicio de autorización y generación de token
    @Override
    public ResponseEntity<HashMap<String, Object>> login(LoginRequest request){
        HashMap<String, Object> response = new HashMap<>();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            UserDetails user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));
            String token = jwtService.getToken(user, TokenType.LOGIN);
            response.put("token", token);
            response.put("status", "success");
            response.put("message", "Logged succesfully");
            response.put("id", userRepository.findByEmail(user.getUsername()).orElseThrow(()-> new NotFoundException("User not found")).getUserId());
            return ResponseEntity.status(200).body(response);
        } catch (AuthenticationException e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    //Creación de un usuario nuevo
    @Override
    public ResponseEntity<HashMap<String, Object>> register(RegisterRequest request) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            if (!request.getPassword().equals(request.getConfirmPassword())) {
                throw new PasswordMismatchException("Password and confirm password do not match");
            }

            // Check if the email is already registered
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new DuplicateEmailException("Email already exists");
            }

            // Create a new user
            User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.CLIENT)
                    .build();

            // Save the user to the database
            User savedUser = userRepository.save(user);

            // Generate token and build AuthResponse
            String token = jwtService.getToken(savedUser, TokenType.LOGIN);
            response.put("status",  "success");
            response.put("message", "User registered successfully");
            response.put("user id", savedUser.getUserId());
            return ResponseEntity.status(200).body(response);
        } catch (PasswordMismatchException | DuplicateEmailException e) {
            // Catch specific exceptions and handle them
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        } catch (Exception e) {
            // Catch any other unexpected exceptions
            String errorMessage = "An unexpected error occurred: " + e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }
    //Manejo de recuperción de token
    @Override
    public ResponseEntity<HashMap<String, Object>> recoverPassword(RecoveryDTO request) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            if (!request.getNewPassword().equals(request.getPasswordConfirmation())) {
                throw new PasswordMismatchException("Password and confirm password do not match");
            }
            // verificar si el correo existe
            UserDetails user = userRepository.findByEmail(jwtService.getUserNameFromToken(request.getToken()))
                    .orElseThrow(() -> new NotFoundException("User not found"));

            User userToEdit = userRepository.findByEmail(jwtService.getUserNameFromToken(request.getToken()))
                    .orElseThrow(() -> new NotFoundException("User not found"));
            //Verificar que el token sea valido y únicamente designado para recueprar contraseña
            if (jwtService.isTokenLogin(request.getToken())) {
                throw new TokenNotValidRecoveryException("The token is not valid for password recovery");
            } else if (!jwtService.isTokenValid(request.getToken(), user)) {
                throw new TokenNotValidRecoveryException("Token is expired or user is locked");
            } else {
                userToEdit.setPassword(passwordEncoder.encode(request.getNewPassword()));
                userRepository.save(userToEdit);
                response.put("status", "success");
                response.put("message", "Password recovered successfully");
            }
            return ResponseEntity.status(200).body(response);
        } catch (PasswordMismatchException | NotFoundException | TokenNotValidRecoveryException e) {
            // Catch specific exceptions and handle them
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        } catch (Exception e) {
            // Catch any other unexpected exceptions
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

}

*/`

const code2 = `//Archivo src/main/Services/TaskService.java
//Interfaz que declara todos los métodos
public interface TaskService {
    public ResponseEntity<HashMap<String, Object>> searchTasksByKeywordAndStatus(String keyword, Integer status, Integer userId);
    public ResponseEntity<HashMap<String, Object>> createTask (TaskDto task);
    public ResponseEntity<HashMap<String, Object>> editTask(Integer TaskID , EditTaskDTO Task);
    public ResponseEntity<HashMap<String, Object>> deleteTask(Integer taskId);
    public ResponseEntity<HashMap<String, Object>> setState(Integer TaskID, String state);
}

//Archivo src/main/services/TaskServiceImpl.java
//Clase que implementa los métodos de la interfaz
@Service
public class TaskServiceImpl implements TaskService {
    //Inyección de repositorios a utilizar
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;

    //Busqueda de las tareas segun estado usuario y filtrado por titulo y descripción
    @Override
    public ResponseEntity<HashMap<String, Object>> searchTasksByKeywordAndStatus(String keyword, Integer status, Integer userId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            List<Tasks> tasks = taskRepository.searchTasksByKeywordAndStatusAndUserId(keyword, status,userId);
            response.put("status", "success");
            response.put("message", "Tasks retrieved successfully");
            response.put("data", tasks);
            response.put("totalTasks", tasks.size());
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }
    //Creación de tarea
    @Override
    public ResponseEntity<HashMap<String, Object>> createTask(TaskDto task) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            LocalDateTime now = LocalDateTime.now();
            Timestamp creationDate = Timestamp.valueOf(now);
            Tasks newTask = Tasks.builder()
                    .title(task.getTitle())
                    .creationDate(creationDate)
                    .dueDate(task.getDueDate())
                    .description(task.getDescription())
                    .status(0)
                    .user(userRepository.getReferenceById(task.getUserId()))
                    .build();
            Tasks createdTask = taskRepository.save(newTask);
            response.put("status", "success");
            response.put("message", "Task Created Successfully for user " + createdTask.getUser().getName());
            response.put("data", createdTask.getTaskId());
            return ResponseEntity.status(200).body(response);
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    //Modificación de tareas
    @Override
    public ResponseEntity<HashMap<String, Object>> editTask(Integer TaskID , EditTaskDTO Task) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setTitle(Task.getTitle());
                existingTask.setDueDate(Task.getDueDate());
                existingTask.setDescription(Task.getDescription());
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("status", "success");
                response.put("message", "Task Updated Successfully");
                response.put("data", updatedTask.getTaskId());
                return ResponseEntity.status(200).body(response);
            } else {
                response.put("status", "error");
                response.put("message", "Task not found with ID: " + TaskID);
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    //Eliminación de tarea
    @Override
    public ResponseEntity<HashMap<String, Object>>deleteTask(Integer taskId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToDelete = taskRepository.findById(taskId);
            if (taskToDelete.isPresent()) {
                taskRepository.delete(taskToDelete.get());
                response.put("status", "success");
                response.put("message", "Task Deleted Successfully");
                return ResponseEntity.status(200).body(response);
            } else {
                response.put("status", "error");
                response.put("message", "Task not found with ID: " + taskId);
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    //Modificación del estao de una tarea
    @Override
    public ResponseEntity<HashMap<String, Object>> setState(Integer TaskID, String state) {
        Integer newStatus= 0;
        if(state.equals("todo")){
            newStatus =  0;
        }else if(state.equals("doing")){
            newStatus =  1;
        }else if(state.equals("done")){
            newStatus =  2;
        }else if(state.equals("upcoming")){
            newStatus =  3;
        }
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(newStatus);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("status", "success");
                response.put("message", "Task status Changed");
                return ResponseEntity.status(200).body(response);
            } else {
                response.put("status", "error");
                response.put("message", "Task not found with ID: " + TaskID);
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }
}`

const code3 = `
//En el archivo application.properties se deben declarar las siguientes configuraciónes.
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=flytask503@gmail.com
//Contraseña para aplicacioens de desarrollo de cuenta d egoogle
spring.mail.password=mailpassword

//Archivo src/main/Config/MailConfig.java
//Clase de configuración que prepara el proceidimiento para enviar correos
@Configuration
public class MailConfig {

    @Autowired
    private Environment env;

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(env.getProperty("spring.mail.host"));
        mailSender.setPort(Integer.parseInt(env.getProperty("spring.mail.port")));
        mailSender.setUsername(env.getProperty("spring.mail.username"));
        mailSender.setPassword(env.getProperty("spring.mail.password"));
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.starttls.required", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
`

const ServicesSetup = () => {
    return (
      <div className="flex flex-col">
      <TextBlock title="Implementación de lógica de negocios"/>
      <TextBlock textContent={text1}/>
      <TextBlock textContent={text2}/>
      <TextBlock title="Lógica de la gestión de cuentas o autenticación"/>
      <CodeBlock
        code1={code1}
        language1="java"
        />
      <TextBlock title="Lógica de la gestión de las tareas"/>
      <CodeBlock
        code1={code2}
        language1="java"
        />
       <TextBlock title ="Configuración de correos para Spring Boot"/>
       <TextBlock textContent={text3}/>
       <CodeBlock
        code1={code3}
        language1="java"
        />
      </div>
    );
  };
  
  export default ServicesSetup;
  