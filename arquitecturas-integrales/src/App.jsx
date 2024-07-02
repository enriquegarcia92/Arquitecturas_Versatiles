// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import MainLayout from "./pages/MainLayout";
import GettingStartedPage from "./pages/subPages/GettingStartedPage";
import BackEndPage from "./pages/subPages/BackEndPage";
import FrontEndPrimer from "./pages/subPages/front-end/FrontEndPrimer";
import Routing from "./pages/subPages/front-end/Routing";
import RequestManagement from "./pages/subPages/front-end/RequestManagement";
import FolderStruct from "./pages/subPages/front-end/FolderStruct";

const BASE_URL = "/"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={BASE_URL} element={<Landing />} />
        <Route path={`${BASE_URL}main`} element={<MainLayout />}>
          <Route path={`${BASE_URL}main/methodology`} element={<GettingStartedPage />} />
          <Route path={`${BASE_URL}main/frontendprimer`} element={<FrontEndPrimer />} />
          <Route path={`${BASE_URL}main/frontend-routing`} element={<Routing />} />
          <Route path={`${BASE_URL}main/frontend-requestmgmt`} element={<RequestManagement />} />
          <Route path={`${BASE_URL}main/frontend-folderstruct`} element={<FolderStruct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
