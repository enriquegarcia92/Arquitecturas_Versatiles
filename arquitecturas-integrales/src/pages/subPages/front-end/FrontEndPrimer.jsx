import React from 'react'
import TextBlock from '../../../components/TextBlock'
import CodeBlock from '../../../components/CodeBlock'
import chincheta from '../../../img/chincheta.png'
import ImageComponent from '../../../components/ImageComponent'

const feprimerintro = `Un cliente web cumple una función básica: establece un punto de contacto 
en el que el usuario puede interactuar con la lógica y los datos de la aplicación. Para lograr esto
 debemos considerar que existen 2 elementos externos con los que un cliente web básico se comunica:
el servidor y el usuario. El usuario introduce y es presentado con datos con los que el servidor
realiza operaciones como inserciones, actualizaciones, etc (CRUD). El servidor recibe los datos 
que el usuario introduce en el cliente y realiza las operaciones que solicita el usuario. Lo anterior 
significa que la codificación debe tener como eje central el desarrollo de interfaces de usuario
intuitivas y eficacez que utilizan conexiones reutilizables y predecibles con el servidor.`

const feprimerprojectcreation = `Existen muchas tecnologías que permiten crear clientes web, la mayoría 
utilizan una mezcla de HTML, CSS y JS/TS para renderizar elementos, estilizarlos e insertar lógica que
permite utilizar la aplicación para el proposito con el que fue diseñada. Existen soluciones robustas y 
ampliamente utilizadas para cada una de los procesos anteriores, en esta guía se utiliza TailwindCSS como
framework para aplicar estilos a los elementos HTML en React y VueJS (con proyectos inicializados usando npm y vite). Adicionalmente se utilizan multiples 
librerías para validar entradas de usuario, establecer patrones de diseño y manejar peticiones a servidor:`

const initializationReact = `//Inicializar proyecto de React con Typescript
npm create vite@latest my-react-ts-app -- --template react-ts`

const initializationVue = `//Inicializar proyecto de VueJS
npm create vite@latest my-vue-app -- --template vue`

const installingDepencencies = `Para instalar las librerias utilizadas para validar entradas de usuarios, crear enrutadores, 
manejar formularios y aplicar estilos ejecutar los siguientes comandos desde la terminal:`

const reactTailwindConfigCLI = `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`

const vueTailwindConfigCLI = `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`

const tailwindFileConfig = `Aplicar la siguiente configuración a los archivos tailwind.config.js:`

const cssDirectives = `Insertar las directivas de TailwindCSS en el archivo index.css:`

const twndCssDirectives = `@tailwind base;
@tailwind components;
@tailwind utilities;`

const twndConfigFileReact = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`

const twndConfigFileVue = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`

const valLibreries = `Para garantizar la validez de datos ingresados por el usuario se utilizan las siguientes librerías:`

const yupInstall = `npm install yup`

const formikVeeValidateText = `Formik y Vee-Validate imponen los esquemas definidos utilizando yup sobre los formularios 
de la aplicación.`

const formikInstall = `npm install formik`

const veeValidateInstall = `npm install @vee-validate/core @vee-validate/rules @vee-validate/i18n`

const headlessInstallReact = `npm install @headlessui/react`

const headlessInstallVue = `npm install @headlessui/vue`

const axiosText = `Axios es un cliente HTTP que provee funcionalidades de manejo de peticiones, utilizado 
para establecer comunicación con el servidor con envío y recepción de datos estandarizada:`

const axiosInstall = `npm install axios`

const routerText = `Los clientes en React y Vue utilizan distintas soluciones para el enrutamiento, el primero 
se toma de las funcionalidades de "react-router" y el segundo usa "vue-router":`

const vueRouterInstall = `npm install vue-router`

const reactRouterInstall = `npm install react-router-dom`

const finalizingInstallations = `Con las instalaciones terminadas es momento de comenzar a programar!`



const FrontEndPrimer = () => {
  return (
    <div>
        <TextBlock title="Introducción al desarrollo front end" textContent={feprimerintro}/>
        <TextBlock title="Creación de proyectos" textContent={feprimerprojectcreation}/>
        <CodeBlock code1={initializationReact} language1="React TS" code2={initializationVue} language2="VueJS"/>
        <TextBlock textContent={installingDepencencies}/>
        <TextBlock title="TailwindCSS para estilos" textContent=""/>
        <CodeBlock code1={reactTailwindConfigCLI} language1="React TS" code2={vueTailwindConfigCLI} language2="VueJS"/>
        <TextBlock title="Configuración de archivos de Tailwind" textContent={tailwindFileConfig}/>
        <CodeBlock code1={twndConfigFileReact} language1="React TS" code2={twndConfigFileVue} language2="VueJS"/> 
        <TextBlock title="Directivas de CSS" textContent={cssDirectives}/> 
        <CodeBlock code1={twndCssDirectives} language1="React TS" code2={twndCssDirectives} language2="VueJS"/> 
        <TextBlock title="Librerías de validación/sanitización de campos" textContent={valLibreries}/>
        <TextBlock title="Yup" textContent="Yup nos permite crear esquemas de validación para formularios"/>
        <CodeBlock code1={yupInstall} language1="React TS" code2={yupInstall} language2="VueJS"/>
        <TextBlock title="Formik/Vee-Validate" textContent={formikVeeValidateText}/>
        <CodeBlock code1={formikInstall} language1="React TS" code2={veeValidateInstall} language2="VueJS"/>
        <TextBlock title="HeadlessUI" textContent="HeadlessUI provee primitivos (componentes reutilizables sin estilizar):"/>
        <CodeBlock code1={headlessInstallReact} language1="React TS" code2={headlessInstallVue} language2="VueJS"/>
        <TextBlock title="Axios" textContent={axiosText} />
        <CodeBlock code1={axiosInstall} language1="React TS" code2={axiosInstall} language2="VueJS"/>
        <TextBlock title="Dotenv?" />
        <TextBlock title="Enrutadores" textContent={routerText}/>
        <CodeBlock code1={reactRouterInstall} language1="React TS" code2={vueRouterInstall} language2="VueJS"/>
        <TextBlock textContent={finalizingInstallations}/>
    </div>
  )
}

export default FrontEndPrimer