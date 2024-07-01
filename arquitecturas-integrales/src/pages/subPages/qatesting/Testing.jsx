import React from "react";
import TextBlock from "../../../components/TextBlock";
import ImageComponent from "../../../components/ImageComponent";
import TestingPiramid from "../../../img/test-piramide.jpeg";
import TestTable from "../../../img/table.png";
import Postman from "../../../img/postman.png";
import CreateS from "../../../img/create-s.png";
import CreateF from "../../../img/create-f.png";
import LoginS from "../../../img/login-s.png";
import LoginF from "../../../img/login-f.png";

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

const image2 = `${TestTable}`

const text5 = `En la columna 1 se coloca un identificador único para el caso de prueba, en la columna 2 se coloca el nombre del módulo que se está probando, en la columna 3 se coloca el caso de prueba, es decir, la acción que se va a realizar, en la columna 4 se coloca el resultado obtenido
en la prueba realizada, esta ultima nos indica que error es el que se debe comunicar al equipo de desarrollo en caso de que el estado de la prueba sea "Rechazado".
La matriz de prueba es elaborada por el QA Analyst, que se encarga de transformar los requerimientos y flujos en historias de usuario y casos de prueba, las pruebas pueden ser realizadas por el mismo
o por otro rol más especifico como sería un QA Tester, que se encarga de ejecutar las pruebas y documentar los resultados. Este tipo de pruebas resultan de gran utilidad en el momento de depurar errores sobre el producto final, suelen
tomar un tiempo considerable, pero es necesario para garantizar la calidad del producto final y que no sea complicado para el usuario final.`;

const text6 = `Como último punto es importante recordar que las pruebas de calidad son un proceso iterativo, es decir, que se realizan varias veces durante el desarrollo de la aplicación, conforme esta vaya creciendo los casos de prueba aumentan
y se deben realizar pruebas de regresión para garantizar que las nuevas funcionalidades no afecten las ya existentes. Es importante que el equipo de desarrollo y el equipo de QA trabajen de la mano para garantizar que el producto final sea de calidad y brindar el
apropiado mantenimiento a la matriz de pruebas para que esta sea de utilidad en el futuro. Cabe resaltar que cuando esta crece mucho y el número de casos aumenta a un número considerable, es recomendable la automatización de pruebas, ya que estas pueden ser ejecutadas
de manera más rápida y eficiente que las pruebas manuales, pero para esto es necesario, pero esto no se abordará en esta guía ... por ahora.`;

const text7 = `Las pruebas de API y UI son las que se realizan sobre la interfaz de usuario y sobre las API que se han desarrollado, estas pruebas son realizadas por el QA Tester y son de gran importancia ya que son las que garantizan que la aplicación cuente con una interfaz amigable, limpia y fácil de usar,
además de que las API funcionen correctamente y devuelvan la información esperada. Para realizar estas pruebas se pueden utilizar herramientas como Postman o Insomnia, que permite realizar pruebas sobre las API y verificar que estas devuelvan la información esperada, 
también se pueden realizar pruebas de carga y de estrés para verificar que las API soporten la cantidad de peticiones esperadas y que no se caigan en momentos de alta demanda. Para las pruebas de UI se pueden utilizar herramientas como Selenium o Cypress, que permiten realizar pruebas sobre la interfaz de usuario y verificar que esta se comporte de la manera esperada.

Acá se exploran las pruebas de API, que en este ejemplo se realizarán sobre la API de la aplicación de tareas que se ha desarrollado en la guía, para esto se utilizará Postman, que es una herramienta que permite realizar pruebas sobre las API y verificar que estas devuelvan la información esperada. También se verifican los estados de las peticiones
ya que estas deben seguid cierto estandard para que el front-end pueda interpretarlas correctamente. Esto se hace de la siguiente manera:`;

const text8 = `La herramienta utilizada fue Postman, que es una herramienta que permite realizar pruebas sobre las API y verificar que estas devuelvan la información esperada. 
En la imagen se puede ver que se ha exportado la colección de pruebas de la API de FlyTask. Para este ejemplo probaremos el Iniciar Sesión y Crear una tarea, que son unas de las funcionalidades más importantes de la aplicación, revisaremos:
- Iniciar sesión, resultado esperado: 200 OK
- Iniciar sesión, resultado esperado: 400 Bad Request
- Crear una tarea, resultado esperado: 201 Created
- Crear una tarea, resultado esperado: 400 Bad Request


Los detalles a tener en cuenta son:`;

const image3= `${Postman}`;

const text9 = `1. El ambiente al que se está apuntando, en este caso se está apuntando al servidor local, que es donde se encuentra la API de FlyTask.
2. El Payload o cuerpo de la petición, que es la información que se envía al servidor para que este realice la acción solicitada, en este caso se está enviando un JSON con la información de la tarea que se desea crear, 
normalmente este cuerpo se encuentra en la documentación de la API que debe realizar el desarrollador backend.

Para cada petición se recomienda realizar una prueba "Happy Path" que es en la que se espera un resultado exitoso y una "Prueba de error" en la que se modifica
la data que se manda para que la API nos responda con un error o al menos eso es lo que se espera, si la prueba de error no nos devuelve un error o nos devuelve un error inesperado,
se debe comunicar al equipo de desarrollo para que este realice las correcciones necesarias.`;

const image4 = `${LoginF}`;
const image5 = `${LoginS}`;
const image6 = `${CreateF}`;
const image7 = `${CreateS}`;

const text10 = `Para la petición de iniciar sesión primero se prueban con credenciales inválidas, esperando obtener el código de error 400 Bad Request, en la imagen se puede ver que la petición
no devolvió error, pero no el esperado, ya que se esperaba un 400 Bad Request, por lo que se debe comunicar al equipo de desarrollo para que este realice las correcciones necesarias; luego se prueba con las 
credenciales correctas y se obtiene el código de estado 200 OK, que es el esperado, por lo que se puede continuar con las pruebas de la API.`;

const text11 = `Para la petición de crear una tarea primero se prueban con datos inválidos, esperando obtener el código de error 400 Bad Request, en la imagen se puede ver que la petición
devuelve el estado 500, que no es el esperado, por lo que se debe comunicar al equipo de desarrollo para que este realice las correcciones necesarias; luego se prueba con los datos correctos y se obtiene el código de estado 200 OK, 
que tampoco es el esperado, ya que se esperaba un 201 Created, por lo que se debe comunicar al equipo de desarrollo para que este realice las correcciones necesarias.

Como podemos observar, el proceso de pruebas de API es de gran importancia ya que nos permite verificar que las API funcionen correctamente y devuelvan la información esperada, además de que nos permite verificar 
los estados de las peticiones y que estos sean los esperados,`;

const text12 = `Las pruebas de UI son las que se realizan sobre la interfaz de usuario, es decir, sobre la aplicación o sitio web con la que el usuario final va a interactuar, 
pero siempre se deben realizar en un ambiente de pruebas, antes de que la aplicación llegue a producción. Estas pruebas son realizadas por el QA Tester y son de gran importancia ya que son las que garantizan 
que la aplicación cuente con una interfaz amigable, limpia y fácil de usar. Una guía de ayuda para revisar la UI es el diseño que se realiza antes de comenzar el desarrollo, normalmente se realiza un prototipo de la aplicación
esta puede ser realizada en herramientas como Figma, Adobe XD o Sketch, que permiten realizar prototipos de alta fidelidad y que se pueden utilizar para realizar pruebas de UI. 
Para realizar estas pruebas se pueden utilizar herramientas como Selenium o Cypress, que permiten realizar pruebas sobre la interfaz de usuario y verificar que esta se comporte de la manera esperada.
Trabajar con Cypress es entrar en el mundo de las pruebas automatizadas, ya que esta herramienta permite realizar pruebas de regresión y de integración de manera más rápida y eficiente que las pruebas manuales, por el momento
no se exploran en esta guía, pero se espera que en futuras versiones se pueda explorar esta herramienta y su utilidad en el proceso de desarrollo de software.`;

const Testing = () => {
    return(
        <div className="flex flex-col">
        <TextBlock title= "Pruebas de Control de Calidad"/>
        <TextBlock textContent={text1}/>
        <TextBlock textContent={text2}/>
        <ImageComponent 
        image={image1}
        width="w-96"
        height="h-80" 
        title="piramide de pruebas de calidad"
        />
        <TextBlock textContent={text3}/>
        <TextBlock title= "Pruebas Manuales y Exploratorias" textContent={text4} />
        <ImageComponent 
        image={image2}
        width="w-96"
        height="h-80" 
        title="tabla de pruebas"/>
        <TextBlock textContent={text5}/>
        <TextBlock textContent={text6}/>
        <TextBlock title="Pruebas de API y UI" textContent={text7} />
        <TextBlock textContent={text8}/>
        <ImageComponent
        image={image3}
        width="w-3/4"
        height="h-1/3" 
        title="configuración de postman"/>
        <TextBlock textContent={text9}/>
        <ImageComponent
        image={image4}
        width="w-3/4"
        height="h-1/3"  
        title="login fail"/>
        <ImageComponent
        image={image5}
        width="w-3/4"
        height="h-1/3" 
        title="login successful"/>
        <TextBlock textContent={text10}/>
        <ImageComponent
        image={image6}
        width="w-3/4"
        height="h-1/3" 
        title="create fail"/>
        <ImageComponent
        image={image7}
        width="w-3/4"
        height="h-1/3"  
        title="create successful"/>
        <TextBlock textContent={text11}/>
        <TextBlock textContent={text12}/>
        </div>
        
    );

};

export default Testing;