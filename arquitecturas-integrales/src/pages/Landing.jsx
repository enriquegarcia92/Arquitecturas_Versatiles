import React from "react";
import chincheta from '../img/chincheta.png'
import Topbar from "../components/Topbar";

const Landing = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full">
      {/* Header */}
      <Topbar />

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
