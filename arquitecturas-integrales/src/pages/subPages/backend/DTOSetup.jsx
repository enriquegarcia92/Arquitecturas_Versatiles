import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const text1 = `Para el manejo de entidades es recomendable hacer uso de objetos que facilitan la opteción de 
la información, además de encargarse de la validación y filtrar las salidas de datos, a estos elemento se les
conoce como DTO.`

const code1= `//En spring se colocan los DTO dentro de la carpeta model en su propia sub carpeta
//Archivo src/main/model/DTO/LoginRequest.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    //Anotaciónes de Spring Validator que implementan condiciones especificas para cada atributo.
    @NotEmpty(message = "email must not be null")
    String email;
    @NotEmpty(message = "password must not be null")
    String password;
}
//Archivo src/main/model/DTO/RegisterRequest.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotEmpty(message = "name must not be null")
    private String name;
    @NotEmpty(message = "email must not be null")
    private String email;
    @NotEmpty(message = "password must not be null")
    private String password;
    @NotEmpty(message = "confirmation of password must not be null")
    private String confirmPassword;
}
//Archivo src/main/model/DTO/RecoveryDTO.java
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class RecoveryDTO {
    @NotEmpty(message = "New password is required")
    private String newPassword;
    @NotEmpty(message = "Password Confirmation is requred")
    private String passwordConfirmation;
    @NotEmpty(message = "Token for recovery is requried")
    private String token;
}
`
const code2 = `//Archivo src/main/model/DTO/TaskDto.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
    @NotEmpty(message = "title must not be null")
    private String title;
    @NotEmpty(message = "description must not be null")
    private String description;
    @NotNull(message = "due date must not be null")
    private Timestamp dueDate;
    @NotNull(message = "user identification must not be null")
    private Integer userId;
}
//Archivo src/main/model/DTO/TaskDto.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditTaskDTO {
    @NotEmpty(message = "title must not bel null")
    private String title;
    @NotEmpty(message = "description must not be null")
    private String description;
    @NotNull(message = "dueDate must not be null")
    private Timestamp dueDate;
}`

const python1 = `#En el caso de django se llaman serializadores:

class UserSerializer(serializers.ModelSerializer):
    #Enlace de datos recibidos con los campos de la base
    confirmPassword = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True, source='usr_name')
    email = serializers.EmailField(write_only=True, source='usr_email')
    password = serializers.CharField(write_only=True, source='usr_password')

    #Definicion del DTO
    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'confirmPassword']
        read_only_fields = ['usr_id']
        extra_kwargs = {
            'usr_password': {'write_only': True},
        }
    #Validaciones del DTO
    def validate(self, data):
        if data['usr_password'] != data['confirmPassword']:
            print("passwords not match")
            raise Exception("Passwords do not match")
        if User.objects.filter(usr_email=data['usr_email']).exists():
            print("email exists")
            raise Exception("Email already exists")
        return data
    #Creación del objeto
    def create(self, validated_data):
        validated_data.pop('confirmPassword')
        password = validated_data.pop('usr_password')
        validated_data['usr_role'] = 'CLIENT'
        instance = self.Meta.model(**validated_data)
        if password:
            # Hash the password using bcrypt
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
            instance.usr_password = hashed_password.decode('utf-8')  # Decode to store as string
        instance.save()
        return instance
`
const python2 = `
#Enlace de datos recibidos con los campos de la base para obtener datos de forma uniforme.
class TaskSerializer(serializers.ModelSerializer):
    taskId = serializers.IntegerField(source='tsk_id')
    title = serializers.CharField(source='tsk_title')
    description = serializers.CharField(source='tsk_desc')
    status = serializers.IntegerField(source='tsk_status')
    creationDate = serializers.DateTimeField(source='tsk_creation_date')
    dueDate = serializers.DateTimeField(source='tsk_due_date')
    class Meta:
        model = Task
        fields = ['taskId', 'title', 'description', 'status', 'creationDate', 'dueDate']
`
const type1 = `
//En express se crea en la carpeta middleware el archivo que verifica la validación según los DTO
export const validationMiddleware = (type: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(type, req.body);

    validate(dtoInstance).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        res.status(400).json({ errors });
      } else {
        req.body = dtoInstance;
        next();
      }
    });
  };
};
//DTO para iniciar sesión
export class LoginDTO {
    email!: string;
    password!: string;
  }
//DTO para crear un usuario nuevo
  export class CreateUserDTO {
    name!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;
  }
//DTO para recuperar la contraseña
  export class RecoverPwDTO {
    newPassword!: string;
    passwordConfirmation!: string;
    token!:string;
  }
  `
const type2 = `//DTO para crear tarea
export class TaskDTO {
    title!: string;
    description!: string;
    dueDate!: Date;
    userId!: number;
}
//DTO para modificar una tarea
export class UpdateTaskDTO {
    title!: string;
    description!: string;
    dueDate!: Date;
}`
const DTOSetup = () => {
    return (
      <div className="flex flex-col">
        <TextBlock title="Implementación de DTO´s (Data Transfer Objects)"/>
        <TextBlock textContent={text1}/>
        <TextBlock title="DTO´s de los usuarios"/>
        <CodeBlock 
        code1={code1} 
        language1="java"
        code2={python1}
        language2="python"
        code3={type1}
        language3="typescript"
        />
        <TextBlock title="DTO´s de las tareas"/>
        <CodeBlock 
        code1={code2} 
        language1="java"
        code2={python2}
        language2="python"
        code3={type2}
        language3="typescript"
        />
      </div>
    );
  };
  
  export default DTOSetup;
  