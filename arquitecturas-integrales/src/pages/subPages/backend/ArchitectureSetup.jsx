import React from "react";
import TextBlock from "../../../components/TextBlock";
import mvcspring from "../../../img/mvcspring.png";
import ImageComponent from "../../../components/ImageComponent"
import djangomainarch from "../../../img/djangomainarch.png";
import djangotaskarch from "../../../img/djangotaskarch.png";
import djangouserarch from "../../../img/djangouserarch.png";
import expressarch from "../../../img/expressarch.png";
import CodeBlock from "../../../components/CodeBlock";


const text1 = `En el contexto de desarrolo de una API, es importante la implementación de la arquitectura MVC,
esto se relaiza mediante una distribución de carpetas y separación de archivos según el funcionamiento del framework y
apegandose a los principios Solid.`

const code1 = `
#Se debe crear dentro de la carpeta pricncipal una app por cada entidad de la siguiente forma
#Se crea aplicación para usuarios
django-admin startapp users
#Se crea aplicaicón para las tareas
django-admin startapp tasks
`
const ArchitectureSetup = () => {
    return (
        <div className="flex flex-col">
            <TextBlock title="Preparación de la arquitectura."/>
            <TextBlock textContent={text1}/>
            <TextBlock title="Arquitectura MVC para Spring Boot" textContent="Modelos = Models, Vista = Controllers, Controlador = Services."/>
            <ImageComponent
                image={mvcspring}
                width="w-64"
                height="h-64" // Example of using Tailwind CSS height utility class
                description="Estrucutra del proyecto principal"
             />
            <TextBlock title="Arquitectura MVC para Django" textContent="Modelos = models, Vista = urls, Controlador = views."/>
            <ImageComponent
                image={djangomainarch}
                width="w-64"
                height="h-64" // Example of using Tailwind CSS height utility class
                description="Estructura pricipal del proyecto."
             />
            <TextBlock textContent="Para el caso de Django se debe preparar la arquitectura mediante comandos."/>
            <CodeBlock code1={code1} language1="python"/>
            <TextBlock textContent="Dando como resultado las siguientes estructuras:"/>
            <ImageComponent
                image={djangouserarch}
                width="w-64"
                height="h-64" // Example of using Tailwind CSS height utility class
                description="Estrucutra interna del proyecto para los usuarios."
             />
            <ImageComponent
                image={djangotaskarch}
                width="w-64"
                height="h-64" // Example of using Tailwind CSS height utility class
                description="Estructura interna del proyecto para las tareas."
             />
            <TextBlock title="Arquitectura MVC para Express"
            textContent="Modelo = models, Vista = controllers, Controlador = index"
            />
            <ImageComponent
                image={expressarch}
                width="w-64"
                height="h-64" // Example of using Tailwind CSS height utility class
                description="Estructura del proyecto principal"
             />
        </div>
      
    );
  };
  
  export default ArchitectureSetup;