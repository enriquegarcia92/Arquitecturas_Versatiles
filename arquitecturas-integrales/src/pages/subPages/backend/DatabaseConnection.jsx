import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const text1 = `Los frameworks incluyen herramientas para manejar automáticamente las conexiónes en este caso se usa una base
de datos PostgreSQL local, la instalación de esta varía según sistema operativo:`
const text2 = `- Windows: Se instala mediante un .exe descargado en la página oficial de PostgreSQL.`
const text3 = `- Mac OS: Mediante Homebrew.`
const text4 = `- Ubuntu:/Linux: Mediante apt.`
const java1 = `
En el archivo src/main/resources/application.properties se debe colocar la siguiente configuración:

spring.datasource.url=jdbc:postgresql://db:5432/flytask
spring.datasource.username=postgres
spring.datasource.password=password
spring.jpa.generate-ddl=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.default_schema=public

Esta configuración hace uso de la libería JPA para automáticamente manejar las entidades dentro de la base de datos.
`

const python2 = `#En el proyecto principal de Django se crea un archivo llamado settings.py, en la sección
#Databases se debe agregar la siguiente configuración:#Activación

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'flytask',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'db',
        'PORT': '5432',
        'OPTIONS': {
            'options': f'-c search_path=public'
        },
    }
}`

const type1 = `//Para preparar la conexión se crea la carpeta config y dentro de esta se coloca un archivo nuevo
//Archivo config/database.ts

//Uso de la libería sequelie para el manejo de la base de datos.
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('flytask', 'postgres', 'password', {
  host: 'db',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    freezeTableName: true
  },
});

export default sequelize;

//Despues se debe modificar el archivo index.ts con lo siguiente

  async function initialize() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      // Continue with your application logic here
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  initialize();
  
//Automáticamente la librería se encargará de la conexión`
const DatabaseConnection = () => {
    return (
        <div>
            <TextBlock title="Conexión a base de datos SQL"/>
            <TextBlock textContent={<pre>{text1}</pre>}/>
            <TextBlock textContent={<pre>{text2}</pre>}/>
            <TextBlock textContent={<pre>{text3}</pre>}/>
            <TextBlock textContent={<pre>{text3}</pre>}/>
            <CodeBlock
                code1={java1}
                language1="java"
                code2={python2}
                language2="python"
                code3={type1}
                language3="typescript"
            />
        </div>
      
    );
  };
  
  export default DatabaseConnection;
  