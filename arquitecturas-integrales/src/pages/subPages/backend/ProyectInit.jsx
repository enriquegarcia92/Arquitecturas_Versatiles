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
		</dependency>`

const python1 = `
#Para inicializar el proyecto de Django se debe instalar una versión de python3.9 o superior el cual incluye
#Internamente el manejador de paquetes de python "pip"
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
            />
        </div>
      
    );
  };
  
  export default ProyectInit;
  