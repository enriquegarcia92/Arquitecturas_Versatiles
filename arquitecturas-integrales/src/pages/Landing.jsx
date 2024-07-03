import React from "react";
import chincheta from '../img/chincheta.png'

const Landing = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full">
      {/* Header */}
      <header className="bg-gray-800 py-4 shadow-md w-full">
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center">
          <div className="flex justify-evenly">
            <img src={chincheta} alt="" className="w-12 h-12"/>
            <h1 className="text-3xl font-bold mb-3 md:mb-0 px-4">
              Arquitecturas Integrales
            </h1>
          </div>

          <nav className="space-x-4 overflow-x px-4">
            <a
              href="/"
              className="text-gray-300 hover:text-white p-3 rounded-lg hover:bg-gray-700"
            >
              Home
            </a>
            <a
              href="/main"
              className="text-gray-300 hover:text-white p-3 rounded-md hover:bg-gray-700"
            >
              Docs
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[90vh]">
        <h2 className="text-4xl text-4xl md:text-6xl mx-1 md:mx-0 font-extrabold mb-4 text-center ">
          Bienvenido a arquitecturas integrales!
        </h2>
        <p className="text-lg text-xl md:text-2xl mx-1 md:mx-0 text-center max-w-2xl mb-8">
          La herramienta que reune todo lo que necesitas para codificar una aplicación web.
        </p>
        <a href="/main" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition">
          Ver la documentación
        </a>
      </section>
    </div>
  );
};

export default Landing;
