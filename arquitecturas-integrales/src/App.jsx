// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import MainLayout from "./pages/MainLayout";
import IntroduccionMetodologia from "./pages/subPages/metodologia/IntroduccionMetodologia";
import ProyectInit from "./pages/subPages/backend/ProyectInit";
import DatabaseConnection from "./pages/subPages/backend/DatabaseConnection";
import ArchitectureSetup from "./pages/subPages/backend/ArchitectureSetup";
import ModelSetup from "./pages/subPages/backend/ModelSetup";
import AuthenticationJwt from "./pages/subPages/backend/AuthenticationJwt";
import ServicesSetup from "./pages/subPages/backend/ServicesSetup";
import Rescomponent from "./pages/subPages/resultados/rescomponent";
import Anareqcomponent from "./pages/subPages/analisisreq/anareqcomponent";
import Bpprogracomponent from "./pages/subPages/bpprogra/bpprogracomponent";
import Bpseguridadcomponent from "./pages/subPages/bpseguridad/bpseguridadcomponent";
import Diseñoarqcopomponent from "./pages/subPages/diseñoarq/diseñoarqcomponent";
import Diseñosistemacopomponent from "./pages/subPages/diseñosis/diseñocomponent";
import Patroncomponent from "./pages/subPages/patronesdis/patroncomponent";


const BASE_URL = "/"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={BASE_URL} element={<Landing />} />
        <Route path={`${BASE_URL}main`} element={<MainLayout/>} >
        <Route path={`${BASE_URL}main/methodologyintro`} element={<IntroduccionMetodologia/>} />
        <Route path={`${BASE_URL}main/resintro`} element={<Rescomponent/>} />
        <Route path={`${BASE_URL}main/analisisreqintro`} element={<Anareqcomponent/>} />
        <Route path={`${BASE_URL}main/bpprograintro`} element={<Bpprogracomponent/>} />
        <Route path={`${BASE_URL}main/bpseguridad`} element={<Bpseguridadcomponent />} />
        <Route path={`${BASE_URL}main/diseñoarqcomponent`} element={<Diseñoarqcopomponent />} />
        <Route path={`${BASE_URL}main/diseñosistemacopomponent`} element={<Diseñosistemacopomponent />} />
        <Route path={`${BASE_URL}main/patroncomponent`} element={<Patroncomponent />} />


        //componentes de backend 
        <Route path={`${BASE_URL}main/backendproyectinit`} element={<ProyectInit/>} />
        <Route path={`${BASE_URL}main/backenddbconnections`} element={<DatabaseConnection/>} />
        <Route path={`${BASE_URL}main/backendarchsetup`} element={<ArchitectureSetup/>} />
        <Route path={`${BASE_URL}main/backendmodelsetup`} element={<ModelSetup/>} />
        <Route path={`${BASE_URL}main/backendauthsetup`} element={<AuthenticationJwt/>} />
        <Route path={`${BASE_URL}main/backendservicessetup`} element={<ServicesSetup/>} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
