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
const python1 = `#En python la lógica de negocios se maneja en los archivos views.py de cada app
#En el caso de Django no se usan repositorios ni DAO, el modelo mismo se encarga de la persistencia
#Archivo views.py de la app users

#Cada vista o funcionalidad debe instanciarse como una clase aparte
class RegisterView(APIView):
    #La definición indica el tipo de variable que será en este caso tipo post
    def post(self, request):
        try:
            #Obtención de datos de un json vienen en request.data
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                #Generación de la respuesta, no se necesita declarar
                response = {
                    "user id": user.usr_id,
                    "message": "User registered successfully",
                    "status": "success"
                }
                #Finalización de la función, ejecución de la respuesta y se coloca el estado correspondiente
                return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    def post(self, request):
        #Obtención de datos de un json vienen en request.data
        email = request.data['email']
        password = request.data['password']
        try:
            user = User.objects.filter(usr_email=email).first()
            stored_hashed_password = user.usr_password.encode('utf-8')  # Ensure the stored hash is in bytes
            provided_password = password.encode('utf-8')  # Encode the provided password to bytes
            if user is None:
                raise Exception('Bad credentials')
            if not bcrypt.checkpw(provided_password, stored_hashed_password):
                raise Exception('Bad credentials')
            response = ({
                'id': user.usr_id,
                'message': 'Logged succesfully',
                'status': 'success',
                'token': generate_logintoken(user)
            })
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PasswordRecoveryView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            #obtención de un parametro
            email = request.GET.get("email")
            user = User.objects.filter(usr_email=email).first()
            if user is None:
                raise Exception("User not found")
            token = generate_recoverytoken(user)
            #Plantilla html del correo, esta es un simple string en una carpeta llamada Utils
            html_message = Utils.getTemplate(token)
            subject = 'Password Recovery'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]
            # Send the email
            #Django tiene integrada una función para enviar correos, se requiere colocar las siguientes variables en settings.py:
            #EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
            #EMAIL_HOST = 'smtp.gmail.com'
            #EMAIL_PORT = 587
            #EMAIL_USE_TLS = True
            #EMAIL_HOST_USER = 'flytask503@gmail.com'
            #EMAIL_HOST_PASSWORD = 'mailpassword
            send_mail(subject, '', from_email, recipient_list, html_message=html_message)
            response = {
                "message": "Recovery email send successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RestePasswordView(APIView):
    def post(self, request):
        try:
            new_password = request.data['newPassword']
            password_confirmation = request.data['passwordConfirmation']
            token = request.data['token']
            # Validate token
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            # Check token type
            if decoded_token.get('tokenType') != 'RECOVERY':
                raise Exception("Invalid token type")
            # Get email from token
            email = decoded_token.get('sub')
            # Get user
            user = User.objects.filter(usr_email=email).first()
            # Validate passwords
            if new_password != password_confirmation:
                raise Exception("Passwords do not patch")
            # Set new password
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), salt)
            user.usr_password = hashed_password.decode('utf-8')
            user.save()
            response = {
                "message": "Password recovered successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
`
const python2 = `#Archivo views.py de la app tasks
class GetMyTasks(APIView):
    @token_required #Aca se hace uso de la autenticación mediante la llamada del decorador
    def get(self, request):
        user_id = request.GET.get("userId")
        keyword = request.GET.get("keyword")
        tsk_status = request.GET.get("status")

        try:
        #Se realiza un query mediante un connection cursor para realizar una busqueda de datos filtrada
        #Y personalizada
            query = """
                select * 
                from Tasks t 
                join "user" u on t.usr_id = u.usr_id 
                where t.usr_id = %s 
                AND (LOWER(t.tsk_title) like lower(concat('%%', %s, '%%')) 
                     OR LOWER(t.tsk_desc) like lower(concat('%%', %s, '%%')) 
                     OR t.tsk_status = %s)
            """
            #Se ejecuta el query
            with connection.cursor() as cursor:
                cursor.execute(query, (user_id, keyword, keyword, tsk_status))

                rows = cursor.fetchall()

            #Se coloca en una lista los datos obtenidos
            tasks = []
            for row in rows:
                task = {
                    'tsk_id': row[0],
                    'tsk_title': row[1],
                    'tsk_desc': row[2],
                    'tsk_status': row[3],
                    'tsk_creation_date': row[4].isoformat(),
                    'tsk_due_date': row[5].isoformat(),
                    'usr_id': row[6]
                }
            tasks.append(task)
            
            # Se serializa la información obtenida en un formato json más legible
            serializer = TaskSerializer(data=tasks, many=True)
            serializer.is_valid()

            #Se retorna el Json
            response = {
                "data": serializer.data,
                "totalTasks": len(tasks),
                "message": "Tasks retrieved successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreateTaskView(APIView):
    @token_required
    def post(self, request):
        try:
            title = request.data['title']
            description = request.data['description']
            due_date_str = request.data['dueDate']
            user_id = request.data['userId']

            #Parseo de fechas para garantizar consistencia
            try:
                due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%dT%H:%M:%SZ"))
            except ValueError:
                due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%d"))

            #Se crea la instancia de las tareas, el objeto directamente maneja la persistenica
            task = Task.objects.create(
                tsk_title=title,
                tsk_desc=description,
                tsk_status=0,  # Assuming 0 represents an initial status
                tsk_creation_date=datetime.now(),
                tsk_due_date=due_date,
                usr_id=user_id
            )
            user = User.objects.filter(usr_id=user_id).first()
            serializer = TaskSerializer(task)

            response = {
                "data": task.tsk_id,
                "message": f"Task created successfully for user {user.usr_id}",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateTaskView(APIView):
    @token_required
    def put(self, request, id): #el id viene de una variable de url
        try:
            #Se obtiene tarea de la base de datos
            task = Task.objects.filter(tsk_id=id).first()
            if task is None:
                raise Exception("Task not found")

            # Modificación de la tarea
            task.tsk_title = request.data['title']
            task.tsk_desc = request.data['description']
            due_date_str = request.data['dueDate']

            try:
                task.tsk_due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%dT%H:%M:%SZ"))
            except ValueError:
                task.tsk_due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%d"))

            # Se confirma la modificación
            task.save()
            response = {
                "data": task.tsk_id,
                "message": "Task Updated Successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SetStateView(APIView):
    @token_required
    def put(self, request, id, newstatus):
        try:
            changeState = 0;
            if newstatus == 'todo':
                changeState = 0
            if newstatus == 'doing':
                changeState = 1
            if newstatus == 'done':
                changeState = 2
            if newstatus == 'upcoming':
                changeState = 3

            task = Task.objects.filter(tsk_id=id).first()
            if task is None:
                raise Exception(f"Task not found with ID: {id}")
            task.tsk_status = changeState
            task.save()
            response = {
                "message": "Task Changed to Upcoming",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteTaksView(APIView):
    @token_required
    def delete(self, request, id):
        try:
            task = Task.objects.filter(tsk_id=id).first()
            if task is None:
                raise Exception(f"Task not found with ID: {id}")
            task.delete()
            response = {
                "message": "Task Deleted Successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
`
const type1 = `//La lógica de negocios se maneja en los archivos de la carpeta controller

//Archivo authController.ts

//Lógica del whoam
export const whoami  = async (req: Request, res: Response) => {
    res.status(200).send('Token Valid Ts')
}

//Lógica de inicio de sesión
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        //Busqueda de usuario se encarga al objeto
        const user = await User.findOne({ where: { usr_email: email } });
        if (!user) {
            throw new Error('Bad credentials');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.usr_password);
        if (!isPasswordMatch) {
            throw new Error('Bad credentials');
        }
        // Generación del token
        const token = generateLoginToken(user);
        // Preparación de respuesta
        const response = {
            id: user.usr_id,
            message: 'Logged successfully',
            status: 'success',
            token: token
        };
        //Envio de respuesta y estado de la respuesta
        res.status(200).json(response);
    } catch (error: any) {
        const response = {
            message: error.message,
            status: 'error'
        };
        res.status(500).json(response);
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        //Obtención de información de un objeto Json
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            const response = {
                "message": "Passwords do not match",
                "status": "error"
            };
            return res.status(400).json(response);
        }

        const existingUser = await User.findOne({ where: { usr_email: email } });
        if (existingUser) {
            const response = {
                "message": "Email already exists",
                "status": "error"
            };
            return res.status(400).json(response);
        }
        //Se encripta la contraseña usando la librería bcrypt
        const saltRounds = 10; // Recommended number of rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Creación de un usuario mediante el modelo
        const user = await User.create({
            usr_name: name,
            usr_email: email,
            usr_password: hashedPassword, // Store hashed password
            usr_role: Role.CLIENT
        });

        const response = {
            "user id": user.usr_id,
            "message": "User registered successfully",
            "status": "success"
        };
        res.status(200).json(response);

    } catch (error: any) {
        const response = {
            "message": error.message || "Failed to register user",
            "status": "error"
        };
        res.status(500).json(response);
    }
};

export const passwordRecovery = async (req: Request, res: Response) => {
    //Obtención de un dato que es enviado por parametro a la petición
    const email = req.query.email as string;
    try {
        if (!email) {
            throw new Error('Email parameter is required');
        }

        const user = await User.findOne({ where: { usr_email: email } });

        if (!user) {
            throw new Error('User not found');
        }
        //Generación de token de recuperación
        const token = generateRecoveryToken(user);
        
        //Obtención de plantilla html, esta es una string colocada en la carpeta Utils
        //Para enviar correos se necesitan los siguientes datos del archivo .env
        //EMAIL_HOST_USER='flytask503@gmail.com'
        //EMAIL_HOST_PASSWORD='mailpassword'
        const htmlMessage = MailTemplate(token);
        const subject = 'Password Recovery';
        const fromEmail = process.env.EMAIL_HOST_USER || 'your@example.com';
        const recipientList = [user.usr_email];
        
        //Se utiliza la libería nodemailer para preparar el envío
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_HOST_USER,
                pass: process.env.EMAIL_HOST_PASSWORD
            }
        });
        //Se ejecuta el envio del correo
        await transporter.sendMail({
            from: fromEmail,
            to: recipientList,
            subject: subject,
            html: htmlMessage
        });

        const response = {
            message: "Recovery email sent successfully",
            status: "success"
        };
        
        return res.status(200).json(response);
    } catch (error:any) {
        console.error('Error sending recovery email:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: "error"
        };
        
        return res.status(500).json(response);
    }
};

export const recoverPassword = async (req: Request, res: Response) => {
    const { newPassword, passwordConfirmation, token } = req.body;

    try {
        //Verificación del token de tipo recuperación
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY || 'dummykey') as DecodedToken;

        if (decodedToken.tokenType !== "RECOVERY") {
            throw new Error('Invalid Token Type');
        }      
        if (newPassword !== passwordConfirmation) {
            throw new Error('Passwords do not match');
        }

        const user = await User.findOne({ where: { usr_email: decodedToken.sub } });

        // Encriptación de la contraseña
        const saltRounds = 10; // Recommended number of rounds
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Modificación de la clave del usuario, se encarga el modelo
        const updatedUser = await User.update(
            { usr_password: hashedPassword },
            { where: { usr_id: user?.usr_id } }
        );

        if (updatedUser[0] === 0) {
            throw new Error('User not found or password not updated');
        }

        const response = {
            message: "Password recovered successfully",
            status: "success"
        };

        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error updating password:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: "error"
        };

        return res.status(500).json(response);
    }
};`

const type2 = `//Archivo tasksController.ts
export const getTasks = async (req: Request, res: Response) => {
    const { userId, keyword, status } = req.query;

    try {
        //Para filtrar datos con sequelize se arma una clausula de busqueda
        //Aca se define que se obtendra lo que coincida con la id del usuario
        const whereClause: any = { usr_id: userId };

        //Se agrega la concatenación para filtrar por descrición y por titulo
        if (keyword) {
            whereClause[Op.or] = [
                { tsk_title: { [Op.iLike]: \`%\${keyword}%\` } },
                { tsk_desc: { [Op.iLike]: \`%\${keyword}%\` } }
            ];
        }

        //Se ejecuta el query mediante el modelo
         const { count, rows: tasks } = await Task.findAndCountAll({
            where: whereClause,
            include: [{ model: User, as: 'user' }],
            attributes: ['tsk_id', 'tsk_title', 'tsk_desc', 'tsk_status', 'tsk_creation_date', 'tsk_due_date']
        });

        // Se serializa en formato json
        const serializedTasks = tasks.map(task => ({
            taskId: task.tsk_id,
            title: task.tsk_title,
            description: task.tsk_desc,
            status: task.tsk_status,
            creationDate: (task.tsk_creation_date as Date), // Format date as ISO string
            dueDate: (task.tsk_due_date as Date) // Format date as ISO string
        }));

        //Se retornan los datos
        const response = {
            data: serializedTasks,
            totalTasks: count,
            message: 'Tasks retrieved successfully',
            status: 'success'
        };

        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error retrieving tasks:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: 'error'
        };
        return res.status(500).json(response);
    }
};

export const createTask = async (req: Request, res: Response) => {
    const {title, description, dueDate, userId} = req.body
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Create task in the database using Sequelize Task model
        const createdTask = await Task.create({
            tsk_title: title,
            tsk_desc: description,
            tsk_status: 0, // Assuming 0 represents an initial status
            tsk_creation_date: new Date(),
            tsk_due_date: new Date(dueDate),
            usr_id: userId
        });
        const response = {
            data: createdTask.tsk_id,
            message: \`Task created successfully for user \${user.usr_id}\`
            status: "success"
        };
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error creating task:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: "error"
        };
        return res.status(500).json(response);
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const taskId = req.params.id; // Assuming the task ID is passed as a URL parameter
    const { title, description, dueDate } = req.body;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.tsk_title = title;
        task.tsk_desc = description;
        task.tsk_due_date = new Date(dueDate);
        await task.save();
        const response = {
            data: task.tsk_id,
            message: 'Task updated successfully',
            status: 'success'
        };
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error updating task:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: 'error'
        };
        return res.status(500).json(response);
    }
};

export const changeStatus = async (req: Request, res: Response) => {
    const status:string = req.params.status; // Assuming the task ID is passed as a URL parameter
    const taskId = req.params.id;
    var responseText:String = '';
    var statusChange: number = 0;
    if(status == "todo"){
        statusChange = 0;
        responseText="TODO";
    }else if(status =="doing"){
        statusChange = 1;
        responseText="DOING";
    }else if(status =="done"){
        statusChange = 2;
        responseText="DONE";
    }else if(status =="upcoming"){
        statusChange = 3;
        responseText="UPCOMING";
    }
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.tsk_status = statusChange;
        await task.save();
        const response = {
            message: \`Task Changed to \${responseText}\`,
            status: 'success'
        };
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error updating task:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: 'error'
        };
        return res.status(500).json(response);
    }
};
export const deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.id; // Assuming the task ID is passed as a URL parameter
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error(\`Task not found with ID: \${taskId}\`);
        }
        await task.destroy();
        const response = {
            message: 'Task Deleted Successfully',
            status: 'success'
        };
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error deleting task:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: 'error'
        };
        return res.status(500).json(response);
    }
};`
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
        code2={python1}
        language2="python"
        code3={type1}
        language3="typescript"
        />
      <TextBlock title="Lógica de la gestión de las tareas"/>
      <CodeBlock
        code1={code2}
        language1="java"
        code2={python2}
        language2="python"
        code3={type2}
        language3="typescript"
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
  