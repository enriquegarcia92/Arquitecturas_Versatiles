// MainLayout.tsx
import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { FaArrowLeft, FaBars, FaCheck, FaServer, FaTimes } from "react-icons/fa";
import GettingStartedPage from "./subPages/GettingStartedPage";
import BackEndPage from "./subPages/BackEndPage";
import { MdComputer } from "react-icons/md";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { BsCheck, BsHandThumbsUp, BsListCheck } from "react-icons/bs";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import TextBlock from "../components/TextBlock";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto bg-gray-900">
          <Outlet  />
          <TextBlock title="Bienvendio a Arquitecturas Integrales"/>
          <TextBlock textContent="Este sitio contiene el procedimiento necesario para realizar aplicaicones 
          web de arquitectura cliente servidor con React y Vue para Front End, Spring Boot Django y Express
          para el Back End contectadas una base de datos a PostgreSQL y se muestran las consideraciónes
           necesarias
          para desarrollar con MongoDB además de mostrar el manejo de docker-compose, nginx
          "/>
          <TextBlock textContent={`Todos los ejemplos mostrados en esta documentación se muestran con mayor detalle en la opción "Repositorio de ejemplo" de la barra de navegación`}/>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
