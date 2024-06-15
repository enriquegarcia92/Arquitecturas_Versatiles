import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import IntegrationTechnologies from "./pages/IntegrationTechnologies";
import ClientServerArchitecture from "./pages/ClientServerArchitecture";
import FrontendBackendIntegration from "./pages/FrontendBackendIntegration";
import DataHandling from "./pages/DataHandling";
import BackendDatabaseIntegration from "./pages/BackendDatabaseIntegration";
import BackendStructure from "./pages/BackendStructure";
import FrontendStructure from "./pages/FrontendStructure";
import InfrastructureFrontendBackend from "./pages/InfrastructureFrontendBackend";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Topbar />
        <div className="flex flex-grow">
          <Sidebar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/integration-technologies" element={<IntegrationTechnologies />} />
            <Route path="/client-server-architecture" element={<ClientServerArchitecture />} />
            <Route path="/frontend-backend-integration" element={<FrontendBackendIntegration />} />
            <Route path="/data-handling" element={<DataHandling />} />
            <Route path="/backend-database-integration" element={<BackendDatabaseIntegration />} />
            <Route path="/backend-structure" element={<BackendStructure />} />
            <Route path="/frontend-structure" element={<FrontendStructure />} />
            <Route path="/infrastructure-frontend-backend" element={<InfrastructureFrontendBackend />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
