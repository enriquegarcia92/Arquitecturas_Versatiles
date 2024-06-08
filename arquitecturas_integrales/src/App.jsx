import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Topbar />
        <div className="flex flex-grow">
          <Sidebar />
          <Content />
        </div>
      </div>
    </Router>
  );
}

export default App;
