import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const requestMgmtIntro = `Para implementar el manejo de peticiones debemos abstraer el proceso en sus partes 
esenciales: envío/recepción de datos y manejo de respuestas. Para codificar el proceso abstraído utilizamos 
Axios como cliente HTTP que no provee la estructura básica de peticiones para React y VueJS en los archivos 
base.api.ts y base.api.js (el mismo código es usado en ambos, con ligeras modificaciones). Se proveen ejemplos 
para clientes que interactúan con un servidor y clientes que tienen la habilidad de comunicarse con multiples servidores mediante variables de entorno.`;

const reactRequestTemplateCode = `//base.api.ts
import axios from 'axios'

export const BASE_URL = //insertar url base del servidor ej. "servername:port/"

const userToken = localStorage.getItem('token')

export const headers = { // Construcción de headers requeridos por servidor
    'Content-Type': 'application/json',
    'Authorization': Bearer // Insertar token de token de usuario para peticiones que requieren autorización
  };

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})`;

const vueRequestTemplateCode = `//base.api.js
import axios from 'axios'

export const BASE_URL = //insertar url base del servidor ej. "servername:port/"

const userToken = localStorage.getItem('token')

export const headers = { // Construcción de headers requeridos por servidor
    'Content-Type': 'application/json',
    'Authorization': Bearer // Insertar token de token de usuario para peticiones que requieren autorización
  };

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})`;

const multiServerClientText = `Para utilizar multiples servidores con un cliente web utilizamos un archivo de variables de entorno ".env"
en el proyecto que contiene el cliente. El archivo .env contiene las URLs que permiten al cliente interactuar con los servidores
y permite el intercambio de URLs dentro del cliente de manera fluida. Las variables son accesibles mediante la funcionalidad de variables
 de entorno de vite (framework de compilación utilizado en React y VueJS) como se presenta a continuación:`;

const envFileCode = `// archivo .env
// Las variables utilizan el prefijo "VITE" en sus nombres para hacerlas accesibles a través de la funcionalidad de variables de entorno de vite

VITE_POSTGRES_API='http://localhost/postgre_api/api'    //URL para servidor con base de datos que usa postgres
VITE_MONGO_API='http://localhost/mongo_api/api'        //URL para servidor con base de datos en mongo
VITE_REACT_POSTGRE_BASE='/react/'     //Ruta base para cliente React que conecta a servidor db postgres
VITE_REACT_MONGO_BASE='/react_mdb/'  //Ruta base para cliente de React que conecta a servidor db mongo
VITE_VUE_POSTGRE_BASE='/vue/'       //Ruta base para cliente VueJS con servidor db postgres
VITE_VUE_MONGO_BASE='/vue_mdb/'    // Ruta base de cliente VueJS con servidor db mongo 
VITE_POSTGRE_PORT=5173            // Puerto utilizado por cliente React para servidor db postgres
VITE_MONGO_PORT=5170                       //Puerto utilizado por cliente React para servidor db mongo
VITE_VUE_POSTGRE_PORT=5163                // Puerto utilizado por cliente VueJS para servidor db postgres
VITE_VUE_MONGO_PORT=5160                 // Puerto utilizado por cliente VueJS para servidor db mongo
VITE_VUE_POSTGRE_ROUTER_PATH='/vue/'    //Ruta base para enrutador de cliente en VueJS que utiliza db postgres
VITE_VUE_MONGO_ROUTER_PATH='/vue_mdb/' //Ruta base para enrutador de cliente en VueJS que utiliza db mongo
`;

const multiServerClientReactVueFiles = `En las implementaciones de React y VueJS se llaman variables del archivo .env
para insertarse en las rutas y peticiones con la siguiente configuración en los archivos vite.config.js
y vite.config.ts y esto nos permite utilizar las URL guardadas en el archivo .env.`;

const reactViteConfigFileCode = `//vite.config.ts en proyecto React

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno de acuerdo a modo
  const base_config_routes = process.env["VITE_BASE_ROUTES"];
  const base_config_port = process.env["VITE_BASE_PORT"]
  return {
    plugins: [react()],
    server: {
      port: parseInt(base_config_port as string, 10),
    },
    base: base_config_routes // Usar variables de entorno
  };
});`;

const vueViteConfigFileCode = `//vite.config.js en proyecto VueJS

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
// cargar variables de entorno 
const base_config_routes = process.env["VITE_BASE_ROUTES"];
const base_config_port = process.env["VITE_BASE_PORT"];
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
  ],
  server: {
      port: parseInt(base_config_port, 10),
    },
  base: base_config_routes, // utilizar variables como ruta base
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
`;

const requestWithEnvURLs = `import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_URL_API; // Importación de url de servidor en variables de entorno

const userToken = localStorage.getItem('token')

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': // insertar token de usuario
  };

export const axiosInstance = axios.create({ // Creación de instancia de axios para estandarizar peticiones a servidor
    baseURL: BASE_URL
})`;

const reactMultiServerApiCall = `// base.api.ts en proyecto react
import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_URL_API //importación de URLs para usar en conexión a servidores

const userToken = localStorage.getItem('token')

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': //insertar token de usuario
  };

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})`;

const vueMultiServerApiCall = `// base.api.js en proyecto VueJS
import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_URL_API //importación de URLs para usar en conexión a servidores

const userToken = localStorage.getItem('token')

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': //insertar token de usuario
  };

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})`;

const requestImplementationIntroText = `Debido a la estructura implementada para las peticiones en los archivos anteriores
es posible codificar de manera fácil cada petición siguiendo un patrón que utiliza un objeto que contiene como propiedad la función que
realiza la petición como se presenta en los ejemplos: `;

const reactPostCode = `
// loginAPI.ts
import { axiosInstance } from "./base.api"; // importación de instancia de petición a servidor desde base.api.ts

const endpoint = "/auth/login"; //endpoint que se agrega sobre base_url de base.api.ts al llamar la instancia de petición

export const loginUser = { // objeto que contiene función que hace la petición
  login: function (loginData: { // función que realiza la petición con datos de email y contraseña de usuario
    email: string;
    password: string;
  }) {
    return axiosInstance.post(endpoint, { // retorna la instancia de petición a servidor con tipo POST, definición de endpoint y cuerpo que contiene datos requeridos
      email: loginData.email,
      password: loginData.password,
    });
  },
};`;

const vuePostCode = `// loginAPI.js
import { axiosInstance } from "./base.api"; // importación de instancia de petición a servidor desde base.api.js

const endpoint = "/auth/login"; //endpoint que se agrega sobre base_url de base.api.js al llamar la instancia de petición

export const loginUser = { // objeto que contiene función que hace la petición
  login: function (loginData) { // función que realiza la petición con datos de email y contraseña de usuario
    return axiosInstance.post(endpoint, { // retorna la instancia de petición a servidor con tipo POST, definición de endpoint y cuerpo que contiene datos requeridos
      email: loginData.email,
      password: loginData.password,
    });
  },
};`;

const reactGetCode = `// getTasksAPI.ts 
import { axiosInstance } from "./base.api"
import { headers } from "./base.api"

const endpoint = 'task/search?keyword=&status=0&userId=' + localStorage.getItem('id')

export const getTasks = { //objeto contiene propiedad con función que hace petición a servidor
    getTasks: function() {
        return axiosInstance.get(endpoint, {headers}) // función retorna instancia de axios con petición de tipo GET y recibe endpoint y headers con token de usuario
    } 
}`;

const vueGetCode = `import { axiosInstance } from "./base.api"
import { headers } from "./base.api"

const endpoint = 'task/search?keyword=&status=0&userId=' + localStorage.getItem('id')

export const getTasks = { //objeto contiene propiedad con función que hace petición a servidor
    getTasks: function() {
        return axiosInstance.get(endpoint, {headers}) // función retorna instancia de axios con petición de tipo GET y recibe endpoint y headers con token de usuario
    } 
}`;

const reactPutCode = `// editTaskAPI.ts
import { axiosInstance, headers} from "./base.api"


const endpoint = '/task/edit/'

export const editTask = { //objeto que contiene función con petición para editar tarea como propiedad
    editTask: function (updatedTaskData: { //función que recibe información para realizar la operación
        title: string, 
        description: string, 
        dueDate: string
    }, taskId: number) {
        return axiosInstance.put(endpoint + taskId, { //retorna instancia con método PUT, recibe endpoint, id de tarea y datos actualizados, utiliza headers con token de usuario
            title: updatedTaskData.title,
            description: updatedTaskData.description,
            dueDate: updatedTaskData.dueDate
        }, {headers})
    }
}`;

const vuePutCode = `// editTaskAPI.js
import { yyyymmddToISO } from "@/utils/dataConversions"
import { axiosInstance, headers} from "./base.api"


const endpoint = '/task/edit/'

export const editTask = { //objeto que contiene función con petición para editar tarea como propiedad
    editTask: function (values, taskId) { //función que recibe información para realizar la operación
        return axiosInstance.put(endpoint + taskId, { //retorna instancia con método PUT, recibe endpoint, id de tarea y datos actualizados, utiliza headers con token de usuario
            title: values.title,
            description: values.description,
            dueDate: yyyymmddToISO(values.dueDate) 
        }, {headers})
    }
}`;

const reactDeleteCode = ` // deleteTaskAPI.ts
import { axiosInstance } from "./base.api";
import { headers } from "./base.api";

const endpoint = 'task/delete/'

export const deleteTask = { // objeto con propiedad que contiene función para borrar una tarea
    deleteTask: function (taskId: number) { // función que recibe id de tarea a borrar
        return axiosInstance.delete(endpoint + taskId, {headers: headers}) // retorna instancia con método DELETE, recibe endpoint, id de tarea y headers con token de usuario
    }
}`;

const vueDeleteCode = ` // deleteTaskAPI.js
import { axiosInstance } from "./base.api";
import { headers } from "./base.api";

const endpoint = 'task/delete/'

export const deleteTask = { // objeto con propiedad que contiene función para borrar una tarea
    deleteTask: function (taskId) { // función que recibe id de tarea a borrar
        return axiosInstance.delete(endpoint + taskId, {headers: headers}) // retorna instancia con método DELETE, recibe endpoint, id de tarea y headers con token de usuario
    }
    }
}`;

const requestsInComponentsText = `La estructura para el manejo de peticiones y respuestas es la misma en todos los componentes de ambos clientes.
Se implementa con un patrón básico de llamada a función de petición, recepción y manejo de respuesta. Existen 2 
casos básicos que se cubren en los siguientes ejemplos: peticiones con ingreso de datos de usuario y peticiones de información de servidor`

const requestsWithUserInput = `Las peticiones que utilizan datos provistos por el usuario deben envíar estos datos al servidor, 
por lo que es necesario verificar que la información envíada sea apropiada para la operación a realizar y que no represente un riesgo
para el funcionamiento del servidor. Para el cliente React se utiliza Yup con Formik para crear esquemas de validación e imponerlos sobre
los formularios que reciben la información del usuario. En el caso de VueJS se utiliza Yup con Vee-Validate para el mismo propósito como se muestra 
a continuación:`

const reactRequestWithInputHandling = ` // login.tsx

//definición de esquema
const loginSchema = yup.object({ // esquema de validación para inicio de sesión
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema, // insertar esquema de validación
    onSubmit: (values) => { // definición de función onSubmit de formulario
      loginUser // llamada a objeto en archivo Login.tsx
        .login(values) // usar función de petición de inicio de sesión
        .then((response) => { //manejo de respuesta con bloque then-catch
          // lógica de inicio de sesión 
        })
        .catch((error) => {
          setNotification({
            message: 'An error has ocurred, try again!',
            color: 'bg-red-500',
            showNotification: true,
          });
          //notificación de error y lógica de inicio de sesión fallido
        });
    },
  });
  
  //En tags HTML de componente definir ejecución onSubmit de formulario de la siguiente manera

  <form
    onSubmit={formik.handleSubmit} // definición de ejecución onSubmit con llamada a esquema impuesto por formik
    className="flex flex-col justify-center" // estilos 
    >

    <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input // inputs toman nombres y tipos correspondientes a la definición del esquema provisto al elemento formulario
              id="email"
              type="email"
              {...formik.getFieldProps("email")} //aplicar validaciones correspondientes al campo email con formik y esquema yup
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.email && formik.errors.email ? ( // presentar errores a través de formik si se presentan
              <div className="text-sm text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
  `

  const vueRequestWithInput = `
  <script>
// importaciones de componentes de librerias y otros archivos
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { loginUser } from "@/api/loginAPI";
import Notification from "@/components/feedback/Notification.vue";
import { whoami } from "@/api/whoamiAPI";

const loginSchema = yup.object({ // esquema de validación para inicio de sesión
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export default {
  name: "Login",
  components: {
    // componentes utilizados por componente actual
  },

  methods: {
    // definiciones de métodos
    onSubmit(values) { //definición de función onSubmit que recibe valores (values) de formulario creado usando componentes de Vee-Validate y esquema de validación con Yup
        loginUser // llamada objeto en archivo loginAPI.js
            .login(values) // uso de función de petición de inicio de sesión
            .then((response) => { recepción de respuesta con bloque then-catch
                // lógica de inicio de sesión 
            })
            .catch((error) => {
                this.triggerNotification(
                    "An error has ocurred, please try again",
                    "bg-red-500"
                );
                // notificar error y lógica de inicio de sesión fallido
            });
        },
    },

    
  },

</script>

//En sección <template> de componente Login.vue insertar definicion de onSubmit y esquema de yup en componentes de Vee-Validate

<Form   
    :validation-schema="loginSchema" //insertar esquema de validación
    @submit="onSubmit" //insertar onSubmit al accionar el formulario
    class="h-full w-full flex flex-col gap-2 items-center"
    >
        <div class="mb-4 w-full">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <Field // campos toman nombres y tipos correspondientes al esquema proporcionado al elemento Field de vee-validate
            name="email"
            type="email"
            class="mt-1 block w-full p-2 border border-gray-300 shadow-sm bg-mint rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>

        // resto del formulario
`

const reactRequestForData = `// Taskboard.tsx
useEffect(() => { // useEffect para garantizar la ejecución del bloque con cada recarga
    getTasks //llamada a objeto con propiedad función de petición
      .getTasks() // función que pide tareas a servidor
      .then((response) => { //manejo de respuesta en bloque then-catch
        // lógica para almacenar u organizar tareas
      })
      .catch((error) => {
        //lógica en caso de error en la petición
      });
  }, []);`

const vueRequestForData = `// Taskboard.vue
// dentro de la sección <script>
created() { // created garantiza la ejecución del código con cada recarga
    getTasks // llamada a objeto con propiedad función de peticion de tareas
      .getTasks() // uso de función de petición de tareas
      .then((response) => { // manejo de respuesta con bloque then-catch
        // lógica de almacentamiento y organización de tareas obtenidas
      })
      .catch((error) => {
        // manejo de errores
      });
  },
`


const RequestManagement = () => {
  return (
    <div>
      <TextBlock title="Manejo de peticiones" textContent={requestMgmtIntro} />
      <TextBlock title="Cliente con conexión a 1 servidor" />
      <CodeBlock
        code1={reactRequestTemplateCode}
        language1="typescript"
        code2={vueRequestTemplateCode}
        language2="javascript"
      />
      <TextBlock
        title="Cliente con multiples conexiones"
        textContent={multiServerClientText}
      />
      <CodeBlock code1={envFileCode} language1=".env" />
      <TextBlock textContent={multiServerClientReactVueFiles} />
      <CodeBlock
        code1={reactViteConfigFileCode}
        language1="typescript"
        code2={vueViteConfigFileCode}
        language2="javascript"
      />
      <TextBlock textContent="Con la configuración anterior podemos modificar la petición a servidor como se indica:" />
      <TextBlock title="Archivo de petición a servidores" />
      <CodeBlock
        code1={reactMultiServerApiCall}
        language1="typescript"
        code2={vueMultiServerApiCall}
        language2="javascript"
      />
      <TextBlock
        title="Implementación de peticiones y manejo en componentes"
        textContent={requestImplementationIntroText}
      />
      <TextBlock title="POST" />
      <CodeBlock
        code1={reactPostCode}
        language1="typescript"
        code2={vuePostCode}
        language2="javascript"
      />
      <TextBlock title="GET" />
      <CodeBlock
        code1={reactGetCode}
        language1="typescript"
        code2={vueGetCode}
        language2="javascript"
      />
      <TextBlock title="PUT" />
      <CodeBlock
        code1={reactPutCode}
        language1="typescript"
        code2={vuePutCode}
        language2="javascript"
      />
      <TextBlock title="DELETE" />
      <CodeBlock
        code1={reactDeleteCode}
        language1="typescript"
        code2={vueDeleteCode}
        language2="javascript"
      /> 
      <TextBlock title="Manejo de peticiones y respuestas en componentes" textContent={requestsInComponentsText}/>
        <TextBlock title="Peticiones con ingreso de datos de usuario" textContent={requestsWithUserInput}/>
        <CodeBlock code1={reactRequestWithInputHandling} language1="typescript" code2={vueRequestWithInput} language2="javascript"/>
        <TextBlock title="Peticiones de información a servidor" textContent="A continuación se detalla el manejo de peticiones de información a servidor, en casos que no involucran ingreso de datos de usuario:"/>
        <CodeBlock code1={reactRequestForData} language1="typescript" code2={vueRequestForData} language2="javascript"/>
    </div>
  );
};

export default RequestManagement;
