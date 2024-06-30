import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";
const text1 = `Para poder correr todas estas al mismo tiempo se utiliza la tecnología Docker Compose
y para hacer uso de esta se debe crear un archivo de formato yml llamado docker-compose en la carpeta
donde se encuentran todos los proyectos, este archivo de docker compose es capaz de crear y correr
distintos contenedores basándose en las imágenes individuales para cada proyecto.`

const code1 = `services:
#REVERSE PROXY
#Contenedor de nginx encragado de manejar toda la red y emascarar las rutas.
  nginx:
    build: ./nginx
    image: nginx
    container_name: "nginx_container"
    ports:
      - 80:80
    depends_on:
      - java_app
      - java_app_mdb
      - arquitecturas_integrales
      - django_postgre
      - django_mdb
      - react
      - react_mdb
    volumes:
    - ./nginx:/etc/nginx/conf.d
#CONTENEDOR PAGINA INFORMATIVA
  arquitecturas_integrales:
    image: arquitecturas_integrales:1.0.0
    build: arquitecturas_integrales/.
    container_name: arquitecturas_integrales_container
    ports:
      - 5176:5176
#CONTENEDOR SPRING BASE DE DATOS SQL
  java_app:
    container_name: spring_postgre_container
    image: flytask-java-app:1.0.0
    build: flytask/.
    ports:
      - 7070:7070
    depends_on:
      - db
      - django_postgre
#CONTENEDOR SPRING BASE DE DATOS MONGODB 
  java_app_mdb:
    container_name: spring_mongo_container
    image: flytask-javamdb-app:1.0.0
    build: flytaskmongodb/.
    ports:
      - 8080:8080 
#CONTENEDOR DJANGO BASE DE DATOS SQL
  django_postgre:
    container_name: django_postgre_container
    image: flytask-python-app:1.0.0
    build: flytaskpy/.
    ports:
      - 8000:8000
    depends_on:
      - db
#CONTENEDOR DJANGO BASE DE DATOS MONGODB
  django_mdb:
    container_name: django_mongo_container
    image: flytaskmdb-python-app:1.0.0
    build: flytaskpymdb/.
    ports:
      - 8001:8001
#CONTENEDOR DE EXPRESS CON BASE DE DATOS SQL
  express_postgre:
    container_name: express_postgre_container
    image: flytask-node-app:1.0.0
    build: flytaskexpress/.
    ports:
      - 3000:3000
    environment:
      - SECRET_KEY=$SECRET_KEY
      - EMAIL_HOST_USER=$EMAIL_HOST_USER
      - EMAIL_HOST_PASSWORD=$EMAIL_HOST_PASSWORD
    depends_on:
      - db
#CONTENEDOR DE EXPRESS CON BASE DE DATOS MONGODB
  express_mongo:
    container_name: express_mongo_container
    image: flytaskmdb-node-app:1.0.0
    build: flytaskexpressmongo/.
    ports:
      - 3001:3001
    environment:
      - SECRET_KEY=$SECRET_KEY
      - EMAIL_HOST_USER=$EMAIL_HOST_USER
      - EMAIL_HOST_PASSWORD=$EMAIL_HOST_PASSWORD
#A estos contenedores se les pasan variables de entorno para que puedan correr en conjunto
#se necesitan dos debido a que un cliente estará conectado a las API de MongoDB y otro a la
#API de PostgreSQL, al enviar como variables de entorno los puertos y rutas se puede levantar
#dos clientes con el mismo proyecto que gracias a las arquitecturas explicadas en el apartado 
#de desarrollo front end y la uniformidad de las API pueden trabajar perfectamente con ambas 
#bases de datos.

#CONTENEDOR DE REACT QUE SE CONECTA A STREAM DE POSTGRE
  react:
    container_name: react_container
    image: react-app:1.0.0
    build: flytask-react/.
    ports:
      - 5173:5173
    environment:
      - VITE_URL_API=$VITE_POSTGRES_API
      - VITE_BASE_ROUTES=$VITE_REACT_POSTGRE_BASE
      - VITE_BASE_PORT=$VITE_POSTGRE_PORT
    depends_on:
      - java_app
      - django_postgre
#CONTENEDOR DE VUE QUE SE CONECTA A STREAM DE MONGO
  vue:
    container_name: vue_container
    image: vue-app:1.0.0
    build: flytask-vue/.
    ports:
      - 5163:5163
    environment:
      - VITE_URL_API=$VITE_POSTGRES_API
      - VITE_BASE_ROUTES=$VITE_VUE_POSTGRE_BASE
      - VITE_BASE_PORT=$VITE_VUE_POSTGRE_PORT
    depends_on:
      - java_app
      - django_postgre
#CONTENEDOR DE REACT QUE SE CONECTA A STREAM DE MONGO
  react_mdb:
      container_name: react_mdb_container
      image: react-mdb-app:1.0.0
      build: flytask-react/.
      ports:
        - 5170:5170
      environment:
        - VITE_URL_API=$VITE_MONGO_API
        - VITE_BASE_ROUTES=$VITE_REACT_MONGO_BASE
        - VITE_BASE_PORT=$VITE_MONGO_PORT
        - VITE_ROUTER_PATH=$VITE_VUE_POSTGRE_ROUTER_PATH
      depends_on:
        - java_app_mdb
        - django_mdb
#CONTENEDOR DE VUE QUE SE CONECTA A STREAM DE MONGO
  vue_mdb:
      container_name: vue_mdb_container
      image: vue-mdb-app:1.0.0
      build: flytask-vue/.
      ports:
        - 5160:5160
      environment:
        - VITE_URL_API=$VITE_MONGO_API
        - VITE_BASE_ROUTES=$VITE_VUE_MONGO_BASE
        - VITE_BASE_PORT=$VITE_VUE_MONGO_PORT
        - VITE_ROUTER_PATH=$VITE_VUE_MONGO_ROUTER_PATH
      depends_on:
        - java_app_mdb
        - django_mdb
#CONTENEDOR DE BASE DE DATOS SQL
#Este contenedor crea una instancia de base de datos PostgreSQL 
#el cual es consumido por todos los backend en el caso de la base
#de datos de MongoDB no se necesita ningún contenedor por que se 
#consume el servicio en línea de MongoDB Atlas.
  db:
      container_name: db
      image: db-1.0.0
      build: postgreinit/.
      ports:
        - "5432:5432"
      environment:
        - POSTGRES_USER=$POSTGRES_USER
        - POSTGRES_PASSWORD=$POSTGRES_PASSWORD
        - POSTGRES_DB=$POSTGRES_DB`
const ComposeSetup = () => {
    return (
      <div className="flex flex-col">
     <TextBlock title="Uso de Docker Compose"/>
     <TextBlock textContent={text1}/>
     <CodeBlock code1={code1} language1={"yml"}/>
      </div>
    );
  };
  
  export default ComposeSetup;