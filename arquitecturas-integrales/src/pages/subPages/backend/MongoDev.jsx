import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const text1 = `Cuando se desarrolla una aplicación con Spring Boot con una conexión a una base de datos Mongodb,
 es necesario tener las siguientes consideraciones. 
 La conexión a la base de datos se realiza desde el archivo application.properties tal como 
 se presenta a continuación. Esta url ya contiene las credenciales y los esquemas a los que esta se conecta.
`
const text2 = `Debido al cambio de base de datos se debe instalar la dependencia apropiada para su manejo, esto se realiza en el archivo pom.xml`
const text3 = `Con la dependencia instalada se debe crear los modelos en este caso no van asignados a una tabla, sino que se representan como documentos y colecciones.
además, la llave primaria es de un tipo especial brindado por la dependencia de la librería mongo-data llamado ObjectId, y se modifica la relación que se llama simplemente como una lista, sin anotación
finalmente en la implementación en el modelo Tasks, se le incluye la llave de tipo ObjectId del usuario debido que en MongoDB no se manejan relaciones directamente entre documentos.
`
const text4 = `Debido al cambio en los modelos, cambian los repositorios de la sigueinte manera:`
const java1 = `spring.data.mongodb.uri=mongodb+srv://<username>:<password>@flytaskcluster.xlycw9x.mongodb.net/flytask?retryWrites=true&w=majority&appName=flytaskcluster`
const java2 = `<!-- Spring Boot Starter Data MongoDB -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-mongodb</artifactId>
		</dependency>

<!-- MongoDB Driver -->
		<dependency>
			<groupId>org.mongodb</groupId>
			<artifactId>mongodb-driver-sync</artifactId>
		</dependency>`
const java3 = `//Modelo de usuario
@Builder
@Document(collection = "User")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class User implements UserDetails {

    @Id
    @Field("usr_id")
    private ObjectId userId;
    @Field("usr_name")
    @JsonAlias("name")
    private String name;

    @Field("usr_email")
    @JsonAlias("email")
    private String email;

    @JsonIgnore
    @Field("usr_password")
    @JsonAlias("password")
    private String password;

    @JsonIgnore
    @Field("usr_role")
    private Role role;

    private List<?> tasks;

    public User(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role != null) {
            return Collections.singleton(new SimpleGrantedAuthority(role.name()));
        } else {
            return Collections.emptyList();
        }
    }
    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
//Modelo de tareas
@Builder
@Document(collection = "Tasks")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Tasks {
    @Id
    @Field("tsk_id")
    private ObjectId taskId;

    @Field("tsk_title")
    @JsonAlias("title")
    private String title;

    @Field("tsk_desc")
    @JsonAlias("description")
    private String description;

    @Field("tsk_status")
    @JsonAlias("status")
    private Integer status;

    @Field("tsk_creation_date")
    @JsonAlias("creationDate")
    private Date creationDate;

    @Field("tsk_due_date")
    @JsonAlias("dueDate")
    private Date dueDate;

    @Field("usr_id")
    @JsonIgnore
    private ObjectId user;

    public Tasks(String title, String description, Integer status, Date creationDate, Date dueDate, ObjectId user) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.user = user;
    }
}`
const java4 = `//Repositorio del usuario
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    User findByuserId(ObjectId userId);
}

//Repositorio de las tareas
public interface TaskRepository extends MongoRepository<Tasks, ObjectId> {
    //Se utiliza sintaxis especial de mongo basada en operadores ternarios para realizar el query
    @Query("{$and: ["
            + "{ $or: ["
            + "{ 'title': { $regex: ?0, $options: 'i' } },"
            + "{ 'description': { $regex: ?0, $options: 'i' } }"
            + "]},"
            + "{ 'usr_id': ?2 }"
            + "]}")
    List<Tasks> searchTasksByKeywordAndStatusAndUserId(String keyword, Integer status, ObjectId userId);
}`
const text5 = `Se debe crear un dto especial que convierte el ObjectID a formato hexadecimal para su correcto manejo desde Fron End usando una única cadena de texto como variable`
const java5 = `@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDTO {
    private String taskId;
    private String title;
    private String description;
    private Integer status;
    private Date creationDate;
    private Date dueDate;

    public TaskResponseDTO(Tasks task) {
        this.taskId = task.getTaskId().toHexString();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.status = task.getStatus();
        this.creationDate = task.getCreationDate();
        this.dueDate = task.getDueDate();
    }
}`
const text6 = `Como última conisderación para Spring Boot, se debe cambiar todos los usos de los id que estaban previamente
manejados como Integer, a ObjectId, esto se puede realizar refactorizando directamente el tipo de la variable y marcando la opción
de modificar todas las importaciones.`
const text7 = `Las dependencias que se deben instalar para el proyecto con mongo son las siguientes:`
const python1 = `asgiref==3.8.1
bcrypt==4.1.3
sqlparse==0.2.4
cryptography==42.0.7
django
django-cors-headers==4.3.1
djangorestframework==3.12.1
PyJWT==2.8.0
djongo
pymongo==3.12.0
dnspython==1.16.0
pytz
#Por motivos de compatibilidad con pymongo se usan versiones anteriores del framework
#específicamente se usa django 4.1 como última versión compatible con pymongo que es
#la dependencia que permite interactuar con la base de datos de MongoDB.
`
const text8 = `Conexión a la base de datos:`
const python2 = `DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'flytask',
        'ENFORCE_SCHEMA': False,
        'CLIENT': {
            'host': 'mongodb+srv://00093619:flytask580@flytaskcluster.xlycw9x.mongodb.net/flytask?retryWrites=true&w=majority',
            'username': '00093619',
            'password': 'flytask580',
            'authMechanism': "SCRAM-SHA-1"
        }
    }
}`
const text9 = `A los modelos se les debe modificar la llave primaria:`
const python3 = `class User(AbstractUser):
    _id = ObjectIdField(primary_key=True, default=ObjectId)
class Task(models.Model):
    _id = ObjectIdField(primary_key=True, default=ObjectId)`
const text10= `se presenta el cambio de todas las peticiones que reciben una id mediante la ruta de 
la petición pasan de ser de tipo int a tipo str.
`
const python4 = `urlpatterns = [
    path('task/create', CreateTaskView.as_view()),
    path('task/edit/<str:id>', UpdateTaskView.as_view()),
    path('task/delete/<str:id>', DeleteTaksView.as_view()),
    path('task/<str:newstatus>/<str:id>', SetStateView.as_view()),
    path('task/search',GetMyTasks.as_view()),
]`
const text11 = `Final mente para poder ser utilizadas las OjbectId
 estas deben cadenas de texto deben ser instanciadas nuevamente con el tipo ObjectId`
const python5 = `user_id = request.GET.get("userId")
obj_id = ObjectId(user_id)
user = User.objects.filter(_id=obj_id).first()`
const text12 = `Cuando se hace uso de una base de datos MongoDB se implementa la libería mongoose de express en lugar de la librería sequelize.`
const type1=`"dependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/dotenv": "^8.2.0",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/nodemailer": "^6.4.15",
    "bcryptjs": "^2.4.3",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.1",
    "nodemailer": "^6.9.13",
    "nodemon": "^3.1.3"
  },`

const text13 = `Lo anterior genera un cambio en los modelos del proyecto, mongoose maneja automáticamente la generación de las id por 
lo tanto se remueven las id de los atributos de las clases, además cambia la definición y confirmación del esquema y la conexión de los modelos`

const type2 = `//Modelo del usuario
interface IUser extends Document {
    usr_name: string;
    usr_email: string;
    usr_password: string;
    usr_role: Role;
}

const UserSchema: Schema = new Schema({
    usr_name: { type: String, required: true },
    usr_email: { type: String, required: true, unique: true },
    usr_password: { type: String, required: true },
    usr_role: { 
        type: String, 
        enum: Object.values(Role), 
        required: true 
      },
}, { collection: 'User', versionKey: false });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

//Modelo de las tareas
interface ITask extends Document {
  tsk_title: string;
  tsk_desc: string;
  tsk_status: number;
  tsk_creation_date: Date;
  tsk_due_date: Date;
  usr_id: mongoose.Schema.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  tsk_title: { type: String, required: true },
  tsk_desc: { type: String, required: true },
  tsk_status: { type: Number, required: true },
  tsk_creation_date: { type: Date, default: Date.now },
  tsk_due_date: { type: Date, required: true },
  usr_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { collection: 'Tasks', versionKey: false });

const Task = mongoose.model<ITask>('Tasks', TaskSchema);

export default Task;
`

const text14 = `Finalmente, debido a que la id es manejada automáticamente por mongoose esta se llama
 "_id" y no se personaliza este valor, por tanto, todos los usos de las id deben ser reemplazados debidamente 
 la propiedad _id.
`
const MongoDev = () => {
    return (
      <div className="flex flex-col">
      <TextBlock title="Desarrollo con base de datos no relacional MongoDB."/>
      <TextBlock title="Consideraciónes al desarrollar con Spring Boot:"/>
      <TextBlock textContent={text1}/>
      <CodeBlock code1={java1} language1={"java"}/>
      <TextBlock textContent={text2}/>
      <CodeBlock code1={java2} language1={"java"}/>
      <TextBlock textContent={text3}/>
      <CodeBlock code1={java3} language1={"java"}/>
      <TextBlock textContent={text4}/>
      <CodeBlock code1={java4} language1={"java"}/>
      <TextBlock textContent={text5}/>
      <CodeBlock code1={java5} language1={"java"}/>
      <TextBlock textContent={text6}/>
      <TextBlock title="Consideraciónes al desarrollar con Django:"/>
      <TextBlock textContent={text7}/>
      <CodeBlock code1={python1} language1={"python"}/>
      <TextBlock textContent={text8}/>
      <CodeBlock code1={python2} language1={"python"}/>
      <TextBlock textContent={text9}/>
      <CodeBlock code1={python3} language1={"python"}/>
      <TextBlock textContent={text10}/>
      <CodeBlock code1={python4} language1={"python"}/>
      <TextBlock textContent={text11}/>
      <CodeBlock code1={python5} language1={"python"}/>
      <TextBlock title="Consideraciónes al desarrollar con Express:"/>
      <TextBlock textContent={text12}/>
      <CodeBlock code1={type1} language1={"typescript"}/>
      <TextBlock textContent={text13}/>
      <CodeBlock code1={type2} language1={"typescript"}/>
      <TextBlock textContent={text14}/>
      </div>
    );
  };
  
  export default MongoDev;