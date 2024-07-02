import React from "react";
import TextBlock from "../../../components/TextBlock";
import CodeBlock from "../../../components/CodeBlock";

const Routing = () => {
  const routingIntro = `El enrutamiento le permite a un cliente web conectar sus páginas y componentes para
    construir un flujo que le permite al usuario utilizar la aplicación. React utiliza react-router como 
    solución de enrutamiento y configura las rutas en el archivo App.tsx. Por otro lado, VueJS configura su enrutador
    en el archivo index.js. A continuación se provee un patrón de enrutamiento básico para ambos proyectos:`;

  const reactBasicRouter = `// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import MainLayout from "./pages/MainLayout";
import GettingStartedPage from "./pages/subPages/GettingStartedPage";
import BackEndPage from "./pages/subPages/BackEndPage";
import FrontEndPrimer from "./pages/subPages/front-end/FrontEndPrimer";

const BASE_URL = "/"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> //ruta de landing
        <Route path="/main" element={<MainLayout />}> //ruta que envuelve otras rutas
          <Route path="/main/methodology" element={<GettingStartedPage />} /> //ruta compleja que utiliza la ruta /main y especifica /methodology dentro de main
        </Route>
      </Routes>
    </Router>
  );
};

export default App;`;

const vueBasicRouting = `import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';

Vue.use(VueRouter); // Instalación del plugin vue-router 

const routes = [ // Creación de rutas con sus componentes
  { path: '/', component: Home },
  { path: '/about', component: About }
];

const router = new VueRouter({ // definición del router
  routes // inserción de rutas
});

export default router;
`

const vueRouterInMainJS = `import Vue from 'vue';
import App from './App.vue';
import router from './router';

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
`

const protectedRoutesText = `Para el mantenimiento de la seguridad de la información del usuario se utilizan rutas protegidas
en ambos clientes. En el caso de React se utiliza un componente que realiza la validación del token del usuario y redirige 
al inicio de sesión en caso de encontrar un token invalido o la falta de token. En el caso de VueJS se utiliza una validación
en el componente principal de la aplicación (Dashboard de tareas) que redirige al usuario al inicio de sesión al encontrar un token
inválido o la falta de token. A continuación se presentan ambas implementaciones:`

const reactProtectedRouteComponent = `import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { whoami } from "../api/whoamiAPI";

const PrivateRoutes: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => { //Ejecución de petición para validar token con cada recarga
    whoami
      .whoami() // Manejo de petición estandarizado explicado en sección "Manejo de peticiones"
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        localStorage.clear();
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/react/sign-in" />; //operador ternario verifica estado de validación y redirige al usuario utilizando el outlet del enrutador o el inicio de sesión
};

export default PrivateRoutes;
`

const reactRouteWrapping = `function App() {
  return (
    <>
      <BrowserRouter> // Enrutador básico
        <Routes>
          <Route element={<PrivateRoutes />} path="/"> //Ruta que renderiza componente "ProtectedRoute.tsx"
            <Route element={<TaskBoard />} path="/board"/> //Ruta de dashboard de tareas renderizado luego de validación de ruta protegida
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;`

const vueProtectedComponent = `<template>
// componentes visuales
</template> 
<script>
export default {

    components: {
        // insertar componentes a utilizar en componente actual
    }

    methods: {
        // definición de métodos que se usan en el componente
    }
    // created se usa para garantizar la ejecución de la petición para validar el token de usuario con cada recarga del componente
    created() {

    whoami // manejo de petición estandarizado explicado en sección "Manejo de peticiones"
        .whoami()
        .then((response) => {
            if (response.status === 200) {
            this.fetchTasks() // obtener tareas si es válido el token
            }
        })
        .catch((error) => {
            localStorage.clear()
            window.location.href = "/login"; // redirigir a inicio de sesión si el token es inválido o no existe un token
        })
    },
};
</script>`

  return (
    <div>
      <TextBlock
        title="Enrutamiento"
        textContent={routingIntro}
      />
      <CodeBlock code1={reactBasicRouter} language1="typescript" code2={vueBasicRouting} language2="javascript"/>
      <TextBlock textContent="En el caso de VueJS (javascript) se inserta el router en el archivo main.js:"/>
      <CodeBlock code1={vueRouterInMainJS} language1="javascript"/>
      <TextBlock title="Rutas protegidas" textContent={protectedRoutesText}/>
      <TextBlock title="React" textContent={`Componente "ProtectedRoutes.tsx" que es utilizado para envolver rutas protegidas:`}/>
      <CodeBlock code1={reactProtectedRouteComponent} language1="typescript"/>
      <TextBlock textContent={`En el componente "App.tsx" se envuelven las rutas que deseamos proteger con la validación como se muestra:`}/>
      <CodeBlock code1={reactRouteWrapping} language1="typescript"/>
      <TextBlock textContent="De esta manera se garantiza la verificación de token con cada intento de acceder al dashboard de tareas y por lo tanto se provee seguridad al cliente en React."/>
      <TextBlock title="VueJS" textContent={`Verificación de token a través de petición a servidor en index.js de la carpeta "router":`}/>
      <CodeBlock code1={vueProtectedComponent} language1="javascript"/>
      <TextBlock textContent="El uso de la petición de validación de token permite implementar una capa de seguridad sobre el componente principal y la información del usuario. "/>
    </div>
  );
};

export default Routing;
