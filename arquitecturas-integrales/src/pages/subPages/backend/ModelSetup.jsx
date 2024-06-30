import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const text1 = `La implementación de entidades consiste en aprovechar el paradigma orientado a objetos al definir clases
especificas encargadas de hacer el proceso de mapeo y creación de la entidad gracias al uso de dependencias
de cada uno de los frameworks ya preparadas para manipular las tablas u objetos de la base de datos.
`
const text2 = `Estas entidades deben ser creadas como clases dentro de las carpetas model de cada proyecto para respetar la arquitectura MVC.`
const text3 = `En el caso especifico del framework Spring Boot es requerida la implementación de interfaces llamdas Repositorios, los cuales
se encargan de la persistencia de la base de datos, es decir, las operaciones CRUD u operaciones personalizadas de los objetos que deben ser
confirmadas en la base de datos, respentando la arquitectura estos deben colocarse en la carpeta repository`
const text4 = `Es importante clarar que esta configuración solo es requerida en Spring Boot, Djagno y Express manejan la persistencia directamente
con el uso de los objetos`
const text5 = `En el caso particuar de Django es requerido ejecutar el proceso de migracion de entidades, lo que implica que 
manualmente se le inidca a django que cree los archivos necesarios para luego ejecutar manualmente la creación de las entidades
dentro de la base.`
const text6 = `Django creará automáticamente migraciones internas no creadas por el usuario requeridas para su funcinamiento debido 
a que controla su proceso de autenticación mediante esas tablas.`
const code1 = `//Archivo src/main/model/User.java
//Anotaciones de lombok y spring JPA para facilitar la difinición de la entidad

//Define que la clase será una entidad
@Entity
//Anotacion de lombock que automáticamente implementa setters y getters
@Data
//Define el constructor vacio
@NoArgsConstructor
//Define un constructor para crear objetos de forma personalizada
@Builder
//Define el cosntructor con todos los atributos
@AllArgsConstructor
//Define el nombre de la tabla en base de datos y su esquema
@Table(name = "\"USER\"" , schema = "PUBLIC")
//La implemetación de esta clase de UserDetails es especial para el uso de Spring Security
public class User implements UserDetails {
    //Define que será la llave primaria
    @Id
    //Se establece como se generará la llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //Se define el nombre de la columna que se lee o crea en la base
    @Column(name = "USR_ID")
    //El argumento en sí
    private Integer userId;

    @Column(name ="USR_NAME", nullable = false)
    //Se define el nombre que tendrá relacionado al retornar los datos en formato Json
    @JsonAlias("name")
    private String name;

    @Column(name ="USR_EMAIL", nullable = false)
    @JsonAlias("email")
    private String email;

    @Column(name ="usr_password", nullable = false)
    //Ignora la contraseña al retornar los datos en formato Json
    @JsonIgnore
    @JsonAlias("password")
    private String password;

    @Column(name = "USR_ROLE", nullable = false)
    //Define que el rol será un objeto aparte de tipo Enumeración
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private Role role;

    /*
    Define la relación OneToMany que implica un usuario tiene muchas tareas
    Esta propiedad es mapeada por usuario lo que implica que esta clase esta
    pendiente de la relación, fetch tipe define que la relación solo será cargada
    si es requerido optimizando los tiempos de carga de código.
    */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Tasks> tasks;

    //Funciones requeridas por clase UserDetails

    //Definir las autoridades en base a la lista del rol.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    //Definie el nombre de usuario que manejara security en este caso el correo
    @Override
    public String getUsername() {
        return email;
    }

    //Definir si la cuenta es váida, si uno de estos es falso en el bojeto se rechazará la autenticación
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

    public Integer getUserId() {
        return userId;
    }
}`

const code2 = `//Archivo src/main/model/Tasks.java
@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "\"TASKS\"", schema = "PUBLIC")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TSK_ID")
    private Integer taskId;

    @Column(name ="TSK_TITLE", nullable = false)
    @JsonAlias("title")
    private String title;

    @Column(name ="TSK_DESC", nullable = false)
    @JsonAlias("description")
    private String description;

    @Column(name ="TSK_STATUS", nullable = false)
    @JsonAlias("status")
    private Integer status;

    @Column(name ="TSK_CREATION_DATE", nullable = false)
    @JsonAlias("creationDate")
    private Timestamp creationDate;

    @Column(name ="TSK_DUE_DATE", nullable = false)
    @JsonAlias("dueDate")
    private Timestamp dueDate;

    /*Se define la relación equivalente la usuario que será de tipo ManyToOne lo que implica que muchas tareas
    se le pueden asignar a ese usuario*/
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    //Se indica a que columna de la entidad se debe hacer la relación de la base de datos
    @JoinColumn(name = "USR_ID", nullable = false)
    /*Se agrega la configuración del comprotamiento en caso de que se elimine el usuario, en este caso se
    Eliminan todas sus tareas*/
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonAlias(value = "userId")
    @JsonIgnore
    private User user;

    public Tasks(String title, String description, Integer status, Timestamp creationDate, Timestamp dueDate, User user) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.user = user;
    }
}`

const code3 = `//Archivo src/main/model/Role.java
//Se define la enumeración llamada Role que contiene todos los roles de los usuarios
public enum Role {
    CLIENT
}`

const code4 = `//Archivo src/main/model/TokenType.java
//Se define la enumeración llamada TokenType que contiene los tipos de token que serán generados
public enum TokenType {
    RECOVERY,
    LOGIN
}`
const code5 = `//Archivo src/main/repository/UserRepository.java
/*Esta clase debe extender de la interfaz JpaRepository y se debe especificar la clase y el tipo de llave
primaria que tendrá asociada */
public interface UserRepository extends JpaRepository<User, Integer> {

/*JPA permite crear operaciones personalizadas mediante la declaración de la función indicando la acción con el prefijo,
en este caso "find" y "exists", y luego definiendo el valor por el cual se realizará la operación apartir del texto By,
esto es mayormente utilizado para la obtención de datos filtrados o realización de calculos*/

//Operación personalizada para obtener un usuario por su correo, el tipo optional indica que no se garantiza su obtención
    Optional<User> findByEmail(String email);

//Operaicón personalizada para saber si existe un usuario con el correo en base de datos
    boolean existsByEmail(String email);

}`
const code6 = `//Archivo src/main/repository/TaskRepository.java
public interface TaskRepository extends JpaRepository<Tasks, Integer> {
    /*La etiqueta queyr permite reemplazar el comportamiento por defecto de jpa para la implementación de funciones personalizadas
    por el uso de una estrucutra de código llamada JPQL, en este caso se realiza para filtrar las tareas por usuario, estado y
    busqueda por el titulo y descrición*/
    @Query("SELECT t FROM Tasks t JOIN t.user u WHERE " +
            "u.userId = :userId AND " +
            "(LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "t.status = :status)")
    List<Tasks> searchTasksByKeywordAndStatusAndUserId(String keyword, Integer status, Integer userId);
}`

const python1 = `#Archivo dentro de users/models.py
#User hereda de AbstractUser que es la clase de autorización de python
class User(AbstractUser):
    #Definición de la llave primaria.
    usr_id = models.AutoField(primary_key=True)
    usr_name = models.CharField(max_length=255, blank=True)
    usr_email = models.CharField(max_length=255, unique=True)
    usr_password = models.CharField(max_length=255)

    #En este caso el rol se coloca directamente no se requiere de entidad
    usr_role = models.CharField(max_length=10)

    #Todos estos campos son requerimientos de django, es recomendable utilizarlos
    #Debido a que se debe integrar para el ejemplo flytask con las API de Spring y Express se 
    #sobreescriben y vuelven nulleables
    username = models.CharField(max_length=255, blank=True, null=True)  
    password = models.CharField(max_length=255, unique=True, null=True)
    is_superuser = models.BooleanField(blank=True, default=False, null=True)  
    first_name = models.CharField(max_length=255, blank=True, null=True)  
    last_name = models.CharField(max_length=255, blank=True, null=True) 
    email = models.CharField(max_length=255, blank=True, null=True) 
    is_staff = models.BooleanField(blank=True, default=False, null=True)  
    is_active = models.BooleanField(blank=True, default=True, null=True) 
    date_joined = models.DateTimeField(null=True)
    USERNAME_FIELD = 'usr_email'
    REQUIRED_FIELDS = ['usr_id', 'usr_name', 'usr_password', 'usr_role']  

    class Meta:
        db_table = 'user'

#Debido al uso de la clase abstarct user se debe definir en el archvivo settigns.py que este modelo será el modelo
#De autenticación de esta forma:

AUTH_USER_MODEL = 'users.User'
`

const python2 = `class Task(models.Model):
    _id = ObjectIdField(primary_key=True, default=ObjectId)
    tsk_title = models.CharField(max_length=255)
    tsk_desc = models.CharField(max_length=255, blank=True)
    tsk_status = models.IntegerField()
    tsk_creation_date = models.DateTimeField()
    tsk_due_date = models.DateTimeField()
    usr = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Tasks'`

const python3 = `
#El proceso de migración se realiza mediante la terminal, se deben ejecutar en la localización del proyecto manage.py

#Crear todas las migraciones
python3 manage.py makemigrations
#Realizar todas las migraciones
python3 manage.py migrate
`
const type1 = `//En express la libería sequelize maneja toda la entidad, no requiere migraciónes ni repositorios
// Interfaz para los atributos
interface UserAttributes {
  usr_id: number;
  usr_name: string;
  usr_email: string;
  usr_password: string;
  usr_role: Role;
}

// Interface para la creación de los atributos
interface UserCreationAttributes extends Optional<UserAttributes, 'usr_id'> {}

// Definicion del modelo
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public usr_id!: number;
  public usr_name!: string;
  public usr_email!: string;
  public usr_password!: string;
  public usr_role!: Role;
}

// Inicialzización y definición de las condiciones de los atributos
User.init(
  {
    usr_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usr_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    usr_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_role: {
      type: DataTypes.ENUM,
      values: Object.values(Role),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false, //Se omiten por la sincronización con las otras API que no la tienen
    tableName: 'user', //Se define el nombre de la tabla en la base
  }
);

export default User;`
const type2 = `//Instanciacion de los atributos
interface TaskAttributes {
    tsk_id: number;
    tsk_title: string;
    tsk_desc: string;
    tsk_status: number;
    tsk_creation_date: Date;
    tsk_due_date: Date;
    usr_id: number;
}

//Se crea una interfaz de creación donde se define tsk_id como la llave primera
interface TaskCreationAttributes extends Optional<TaskAttributes, 'tsk_id'> {}

//Se crea el modelo
class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public tsk_id!: number;
    public tsk_title!: string;
    public tsk_desc!: string;
    public tsk_status!: number;
    public tsk_creation_date!: Date;
    public tsk_due_date!: Date;
    public usr_id!: number;
}
//Se inicializan y definen cada uno de los atributos y sus condiciones
Task.init(
    {
        tsk_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tsk_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tsk_desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tsk_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 // Default status
        },
        tsk_creation_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue('tsk_creation_date');
                return rawValue ? new Date(rawValue).toISOString() : null;
            }
        },
        tsk_due_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue('tsk_due_date');
                return rawValue ? new Date(rawValue).toISOString() : null;
            }
        },
        usr_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'usr_id'
            }
        }
    },
    {
    //Se omiten las timestamps debido a la sincronización con las otras API que no las tienen
        sequelize,
        timestamps: false,
        tableName: 'tasks'
    }
);
//Se define la relación indicando que las tareas pertencen a los usuarios y se define la llave foranea
Task.belongsTo(User, { foreignKey: 'usr_id', as: 'user' });

export default Task;
`
const type3 = `enum Role {
    CLIENT = 'CLIENT'
  }

export { Role };
`
const ModelSetup = () => {
    return (
        <div>
            <TextBlock title="Creación de modelos o entidades."/>
            <TextBlock textContent={text1}/>
            <TextBlock textContent={text2}/>
            <TextBlock title="Modelo del usuario"/>
            <CodeBlock
                code1={code1}
                language1="java"
                code2={python1}
                language2="python"
                code3={type1}
                language3="typescript"
            />
            <TextBlock title="Modelo de la tarea"/>
            <CodeBlock
                code1={code2}
                language1="java"
                code2={python2}
                language2="python"
                code3={type2}
                language3="typescript"
            />
            <TextBlock title="Clase del rol"/>
            <CodeBlock
                code1={code3}
                language1="java"
                code2={type3}
                language2="typescript"
            />
            <TextBlock title="Clase del tipo de token"/>
            <CodeBlock
                code1={code4}
                language1="java"
            />
             <TextBlock title="Repositorios de JPA"/>
             <TextBlock textContent={text3}/>
             <TextBlock textContent={text4}/>
             <TextBlock title="Repositorio del usuario"/>
             <CodeBlock
                code1={code5}
                language1="java"
            />
             <TextBlock title="Repositorio de las tareas"/>
             <CodeBlock
                code1={code6}
                language1="java"
            />
            <TextBlock title="Migraciones de Django"/>
            <TextBlock textContent={text5}/>
            <CodeBlock code1={python3} language1="python"/>
        </div>
      
    );
  };
  
  export default ModelSetup;