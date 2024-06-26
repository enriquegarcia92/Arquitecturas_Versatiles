// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import MainLayout from "./pages/MainLayout";
import IntroduccionMetodologia from "./pages/subPages/metodologia/IntroduccionMetodologia";

const BASE_URL = "/"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={BASE_URL} element={<Landing />} />
        <Route path={`${BASE_URL}main`} element={<MainLayout />}>
          <Route path={`${BASE_URL}main/methodology/intro`} element={<IntroduccionMetodologia/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
