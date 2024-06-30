import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const text1 = `Los endpoints son configuraciónes especiales de la api que relaciónan la ejecución de una funcionalidad
según la ruta del buscador o del cliente, cuando se desea ejecutar una funcionalidad en especifico el cliente o el buscador debe
hacer una petición http colocando la url directa de la funcionalidad por utilizar.`

const code1 = `//Archivo src/main/Authentication.java
//En java la los endpoints se manejan por medio de los controladores, cada controlado restá designado a un
objeto o taréas especificas, en este caso se tiene el controlador de los usuarios o de autenticación.

//Anotación que indica que se permiten todos los origenes para desarrollo local
@CrossOrigin("*")
//Anotación que indica a Sring Boot que este será un controlador que manejará endpoints
@RestController
//Anotación que indica a spring que va a mapear el controlador bajo la ruta base sumado a /api/auth
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    /Inyección de dependencias
    @Autowired
    private final AuthService authService;

    //Anotación que define el tipo de petición en este caso post, y la ruta, esta es bajo la base por lo tanto queda como /api/auth/login
    @PostMapping("/login")          //Etiqueta para solicitar un cuerpo json valido según los DTO
    public ResponseEntity<?> Login(@RequestBody @Valid LoginRequest request){
        return authService.login(request);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/recover-password")         //Etiqueta para solicitar información por medio de un parametro
    public ResponseEntity<?> recoveryPassword(@RequestParam String email){
        return authService.sendRecoveryEmail(email);
    }

    @PostMapping("/recover-authenticated")
    public ResponseEntity<?> recoveryAuthenticated(@RequestBody RecoveryDTO request){
        return authService.recoverPassword(request);
    }
    //El endpoint whoami es el único de este contorlador autenticado, esto es determinado por la cadena de seguridad, este
    //resulta sumamente util para el manejo de sesiónes y rutas autenticadas en el desarrollo Front End
    @PostMapping("/whoami")
    public ResponseEntity<?> checkToken(){
        return ResponseEntity.ok("Token valido");
    }
}

//Archivo src/main/controllers/TaskController.java

@CrossOrigin("*")
@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/search")
    public ResponseEntity<?> searchTasksByKeywordAndStatus(
            @RequestParam String keyword,
            @RequestParam Integer status,
            @RequestParam(required = true) Integer userId) {
        return taskService.searchTasksByKeywordAndStatus(keyword, status, userId);
    }
    @PostMapping("/create")
    public ResponseEntity<?> register(@RequestBody @Valid TaskDto task) {
            return taskService.createTask(task);
    }

    @PutMapping("/edit/{taskid}")
    public ResponseEntity<?> update(@PathVariable Integer taskid, @RequestBody @Valid EditTaskDTO newTask) {
        return taskService.editTask(taskid, newTask);
    }
                //Manera de solicitar datos mediante URL
    @PutMapping("/{newStatus}/{taskid}") //Etiqueta que define que la variable viene de URL
    public ResponseEntity<?> setTaskTodo(@PathVariable Integer taskid,@PathVariable String newStatus ) {
        return taskService.setState(taskid,newStatus);
    }

    @DeleteMapping("/delete/{taskid}")
    public ResponseEntity<?> update(@PathVariable Integer taskid) {
        return taskService.deleteTask(taskid);
    }
}
`
const python1 = `
#En django los endpoints se deinen en los archivos Url de las correspondientes apps.

#Archivo urls.py de la app users
from django.urls import path
from .views import RegisterView, LoginView, PasswordRecoveryView, RestePasswordView, WhoamIView

urlpatterns = [           #Uso de las vistas
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('auth/recover-password', PasswordRecoveryView.as_view()),
    path('auth/recover-authenticated', RestePasswordView.as_view()),
    path('auth/whoami', WhoamIView.as_view())
]

#Archivo urls.py de la app tasks
urlpatterns = [
    path('task/create', CreateTaskView.as_view()),
    path('task/edit/<int:id>', UpdateTaskView.as_view()),
    path('task/delete/<int:id>', DeleteTaksView.as_view()),

    #Peticion de variables mediante la url
    path('task/<str: newstatus>/<int:id>', SetStateView.as_view()),
    path('task/search',GetMyTasks.as_view()),
]

#En django estas url deben ser solicitads por el archivo url.py del proyecto principal de la siguiente forma:
urlpatterns = [
    path('api/', include('users.urls')),
    path('api/', include('tasks.urls'))
]
`
const type1 = `//En el caso de Express los endpints se pueden colocar en un solo archivo
//Estos deben ser llamados en el index.ts
//El ultimo parametro que se pasa a la función siempre es la función que se encuentra en los controllers
//Autenticación
//El app.post define el tipo de peticion en este caso post
app.post('/api/auth/whoami', verifyToken, whoami);
//Esta petición maneja un segundo middleware que se encarga de validar según el DTO
app.post('/api/auth/register', validationMiddleware(CreateUserDTO), registerUser);
app.post('/api/auth/login', validationMiddleware(LoginDTO), loginUser);
app.post('/api/auth/recover-password', passwordRecovery);
app.post('/api/auth/recover-authenticated',validationMiddleware(RecoverPwDTO), recoverPassword);

//Peticones de las tareas
//El uso de verify token indica que pasa por el middleware de autenticación
app.get('/api/task/search', verifyToken, getTasks);
app.post('/api/task/create', verifyToken, validationMiddleware(TaskDTO), createTask);
app.put('/api/task/edit/:id', verifyToken, validationMiddleware(UpdateTaskDTO), updateTask);
//Mediante el uso de los ":" se define que se pasan variables al contorlador por medio de la URL
app.put('/api/task/:status/:id', verifyToken, changeStatus);
app.delete('/api/task/delete/:id', verifyToken, deleteTask);`
const EndpointSetup = () => {
    return (
        <div>
        <TextBlock title="Conifguración de los endpoints."/>
        <TextBlock textContent={text1}/>
        <CodeBlock 
        code1={code1} 
        language1="java"
        code2={python1}
        language2="python"
        code3={type1}
        language3="typescript"
        />
        </div>
    );
  };
  
  export default EndpointSetup;