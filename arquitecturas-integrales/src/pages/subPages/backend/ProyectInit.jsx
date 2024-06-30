import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const text1 = `La inicialización de un proyecto de Back End consiste en crear la estrucutra bácisca del framework y la instalación de todas las librerías o dependencias del framework
        que van a ser utilizadas a lo largo del desarrollo`

const java1 = `<!--
Spring Boot

Se requiere tener instalada una versión de Java 17 o superior
Se recomienda el uso de IntelliJ IDEA comunity edition

Para crear el proyecto se puede hacer uso del siguiente enlace que conduce al sitio web Sring Initializr:
https://start.spring.io/

Dentro de este sitio se deben segurír los pasos:

- Seleccionar el proyecto de como Maven
- Seleccionar la versión de Java que se va a utilizar en este caso java 17
- Seleccionar la Spring en este caso se sua 3.3.1
- Seleccionar el tipo de compilación ya sea jar o war
- Seleccionar las dependencias, en el caso de flytask se utilizan:
    * Spring Data JPA
    * Lombok
    * PostgreSQLDriver
    * Spring Security
    * Validatoin
    * Java Mail Sender

Además para el uso de autenticación JWT se agrega en el archivo pom.xml las siguientes dependencias
dentro de las tags dependencies: -->

        <dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-api</artifactId>
			<version>0.11.5</version>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-impl</artifactId>
			<version>0.11.5</version>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-jackson</artifactId>
			<version>0.11.5</version>
			<scope>runtime</scope>
		</dependency>
        
//Finalmente para ejecutar el proyecto se abre se accede al archivo main del proyecto y se da click al boton
//de ejecutar en el IDE`

const python1 = `
#Para inicializar el proyecto de Django se debe instalar una versión de python3.9 o superior el cual incluye
#Internamente el manejador de paquetes de python "pip"

#Se recomienda el uso del IDE Pycharm Comunity Edition

#En el caso del manejo de librerías para Django se recomienda el uso de un entorno virtual de python para
#Asegurar la separación de las dependencias por proyecto y una mejor integridad estructural del proyecto.
#Para ello se debe ejecutar en una terminal los siguientes comandos:

#Se crea el entorno virtual
python -m venv venv
#Activación en windows
./venv/bin/activate
#Activación en Linux/Macos
source venv/bin/activate
#Desactivación de entorno virtual en caso de necesitar salir de este
deactivate

#Luego de esto se debe crear en una carpeta un archivo requirements.txt el cual manejará las dependencias del
#Proyecto:
asgiref==3.8.1
bcrypt==4.1.3
cryptography==42.0.7
django
django-cors-headers==4.3.1
djangorestframework==3.15.1
PyJWT==2.8.0
psycopg2-binary==2.9.9
pycparser==2.22
sqlparse==0.4.4
#Se ejecuta el siguiente comando para instalarlas:
pip install -r requirements.txt
#Con las dependencias instaladas se puede inicializar el proyecto de Django de la siguiente forma:
django-admin startproyect flytask
#Lo que creará todos los archivos necesarios para el funcionamiento del proyecto con el framework de django

#En el caso de django se debe agregar la configuración de cors dentro del archivo settings.py en el proyecto
#flytask creado, se debe agregar la siguiente congiguración en la sección middleware:

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Correct spelling
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

#Luego se agrega en la sección installed apps la app de corsheaders que viene de las dependencias ya instaladas
#En conjunto con la app rest_framework que indica a Djagno que el proyecto será una api
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders'
]

#Finalmente se debe agregar las siguientes variables en cualquier parte del archivo
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

#Con todo preparado el proyecto se ejecuta con el siguiente comando
python manage.py runserver 0.0.0.0
`

const type1 = `//Para iniciar un proyecto de express se debe tener instalado Node.js 22.0.0 
//Se recomienda hacer uso del editor Visual Studio Code

//La instalación de Node incluye su propio manejador de paquetes llamado "npm"

//Para crear el proyecto, se crea una carpeta nueva y se ejecuta el comando
npm init -y

//Este creará el archivo package.json
{
  "name": "flytaskexpress",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    //Se agrgea este script para que el proyecto funcione con un archivo de typescript index.ts
    "start": "ts-node src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
//En este archivo se deben designar todas las dependencias que se utilizarán
  "dependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/dotenv": "^8.2.0",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/nodemailer": "^6.4.15",
    "@types/sequelize": "^4.28.20",
    "bcryptjs": "^2.4.3",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "nodemailer": "^6.9.13",
    "pg": "^8.12.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.3"
  },
//Dependencias principales para crear el proyecto de Express con typescript
  "devDependencies": {
    "@types/express": "^4.17.21",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  }
}

//Estas dependencias se pueden instalar manualmente ejecutando
npm install 'nombre de dependencia'
//Con las dependencias agregadas se ejecuta el comando
npm install

//Manualmente se crea la carpeta src y dentro de esta el archivo index.ts
//Luego se debe crear en la carpeta pricipal el archivo tsconfig.json
{
    "compilerOptions": {
      "target": "es2020",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "outDir": "./dist"
    },
    "include": [
      "src/**/*.ts"
    ],
    "exclude": [
      "node_modules"
    ]
}

//En el archivo index.ts se importa la siguiente configuración
//de la librería dotenv se inicailziza para que se carguen las variables de entorno
dotenv.config();

const app = express();
const port = 3000;

// Middleware para manejar Json en la API
app.use(express.json());

//Punto de rranque del proyecto
app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});
//El proyecto se corre con el comando
npm run dev
`
const ProyectInit = () => {
    return (
        <div>
            <TextBlock title="Inicialización de proyectos."/>
            <TextBlock textContent={text1}/>
            <CodeBlock
                code1={java1}
                language1="java"
                code2={python1}
                language2="python"
                code3={type1}
                language3="typescript"
            />
        </div>
      
    );
  };
  
  export default ProyectInit;
  