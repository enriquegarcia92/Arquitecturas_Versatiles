import React from "react";
import TextBlock from "../../../components/TextBlock";
import ImageComponent from "../../../components/ImageComponent";
import TestingPiramid from "../../../img/TestinPyramid.jpeg";
import TestTable from "../../../img/table.png";

const text1 = `Como uno de los últimos pasos del proceso de desarrollo, se realizan las 
pruebas de calidad en el software, estas normalmente las realiza un rol especializado 
llamado QA Tester que se encarga de garantizar que la aplicación cumpla con las funcionalidades 
que se acordaron desde el levantamiento de requerimientos. 
Este interactúa con la aplicación final, de preferencia en un ambiente de pruebas o previo al lanzamiento a producción, 
su comportamiento es similar al esperado por un usuario final, pero con el detalle de que deben 
documentar las pruebas que se realicen e informar al equipo de desarrolladores de las fallas 
que la aplicación presenta para que estas sean resueltas antes de llegar a los clientes finales.`;

const text2 = `El proceso de QA (Quality Assurance) se puede realizar de manera manual o automática, 
en esta guía se explora el testing manual ya que es la base para poder realizar una buena automatización de pruebas, 
también que para proyectos que no sean enormes no es muy recomendable el desarrollo de pruebas automatizadas 
ya que estas son útiles para las regresiones en una aplicación extensa y se puede perder 
tiempo que resulta de utilidad para las pruebas Manuales y Exploratorias o UI y API Testing
Para entender de mejor manera cómo comenzar a probar la aplicación, se presenta la siguiente imagen:`;

const image1 =  `${TestingPiramid}`;

const text3 = `La parte superior de la pirámide es la que comprende la mayor parte del QA Manual, que se explora en este capítulo.
En la parte inferior se encuentran las pruebas unitarias, que son realizadas por los desarrolladores, estas pruebas no serán tomadas
en cuenta en esta guía, ya que se asume que se realizaron correctamente en el desarrollo de la aplicación. Al igual que las pruebas de componentes,
que son realizadas por los desarrolladores de Front-End y que también se asume que se realizaron correctamente.`;

const text4 = `Las pruebas manuales y exploratorias son las que se realizan sobre el producto final, es decir sobre la aplicación o 
sitio web con la que el usuario final va a interactuar. Se les conoce por su nombre ya que son pruebas que se realizan de manera manual y al ser realizadas se logra
una mejor comprensión del programa y se pueden encontrar errores que no se habían detectado en las pruebas unitarias o de componentes. El flujo que se sigue con ellas es similar al que 
un usuario final seguiría, se prueban las funcionalidades de la aplicación y se documentan los errores que se encuentren. Es recomendable que para estas pruebas se realice un documento en donde 
se separen los casos de prueba, los resultados esperados y los resultados obtenidos, de esta manera se puede llevar un control de las pruebas realizadas y de los errores encontrados. 
Una de las maneras más utilizadas es construyendo los casos de prueba en una tabla de Excel, en donde se coloca el modulo, el caso de prueba y el resultado obtenido, la manera en la que se sugiere es la siguiente:`;

const img2 = `${TestTable}`

const text5 = `En la columna 1 se coloca un identificador único para el caso de prueba, en la columna 2 se coloca el nombre del módulo que se está probando, en la columna 3 se coloca el caso de prueba, es decir, la acción que se va a realizar, en la columna 4 se coloca el resultado obtenido
en la prueba realizada, esta ultima nos indica que error es el que se debe comunicar al equipo de desarrollo en caso de que el estado de la prueba sea "Rechazado".
La matriz de prueba es elaborada por el QA Analyst, que se encarga de transformar los requerimientos y flujos en historias de usuario y casos de prueba, las pruebas pueden ser realizadas por el mismo
o por otro rol más especifico como sería un QA Tester, que se encarga de ejecutar las pruebas y documentar los resultados. Este tipo de pruebas resultan de gran utilidad en el momento de depurar errores sobre el producto final, suelen
tomar un tiempo considerable, pero es necesario para garantizar la calidad del producto final y que no sea complicado para el usuario final.`;

const text6 = `Como último punto es importante recordar que las pruebas de calidad son un proceso iterativo, es decir, que se realizan varias veces durante el desarrollo de la aplicación, conforme esta vaya creciendo los casos de prueba aumentan
y se deben realizar pruebas de regresión para garantizar que las nuevas funcionalidades no afecten las ya existentes. Es importante que el equipo de desarrollo y el equipo de QA trabajen de la mano para garantizar que el producto final sea de calidad y brindar el
apropiado mantenimiento a la matriz de pruebas para que esta sea de utilidad en el futuro. Cabe resaltar que cuando esta crece mucho y el número de casos aumenta a un número considerable, es recomendable la automatización de pruebas, ya que estas pueden ser ejecutadas
de manera más rápida y eficiente que las pruebas manuales, pero para esto es necesario, pero esto no se abordará en esta guía ... por ahora.`;


const Testing = () => {
    return(
        <div className="flex flex-col">
        <TextBlock title= "Pruebas de Control de Calidad"/>
        <TextBlock textContent={text1}/>
        <TextBlock textContent={text2}/>
        <ImageComponent source={image1}/>
        <TextBlock textContent={text3}/>
        <TextBlock title= "Pruebas Manuales y Exploratorias" textContent={text4} />
        <ImageComponent source={img2}/>
        <TextBlock textContent={text5}/>
        <TextBlock textContent={text6}/>
        <TextBlock title="Pruebas de API y UI" />
        </div>
    );

};

export default Testing;