import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";
const text1 = `La compilación y despliegue de las aplicaciones se realiza mediante las tecnologías
       Docker y Docker-Compose, lo primero que se realiza es crear los archivos Dockerfile individuales para 
       cada uno de los proyectos de flytask, las cuales deben crear una imagen ejecutable por docker con los
      proyectos ya compilados.`
const text2 = `Para cada uno de los proyectos se implementa un archivo en el directorio principal el cual
 genera una imagen que docker puede ejecutar, este archivo se llama Dockerfile, no posee extensiones y tiene
  su propia estructura.`
const code1 = `#Uso de imagen de maven y java
FROM maven:3.8.4-openjdk-17-slim AS builder

#Creacion de directorios
WORKDIR /app

#colocar pom en contenedor
COPY pom.xml .

COPY src src/

#Instalar dependencias
RUN mvn clean install -DskipTests

FROM openjdk:17-slim

#Cargar variables de entonro
ENV DATABASE_URL=jdbc:postgresql://db:5432/flytask
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=password

WORKDIR /app

#Obtener compilado
COPY --from=builder /app/target/*.jar app.jar
#Indicar el punto de arranque
ENTRYPOINT ["java", "-jar", "app.jar"]
`
const text3 = `Este Dockerfile primero levanta un entorno de maven y java para que el proyecto pueda compilar,
 luego crea una compilación preparada para un entorno de producción con el comando RUN y finalmente instancia 
 como punto de inicio de la imagen el archivo .jar resultante de la compilación. Debido a que las dependencias 
 son instaladas directamente por maven según el contenido del archivo pom.xml el archivo de la aplicación de java 
 que se conecta a MongoDB es exactamente el mismo.
`
const code2 = `# Usa una imagen base de Python
FROM python:3.9

# Establece variables de entorno para la ejecución en un contenedor
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Instala las dependencias de la aplicación
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código de la aplicación al contenedor
COPY . /app/

# Copia el entrypoint.sh y dale permisos de ejecución
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Puerto en el que la aplicación Django va a ejecutarse
EXPOSE 8000

# Usa entrypoint.sh como el punto de entrada
ENTRYPOINT ["/app/entrypoint.sh"]
`
const text4 = `Debido a que el entorno de la imagen se considera como un entorno aislado no se requiere 
instanciar un entorno virtual, el Dockerfile llama directamente una versión de python e instala las
dependencias del archivo requirements.txt, como en django es requerido ejecutar migraciones, se copia 
dentro de los archivos internos del contenedor un archivo llamado entrypoint.sh, el cual se coloca en la
carpeta principal del proyecto, la cual tiene el contenido que se presenta a continuación:`
const code3 = `#!/bin/bash

# Revisar si la base está lista
check_postgres() {
    python3 -c "import sys, psycopg2
try:
    conn = psycopg2.connect(dbname='flytask', user='postgres', password='password', host='db')
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)"
}

#Esperar a que la base esté preparada
until check_postgres; do
    echo "PostgreSQL is unavailable - sleeping"
    sleep 1
done

echo "PostgreSQL is up - continuing..."

#Correr migraciónes python manage.py makemigrations users
python manage.py makemigrations tasks
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000` 

const code4 = `#!/bin/bash

# Revisar si la base de mongo esta lista
check_mongodb() {
    python3 -c "import sys, pymongo
try:
    client = pymongo.MongoClient('mongodb+srv://<username>:<password>@flytaskcluster.xlycw9x.mongodb.net/flytask?retryWrites=true&w=majority')
    client.admin.command('ping')
except pymongo.errors.ConnectionFailure:
    sys.exit(-1)
sys.exit(0)"
}

# Espera la base de mongo
until check_mongodb; do
    echo "MongoDB is unavailable - sleeping"
    sleep 1
done

echo "MongoDB is up - continuing..."

# Corre las migraciones
python manage.py makemigrations users
python manage.py makemigrations tasks
python manage.py migrate
python manage.py runserver 0.0.0.0:8001
`
const code5 = `#Uso de la ultima versión de node
FROM node:22-alpine

#Instanciar directorio de trabajo del contenedor
WORKDIR /app

#Copiar archivo en el directorio de trbajo
COPY package*.json ./

#Instalar dependencias
RUN npm install

#Copiar el resto del codigo al contenedor
COPY . .

#Colocar variables de entorno
ENV SECRET_KEY=$SECRET_KEY
ENV EMAIL_HOST_USER=$EMAIL_HOST_USER
ENV EMAIL_HOST_PASSWORD=$EMAIL_HOST_PASSWORD

# Exponer puerto
EXPOSE 3000

# Correr app
CMD ["npm", "start"]`

const code6 = `# Usa una imagen base de Node.js para el desarrollo de la aplicación
FROM node:20 AS development

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

ENV VITE_URL_API=$VITE_URL_API
ENV VITE_BASE_ROUTES=$VITE_BASE_ROUTES
ENV VITE_BASE_PORT=$VITE_BASE_PORT

# Expon el puerto 5176 para Vite
EXPOSE $BASE_CONFIG_PORT

# Comando por defecto para ejecutar Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
`

const code7 = `# Usa una imagen base de Node.js para el desarrollo de la aplicación
FROM node:20 AS development

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

ENV VITE_URL_API=$VITE_URL_API
ENV VITE_BASE_ROUTES=$VITE_BASE_ROUTES
ENV VITE_BASE_PORT=$VITE_BASE_PORT
ENV VITE_ROUTER_PATH=$VITE_ROUTER_PATH

# Expon el puerto 5176 para Vite
EXPOSE $BASE_CONFIG_PORT

# Comando por defecto para ejecutar Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
`
const Deployment = () => {
    return (
      <div className="flex flex-col">
      <TextBlock title="Preparación individual de los proyectos."/>
      <TextBlock textContent={text1}/>
      <TextBlock textContent={text2}/>
      <TextBlock title="Dockerfile para projectos de Java"/>
      <CodeBlock code1={code1} language1={"dockerfile"}/>
      <TextBlock textContent={text3}/>
      <TextBlock title="Dockerfile para projectos de Python"/>
      <CodeBlock code1={code3} language1={"bash"}
                 code2={code4} language2={"bash"}/>
      <TextBlock textContent={text4}/>
      <TextBlock title="Dockerfile para projectos de Express"/>
      <CodeBlock code1={code5} language1={"dockerfile"}/>
      <TextBlock title="Dockerfile para projectos de React"/>
      <CodeBlock code1={code6} language1={"dockerfile"}/>
      <TextBlock title="Dockerfile para projectos de Vue"/>
      <CodeBlock code1={code7} language1={"dockerfile"}/>
      </div>
    );
  };
  
  export default Deployment;