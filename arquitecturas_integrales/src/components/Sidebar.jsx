import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-80 bg-gray-500 text-white">
      <ul className="space-y-2 p-8">
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-700">Home</Link>
        </li>
        <li>
          <Link to="/integration-technologies" className="block p-2 hover:bg-gray-700">Integración de Tecnologías</Link>
        </li>
        <li>
          <Link to="/client-server-architecture" className="block p-2 hover:bg-gray-700">Arquitectura Cliente-Servidor</Link>
        </li>
        <li>
          <Link to="/frontend-backend-integration" className="block p-2 hover:bg-gray-700">Integración Frontend-Backend</Link>
        </li>
        <li>
          <Link to="/data-handling" className="block p-2 hover:bg-gray-700">Manejo de Datos</Link>
        </li>
        <li>
          <Link to="/backend-database-integration" className="block p-2 hover:bg-gray-700">Integración Backend-Base de Datos</Link>
        </li>
        <li>
          <Link to="/backend-structure" className="block p-2 hover:bg-gray-700">Estructura Backend</Link>
        </li>
        <li>
          <Link to="/frontend-structure" className="block p-2 hover:bg-gray-700">Estructura Frontend</Link>
        </li>
        <li>
          <Link to="/infrastructure-frontend-backend" className="block p-2 hover:bg-gray-700">Infraestructura Frontend-Backend</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
