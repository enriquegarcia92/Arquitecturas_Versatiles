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
            />
        </div>
      
    );
  };
  
  export default DatabaseConnection;
  