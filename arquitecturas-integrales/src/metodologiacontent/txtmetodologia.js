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

`;