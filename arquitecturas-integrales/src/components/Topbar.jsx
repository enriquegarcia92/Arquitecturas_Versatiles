import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import chincheta from '../img/chincheta.png';

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="w-full flex md:flex-row justify-between items-center md:justify-between md:items-center">
        <div className="flex justify-evenly items-center">
          <img src={chincheta} alt="logo" className="w-12 h-12" />
          <h1 className="text-3xl text-gray-300 font-bold mb-3 md:mb-0 px-4">
            Arquitecturas Integrales
          </h1>
        </div>
        <nav className="hidden md:flex space-x-4 overflow-x px-4">
          <a
            href="/"
            className="text-gray-300 hover:text-white p-3 rounded-lg hover:bg-gray-700"
          >
            Inicio
          </a>
          <a
            href="/main"
            className="text-gray-300 hover:text-white p-3 rounded-md hover:bg-gray-700"
          >
            Documentación
          </a>
          <a
            href="https://github.com/enriquegarcia92/Arquitecturas_Versatiles.git"
            className="text-gray-300 hover:text-white p-3 rounded-md hover:bg-gray-700"
          >
            Repositorio de ejemplo
          </a>
        </nav>
        <div className="md:hidden flex items-center relative">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FaEllipsisV className="text-white w-6 h-6" />
          </button>
          {isMenuOpen && (
            <ul className="absolute right-0 mt-8 w-48 bg-gray-700 text-white rounded-lg shadow-lg">
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-600 rounded-t-lg"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/main"
                  className="block px-4 py-2 hover:bg-gray-600"
                >
                  Documentación
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-600"
                >
              Repositorio de ejemplo
              </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

