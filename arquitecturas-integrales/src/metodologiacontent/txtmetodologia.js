/* */

export const texto1 = `
La metodología para el desarrollo del proyecto se basará en SCRUM, 
el cual está basado en un enfoque iterativo e incremental, permitiendo la flexibilidad necesaria 
para adaptarse a las necesidades cambiantes del proyecto.

Scrum es un marco de trabajo ágil utilizado para gestionar y desarrollar proyectos complejos, especialmente
en el ámbito del software. Se basa en principios de colaboración, autoorganización y mejora continua.

Se basa en la metodología ágil y ayuda a los equipos a estructurar y gestionar el trabajo a través
de un conjunto de valores, principios y prácticas.

Aunque se utiliza con mayor frecuencia en equipos de desarrollo de software, los principios y 
lecciones de Scrum se pueden aplicar a todo tipo de trabajo en equipo. Esto ha llevado a su popularidad 
en una variedad de industrias.

Scrum se compone de una serie de reuniones, herramientas y roles que ayudan a los equipos a estructurar 
y gestionar su trabajo. En Scrum, el trabajo se divide en ciclos cortos y repetitivos llamados sprints, 
que generalmente duran de dos a cuatro semanas, durante los cuales los equipos trabajan para completar 
una cantidad específica de trabajo.`;

export const texto2 = `
- Análisis de requerimientos de la aplicación a desarrollar

  La fase de levantamiento de requerimientos comprende la base del proyecto en la cual se debe identificar,
  comprender y documentar las necesidades de los usuarios, las funcionalidades de la aplicación y las
  características técnicas que debe cumplir.

  Para esta fase es necesario realizar las siguientes sub-fases:

    1. Comprender las necesidades de los usuarios.
    2. Definir funcionalidades del sistema.
    3. Especificar las características técnicas (definición de diagrama de clases).

- Diseño

  Los requerimientos y funcionalidades de la aplicación definidos son la base para el flujo de la aplicación,
  la cual se diseña gráficamente antes de iniciar con la programación.
  Existen diferentes herramientas que permiten el diseño de mockups estáticos e interactivos, como por ejemplo
  Figma.

  Para esta fase es necesario realizar las siguientes sub-fases:

    1. Desarrollo de mockup.
    2. Requerimientos técnicos de hardware y software.

- Requerimiento de hardware:

    1. Procesador: 2.5 GHz o superior
    2. Memoria RAM: 16 GB mínimo
    3. Espacio en disco: 256 GB SSD mínimo
    4. Sistema operativo:
       - Windows 10 64-bit (build 19043 o posterior)
       - macOS 10.10 o posterior
       - Ubuntu 18.04 o posterior

- Requerimiento de software:

    1. IDE: Visual Studio Code
    2. Control de versiones: Git
    3. Frameworks: Angular, React, Spring Boot, Django, Express.js, Vue.js
    4. Bases de datos: MongoDB, PostgreSQL
    5. Contenedores: Docker, Docker Compose
    6. Servidor web: Nginx

  Estas herramientas son comúnmente utilizadas en el desarrollo de aplicaciones modernas y proporcionan 
  un entorno consistente y controlado para el desarrollo y la implementación de la aplicación.

- Diseño de arquitectura de la aplicación

  Para el desarrollo de aplicaciones basadas en una arquitectura Cliente-Servidor, se facilita el 
  manejo de las tecnologías de lógica de negocios y la interfaz de usuario, ya que se comunican de manera
  efectiva para establecer el flujo de datos necesarios para el funcionamiento de una aplicación.

  Se elige este tipo de arquitectura específicamente porque permite que mediante el protocolo HTTP y 
  el formato JSON todas las aplicaciones implementadas puedan ser consumidas por clientes diversos,
  lo que facilita el acceso a la lógica de negocios desde cualquier parte mediante internet.

  Para esta fase es necesario realizar las siguientes sub-fases:

    1. Selección de tecnologías para el frontend
    2. Selección de tecnologías para el backend
    3. Selección de bases de datos

- Patrones de diseño

  Facilitan la mantenibilidad y manipulación del código, permiten escalabilidad, separan las responsabilidades
  y facilitan la detección y corrección de errores. Según el programador, puede variar el patrón de diseño
  implementado, además de que está sujeto a cómo funciona la tecnología.

  Para esta fase es necesario realizar la siguiente subfase:

    1. Selección de patrones de diseño

- Buenas prácticas de seguridad

  La seguridad para un proyecto es de vital importancia. No es posible proveer al usuario una experiencia 
  de alta calidad al utilizar la aplicación si no se puede garantizar la seguridad de sus datos y 
  del sistema en sí.

  Para esta fase es necesario realizar la siguiente sub fase:

    1. Identificar algunas buenas prácticas de seguridad para el acceso remoto a los servidores, 
    controlar el flujo del tráfico entre los clientes y servidores, manejo y autenticación 
    de usuarios en la aplicación.

       A continuación se listan algunos ejemplos:

         a. SSH (Secure Shell): Se selecciona cuando se necesita un acceso remoto seguro a los servidores. 
         Es útil cuando se requiere administrar los servidores remotos o transferir archivos de manera segura.

         b. Reverse Proxy: Se elige cuando se necesita controlar y optimizar el flujo de tráfico entre 
         los clientes y los servidores. Es útil para balancear la carga, proporcionar seguridad adicional
         y mejorar la velocidad y eficiencia de las aplicaciones web.

         c. NoSQL: Se selecciona cuando se trabaja con grandes volúmenes de datos distribuidos. 
         Es útil cuando los datos no se ajustan a un esquema rígido, se necesitan escalabilidad horizontal
         y alta disponibilidad, o se requiere un rendimiento rápido con grandes volúmenes de datos.

         d. JWT (JSON Web Token): Se elige cuando se necesita manejar la autenticación o autorización de 
         los usuarios en la aplicación. Es útil cuando se requiere una manera segura de transmitir 
         información entre partes como la identidad de usuario, los roles y los privilegios.

- Programación

Para esta fase es necesario realizar las siguientes subfases:

	1. Implementación de buenas prácticas de codificación
	2. Implementación de los patrones de diseño
	3. Implementación de buenas prácticas de seguridad con JWT
	4. Desarrollo del front-end
	5. Desarrollo del back-end
	6. Integración del back-end y front-end

Pruebas
Para esta fase es necesario realizar la siguiente subfase:

	1. Pruebas unitarias: Verifican la precisión de un bloque de código aislado.
	2. Pruebas de integración: Evalúan cómo interactúan varios módulos de software.
	3. Pruebas de aceptación: Verifican si un sistema cumple con los requisitos empresariales.

Despliegue
El despliegue es una etapa esencial en el desarrollo de software que implica la transición de 
aplicaciones a producción. Para esta fase es necesario realizar las siguientes subfases:

Contenedores:
    Los contenedores ofrecen varias ventajas que los convierten en una opción ideal 
    para el despliegue moderno:
    
    1. Aislamiento: Las aplicaciones se ejecutan en entornos aislados, evitando 
    conflictos y problemas de compatibilidad.

    2. Portabilidad: Se pueden implementar en diferentes entornos, desde servidores 
    locales hasta nubes públicas.

    3. Escalabilidad: Se pueden escalar fácilmente para satisfacer las demandas 
    cambiantes de tráfico y carga de trabajo.

    4. Agilidad: Agilizan el proceso de despliegue, ya que no requieren la instalación
    de un sistema operativo completo para cada aplicación.

Servidor web:
   1. Infraestructura confiable: El servidor web cuenta con una infraestructura robusta 
   y confiable para garantizar la disponibilidad y el rendimiento óptimos de la aplicación.

   2. Conectividad de alta velocidad: Una conexión a Internet de alta velocidad es 
   esencial para garantizar un acceso rápido y fluido a la aplicación por parte 
   de los usuarios.

   3. Seguridad sólida: El servidor web cuenta con medidas de seguridad sólidas para 
   proteger la aplicación y los datos de los usuarios contra amenazas cibernéticas.

   4. Escalabilidad: El proveedor de alojamiento web ofrece opciones de escalabilidad 
   para que la infraestructura pueda adaptarse al crecimiento de la aplicación y 
   la demanda de los usuarios.

Herramientas de integración continua y entrega continua (CI/CD):
   1. Mayor velocidad: Automatizan tareas repetitivas, permitiendo a los equipos 
   desarrollar y entregar software con mayor rapidez.

   2. Mejor calidad: La automatización de las pruebas ayuda a identificar y 
   corregir errores antes de que se implementen en producción.

   3. Mayor confiabilidad: Garantizan un proceso de despliegue consistente y 
   confiable, lo que reduce el riesgo de errores y fallos.

   4. Mayor colaboración: Facilitan la colaboración entre equipos de desarrollo
y operaciones.

`;

export const texto3 = `
La metodología a utilizar está basada en el enfoque iterativo e incremental “SCRUM”. 
El proyecto consiste en el diseño de una guía estructurada sobre las fases para 
el desarrollo de este proyecto, basado en las arquitecturas integrales utilizando 
un desarrollo multicapa, para lo cual se realizará un ejemplo práctico de una 
aplicación “To-do List” llamada Flytask, que permite la gestión de tareas por 
parte del usuario final. 

Fases para el desarrollo de un proyecto

Análisis de requerimientos de la aplicación a desarrollar

Flytask es una aplicación web que permite a los usuarios crear una cuenta y 
administrar sus tareas de manera simple y eficiente. 

Identificación de funcionalidades para Flytask:

Crear tareas:
   - Agregar título, descripción y fecha límite a la tarea.

Editar tareas:
   - Modificar el título, descripción y fecha límite de la tarea existente.

Eliminar tareas:
   - Eliminar las tareas que ya no son necesarias.

Organizar tareas:
   - Clasificar las tareas según los estados proporcionados por la aplicación: 
   Upcoming, ToDo, Doing, Done.

Ver el historial de tareas:
   - Visualizar las tareas completadas o pendientes.

Aplicar filtros:
   - Filtrar tareas por estado, nombre y fecha de creación.

Administrar mi perfil:
   - Cambiar la información de perfil desde el módulo My Account.

-Definición diagrama de clases
La aplicación web está diseñada para poder consultar una base de datos relacional y una no relacional.

-Base de Datos Relacional:

En esta fase se definen las entidades que integran la base de datos relacional con postgres, definimos los 
nombres, tipos de datos y relaciones entre las tablas.

Tabla USER: 
La tabla user contiene la data que el usuario ingresa en la creación de una cuenta en la aplicación, 
es lo que va a permitir la validación para el inicio de sesión y la creación de tareas, los campos de la tabla son: 

   ●	UserID: será autogenerado, único y funcionará como la llave principal. 

   ●	Name: nombre del usuario, tipo VARCHAR.

   ●	Email: correo del usuario, tipo VARCHAR.

   ●	Password: contraseña del usuario, tipo VARCHAR.

Tabla TASK: 

La tabla task contiene las tareas que el usuario administre, son las que se presentan en la vista principal de la aplicación web.

   ●	TaskID: autogenerado, único y funciona como la llave principal.

   ●	UserID: llave foránea que permite relacionar la tarea con el usuario al que pertenece, se encuentra en la tabla USER.

   ●	Title: título de la tarea, tipo VARCHAR.

   ●	Description: descripción de la tarea, tipo VARCHAR.

   ●	Status: estado de la tarea, se manejan los diferentes estados con número, de tipo NUMERIC.

   ●	Creation_Date: fecha de creación de la tarea, no será ingresada por el usuario será tomada de forma automática, tipo DATE.

   ●	Due_Date: fecha de finalización de la tarea, tipo DATE.	

Base de datos No Relacional: 

Para la base de datos no relacional se utiliza MongoDB, una base de datos documental que almacenará la información sobre Users y Task

`;

export const texto4 = `

●	Desarrollo de mockup para un “To-do List” 
Para el caso de ejemplo actual el diseño de los mockups se realizó en la aplicación web Figma, estos representan una guía visual de 
la aplicación.`;


export const texto5 = `
se presenta la pantalla de Login es la primera vista de la aplicación, acá el usuario ingresa las credenciales para poder entrar al 
Dashboard de Tareas, si el usuario no tiene cuenta se muestra la opción de Signup here.  `;

export const texto6 = `Se presenta la pantalla Signup contiene los datos requeridos para crear una cuenta, los campos están validados
para que acepten texto en formato correo y los campos de password muestran/ocultan la contraseña que el usuario ingrese.  `;

export const texto7 = `se presenta el dashboard de un usuario y si no tiene tareas agregadas se muestra el empty state, la opción 
para agregar una tarea. `;

export const texto8 = `se presenta un modal que se despliega para la creación de tareas con los diferentes campos.    `;

export const texto9 = `se presenta la vista principal de las tareas contenidas por estado (Upcoming, To Do, Doing, Done) en donde 
las tareas pueden ser movidas por el usuario manualmente o de acuerdo a las fechas que se hayan ingresado previamente.  `;

export const texto10 = `se presenta el modal con la información actual de la tarea seleccionada con los campos disponibles 
para editar y la empresa para Guardar Cambios o Borrar Tarea.  `;

export const texto11 = ` Requerimientos técnicos de hardware y software

Para el desarrollo de la aplicación Flytask se pretende levantar seis contenedores con el uso de Docker Compose, aprovechando las 
distintas tecnologías. A continuación, se detalla el hardware requerido por cada una de las tecnologías y se presenta una 
recomendación de hardware para desarrollar Flytask.

Requerimientos técnicos de hardware:
  - Procesador: 2.5 GHz o superior.
  - Memoria RAM: 16 GB como mínimo.
  - Espacio en disco: 256 GB SSD como mínimo.
  - Sistema operativo: Windows 10 64-bit (build 19043 o posterior), macOS x 10.10 o posterior, o Ubuntu 18.04 o posterior.

Requerimientos técnicos de software:

Visual Studio Code:
  - Sistema operativo: Windows 10 y 11 (64-bit), macOS x, Linux (Debian: Ubuntu Desktop 20.04, Debian 10; Red Hat: Red Hat Enterprise Linux 8, Fedora 36).
  - Procesador: 1.6 GHz o más rápido.
  - Memoria: 1 GB de RAM.
  - Espacio en disco: Visual Studio Code es una descarga pequeña (< 200 MB) y tiene una huella de disco de < 500 MB.

Angular:
  - Sistema operativo: Windows 10, macOS x 10.10 (Yosemite) o posterior, o una distribución reciente de Linux (como Ubuntu 18.04 o posterior).
  - Memoria: Al menos 4 GB de RAM.
  - Espacio de almacenamiento: Al menos 10 GB de espacio libre en disco.

React:
  - Sistema operativo: Windows 10, macOS x 10.10, o Ubuntu 16.
  - Hardware: Al menos 4 GB de RAM y 10 GB de espacio de almacenamiento.

Spring Boot:
  - Procesador: Mínimo Pentium 2 a 266 MHz.
  - RAM: Al menos 128 MB.
  - Espacio en disco: 124 MB para JRE; 2 MB para Java Update; 10MB para la instalación de Maven; 500MB para el repositorio local de Maven.
  - Sistema operativo: JDK 8 o superior para Maven.

Django:
  - Sistema operativo: Windows 7 o 10, macOS X 10.11 o superior, Linux: RHEL 6/7, 64-bit (casi todas las bibliotecas también funcionan en Ubuntu).
  - Procesador: Dual-core Intel Core i5 o similar.
  - RAM y espacio libre en disco: 4 GB de RAM, 5 GB de espacio libre en disco.

Express.js:
  - Procesador: 1.6 GHz o más rápido.
  - Memoria: 4 GB de RAM.
  - Espacio en disco: 512 MB de espacio libre en disco.
  - Sistemas operativos soportados: macOS, Windows (incluyendo WSL), y Linux.

MongoDB:
  - Procesador: 1 GHz.
  - Memoria: 2 GB de RAM.
  - Espacio en disco: 512 MB de HDD.

PostgreSQL:
  - Procesador: 1 GHz.
  - Memoria: 2 GB de RAM.
  - Espacio en disco: 512 MB de HDD.

Vue.js:
  - Sistema operativo: Windows 10.
  - Procesador: Frecuencia base de 1.8 GHz o superior.
  - Memoria: 4 GB de RAM o más.
  - Espacio de almacenamiento: 75 MB de espacio disponible en disco o más.

Docker:
  - Sistema operativo: Windows 10 64-bit: Home o Pro (build 19043 o posterior), Enterprise o Education (build 19042 o posterior). 
  Windows 11 64-bit: Home, Pro, Enterprise, o Education versión 21H2 o más reciente.
  - Procesador: Procesador de 64 bits.
  - Memoria: 4 GB de RAM.
  - Espacio en disco: 100 GB de SSD.

Docker Compose:
  - Sistema operativo: Linux, Mac y Windows.
  - Procesador: Procesador de 64 bits.
  - Memoria: 4 GB de RAM.
  - Espacio en disco: Docker Desktop es una descarga pequeña (< 200 MB) y tiene una huella de disco de < 500 MB.
  - Docker Compose se instala con Docker Desktop.

Nginx:
  - 512 MB de RAM y 50 MB de espacio libre en disco.
  `;
export const texto12 = ` Diseño de la Arquitectura de la aplicación

La arquitectura de la aplicación Flytask se ha diseñado considerando una combinación óptima de tecnologías para el Front End, 
Back End y la base de datos. La característica más importante para el caso de aplicación es que estas tecnologías seleccionadas 
pueden ser independientes, y se configura para interactuar entre sí. Para el caso del ejemplo práctico, se realizará una 
integración de todos con todos, lo que implica que se desarrollarán los seis Back Ends, tres con PostgreSQL y tres con MongoDB, 
y se realizarán tres Front End uno para cada tecnología. Con las 9 aplicaciones creadas se utilizará dockerización, 
reverse proxy para el formateo de las URL, y un balanceador de carga que se configurará en el servidor a la hora de desplegar. 
Esto permitirá que todas las tecnologías de Front End sean capaces de consultar a todas las API.

Selección de tecnologías para el Front End de Flytask: 
  - Frameworks a utilizar: Vue, React.

Selección de tecnologías para el Back End de Flytask:
  - Spring Boot, Django, Express.

Selección de bases de datos de Flytask:
  - NoSQL MongoDB o PostgreSQL.

La combinación de estas tecnologías proporciona una solución robusta y flexible para el desarrollo de la aplicación. 
Cada tecnología ha sido seleccionada por su eficiencia, flexibilidad y capacidad para integrarse con otras tecnologías. 
Esta combinación permite que la aplicación sea escalable, mantenible y capaz de proporcionar una experiencia de usuario 
de alta calidad.
  `;
export const texto13 = `Patrones de diseño

A continuación, se detalla el patrón de diseño a utilizar para cada una de las API y cada uno de los Clientes que serán 
desarrollados para Flytask.

Patrón de diseño para Spring Boot y Express.js:
En el caso de Spring Boot y Express.js se aplica un patrón de diseño MVC (Modelo Vista Controlador). Ambos frameworks utilizan 
una estructura de carpetas similar, que será la siguiente:
  - Config: Contiene los archivos de configuración de la API, incluyendo configuraciones específicas como Spring Security.
  - Controller: Carpeta que contiene todas las clases RESTController con las rutas para las consultas HTTP.
  - Model
    - DTO: Contiene las clases de DTO que facilitan la manipulación de datos entre capas.
    - Entities: Contiene las clases de entidades que reflejan la estructura de la base de datos gracias a JPA.
  - Repository: Contiene funciones para interactuar directamente con las entidades y realizar operaciones CRUD.
  - Service
    - Service: Contiene interfaces que definen la estructura de los servicios.
    - ServiceImpl: Implementaciones de los servicios que manejan la lógica de negocio, construyen DTOs y realizan cálculos 
    complejos para inserciones y consultas.

Patrón de diseño para Django:
Para desarrollar una API en Django se utiliza el patrón de diseño MTV (Model Template View):
  - Migrations: Contiene todas las migraciones autogeneradas por Django para configurar la estructura de la base de datos.
  - Utils: Contiene archivos estáticos y funciones de utilidad.
  - Models: Contiene las clases de entidades que se mapean a la base de datos.
  - Views: Contiene la lógica de las llamadas a la API (equivalente a los controladores en otros frameworks).
  - URL: Contiene las rutas utilizadas por las vistas para las consultas HTTP.
  - Apps: Configura la aplicación como un proyecto de Django, cada una con sus propias Migrations, Models, Views, y URLs.
  - Settings: Contiene las configuraciones de conexión a bases de datos, configuraciones de Spring Security y CORS.

Patrón de diseño para React:
Para React se utiliza el patrón Contenedor-Presentador (o Contenedor-Componente):
  - Components
    - Common: Contiene componentes reutilizables como barras de navegación.
    - Feature: Contiene componentes específicos para funcionalidades como gráficos.
  - Containers: Contiene componentes que conectan los componentes presentacionales con la lógica de la aplicación y 
  manejo de datos.
  - Services: Contiene funciones para interactuar con la API utilizando bibliotecas como Axios, proporcionando métodos 
  para operaciones CRUD.
  - Utils: Contiene funciones auxiliares para procesar la información devuelta por la API.
  - Pages: Contiene las páginas principales de la aplicación que llaman a los contenedores y componentes.
  - Assets: Contiene archivos estáticos como imágenes e iconos utilizados por los componentes.
  - Styles: Contiene configuraciones de estilos utilizando bibliotecas como Tailwind.

Patrón de diseño para Vue.js:
En Vue.js se utilizan buenas prácticas más que un patrón específico, utilizando una arquitectura de componentes con 
servicios para llamadas HTTP:
  - Assets: Contiene elementos estáticos como imágenes e iconos.
  - Componentes: Contiene todos los componentes utilizados en la aplicación.
  - Services: Contiene funciones para realizar llamadas HTTP.
  - Views: Contiene las vistas o páginas principales que consumen los componentes.

Buenas prácticas de programación y seguridad se describen a continuación en otro apartado.
   `;

export const texto14 = `Implementación de buenas prácticas de codificación

Al implementar las buenas prácticas de codificación, también se utilizan herramientas que facilitan la creación de 
aplicaciones de alta calidad y seguridad. Estas librerías, frameworks y dependencias son bloques o recopilaciones de 
funcionalidades probadas a lo largo del tiempo, cuyo código se puede reutilizar fácilmente. Los programadores pueden 
diseñar operaciones específicas de lógica de negocios utilizando estas herramientas, basándose en los principios SOLID.

En el desarrollo Back End, la implementación de buenas prácticas de codificación y el uso de SOLID están presentes 
a lo largo del framework utilizado. Estos marcos de trabajo proporcionan una base sólida y previamente estudiada. 
El uso de patrones de diseño garantiza que los archivos y sus responsabilidades estén adecuadamente separados, 
asegurando un código limpio y fácil de mantener.

- Principio de responsabilidad única:
  - En Spring Boot, se aplica en los servicios que manejan la lógica de negocios por encima de los controladores.
  - En Django, se ve en las vistas que cumplen funciones similares.
  - En Express, se refleja en middlewares enfocados en tareas específicas como la validación de datos.

- Principio abierto/cerrado:
  - En Spring Boot, aplicado a los repositorios.
  - En Django, a las vistas basadas en clases.
  - En Express, a los middlewares personalizados.

- Principio de sustitución de Liskov:
  - En Spring Boot, se refleja en la programación basada en interfaces y la inyección automática de dependencias.
  - En Django, se aplica en el uso de clases modelos que definen la estructura de modelos expandibles y heredables.
  - En Express, se manifiesta en la modularidad de sus componentes y su facilidad de mantenimiento e interoperabilidad.

- Principio de segregación de interfaces:
  - Implementado junto con los principios de abierto/cerrado y responsabilidad única.
  
- Principio de inversión de dependencias:
  - Implementado junto con el principio de sustitución de Liskov, garantizando que los módulos de alto nivel no 
  dependan de módulos de bajo nivel.

Implementación de prácticas en codificación: React y Vue para Front End

Para el desarrollo del Front End con React y Vue, se sigue el lineamiento SOLID y se utiliza el concepto de 
"Clean Architecture", basado en SOLID. El objetivo es mantener el desarrollo de la aplicación limpio y 
comprensible para cualquier desarrollador. La estructura de archivos y carpetas debe reflejar claramente las 
funcionalidades de la aplicación, como se detalla más adelante en el apartado de "Patrones de Diseño".
   `;

export const texto15 = `   `;
