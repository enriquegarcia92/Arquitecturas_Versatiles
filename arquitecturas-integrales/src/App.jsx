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
import EndpointSetup from "./pages/subPages/backend/EndpointSetup";
import DTOSetup from "./pages/subPages/backend/DTOSetup";
import MongoDev from "./pages/subPages/backend/MongoDev";
import Deployment from "./pages/subPages/deployment/Deployment";
import ComposeSetup from "./pages/subPages/deployment/ComposeSetup";
import NginxSetup from "./pages/subPages/deployment/NginxSetup";
import QATesting from "./pages/subPages/qatesting/Testing";
const BASE_URL = "/"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={BASE_URL} element={<Landing />} />
        <Route path={`${BASE_URL}main`} element={<MainLayout/>} >
        <Route path={`${BASE_URL}main/methodologyintro`} element={<IntroduccionMetodologia/>} />
        <Route path={`${BASE_URL}main/backendproyectinit`} element={<ProyectInit/>} />
        <Route path={`${BASE_URL}main/backenddbconnections`} element={<DatabaseConnection/>} />
        <Route path={`${BASE_URL}main/backendarchsetup`} element={<ArchitectureSetup/>} />
        <Route path={`${BASE_URL}main/backendmodelsetup`} element={<ModelSetup/>} />
        <Route path={`${BASE_URL}main/backendauthsetup`} element={<AuthenticationJwt/>} />
        <Route path={`${BASE_URL}main/backendservicessetup`} element={<ServicesSetup/>} />
        <Route path={`${BASE_URL}main/backendendpointsetup`} element={<EndpointSetup/>} />
        <Route path={`${BASE_URL}main/backendtosetup`} element={<DTOSetup/>} />
        <Route path={`${BASE_URL}main/backendmongodev`} element={<MongoDev/>} />
        <Route path={`${BASE_URL}main/deloymentdocker`} element={<Deployment/>} />
        <Route path={`${BASE_URL}main/deploycomposesetup`} element={<ComposeSetup/>} />
        <Route path={`${BASE_URL}main/deploynginxsetup`} element={<NginxSetup/>} />
        <Route path={`${BASE_URL}main/qatesting`} element={<QATesting/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
