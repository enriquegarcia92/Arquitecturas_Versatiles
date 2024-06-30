import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";
const text1 = `Nginx es utilizado para implementar un reverse proxy, esto significa que el contenedor se 
encarga de enmascarar las rutas originales a los contenedores, esto agrega una capa de seguridad y facilita 
la implementación de un dominio y certificado SSL al momento de pasar a producción. Para ello se debe crear 
un archivo llamado default.conf. Primero se definen los orígenes de datos a los que se les llama upstreams
 estos son los contenedores y los puertos que se encuentran en la misma red a los cuales se les asigna un nombre`

const code1 = `upstream postgre_api {
    server java_app:7070;
    server django_postgre:8000;
    server express_postgre:3000;
}

upstream mongo_api {
    server java_app_mdb:8080;
    server django_mdb:8001;
    server express_mongo:3001;
}

upstream react {
    server react:5173;
}

upstream vue{
    server vue:5163;
}

upstream vue_mdb{
    server vue_mdb:5160;
}


upstream react_mdb {
    server react_mdb:5170;
}

upstream arquitecturas_integrales {
    server arquitecturas_integrales:5176;
}`

const text2 = `Los backend se encuentran separados en dos upstreams, postgre_api y mongo_api, tal como 
su nombre lo indica depende de la base de datos a la que estos se conecten, nginx por defecto implementa 
un protocolo llamado round robin, lo que significa que va a recorrer el listado de servidores dentro del 
upstream uno por uno para cada petición que se haga a este, y al terminar la lista la repite una y otra vez. 
luego se configura el servidor al puerto que está expuesto el contenedor siendo este el 80, y se coloca 
el dominio, en el entorno actual este se corre de forma local por ello a la propiedad servername se le coloca
 localhost o 127.0.0.1`

const code2 = `server {
    listen 80;
    server_name localhost;

    # Location block for generic requests
    location / {
        proxy_pass http://arquitecturas_integrales;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /react {
        proxy_pass http://react;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /vue {
        proxy_pass http://vue;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /vue_mdb {
        proxy_pass http://vue_mdb;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }


    location /react_mdb {
        proxy_pass http://react_mdb;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Location block for Java app
    location /postgre_api {
        rewrite ^/postgre_api/(.*) /$1 break;
        proxy_pass http://postgre_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /mongo_api {
        rewrite ^/mongo_api/(.*) /$1 break;
        proxy_pass http://mongo_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`
const text3 = `Dentro del servidor se colocan las localizaciones, estas son las rutas que al ser consultadas
 redirigen a los distintos upstreams, la estructura básica es que a la propiedad proxy_pass se le coloca el 
 contenedor o listado de estos, a la propiedad proxy_set_header se le coloca por defecto el host siendo este 
 localhost y el resto son configuraciones propias de nginx necesarias las cuales definen internamente como hacer 
 la redirección. En el caso de las api se agrega la propiedad rewrite, la cual indica a nginx que debe de relanzar
  la petición buscando dentro de las rutas bajo la ruta mongo_api o postgre api y así se vuelve posible consultar
   todos los endpoints internos de cada una de ellas.
`
const NginxSetup = () => {
    return (
      <div className="flex flex-col">
        <TextBlock title="Uso de nginx"/>
        <TextBlock textContent={text1}/>
        <CodeBlock code1={code1} language1={"conf"}/>
        <TextBlock textContent={text2}/>
        <CodeBlock code1={code2} language1={"conf"}/>
        <TextBlock textContent={text3}/>
      </div>
    );
  };
  
  export default NginxSetup;