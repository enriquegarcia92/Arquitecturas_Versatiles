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


const ProyectInit = () => {
    return (
        <div>
            <TextBlock title="Inicialización de proyectos."/>
            <TextBlock textContent={text1}/>
            <CodeBlock
                code1={java1}
                language1="java"
            />
        </div>
      
    );
  };
  
  export default ProyectInit;
  