import React from "react";
import TextBlock from "../../../components/TextBlock";
import mvcspring from "../../../img/mvcspring.png";
import ImageComponent from "../../../components/ImageComponent";

const text1 = `En el contexto de desarrolo de una API, es importante la implementación de la arquitectura MVC,
esto se relaiza mediante una distribución de carpetas y separación de archivos según el funcionamiento del framework y
apegandose a los principios Solid.`


const ArchitectureSetup = () => {
    return (
        <div>
            <TextBlock title="Preparación de la arquitectura."/>
            <TextBlock textContent={text1}/>
            <TextBlock title="Arquitectura MVC para Spring Boot"/>
            <ImageComponent
                image={mvcspring}
                width="w-80"
                height="h-80" // Example of using Tailwind CSS height utility class
                description="Modelos = Modelos, Vista = Controllers, Controlador = Services."
             />
        </div>
      
    );
  };
  
  export default ArchitectureSetup;