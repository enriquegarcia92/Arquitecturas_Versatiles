import React from 'react';
import Card from '../components/Card';

const FrontendStructure = () => {
  const title = "2.1.6 Estructura del frontend de una aplicación";
  const content = `El front-end debe estructurarse de forma que sea mantenible y escalable, una posible estructura es la siguiente:
  - Componentes: son las unidades reutilizables de la interfaz de usuario.
  - Servicios: son los encargados de interactuar con las APIs del backend.
  - Vistas: son las representaciones visuales de las páginas de la aplicación.
  - Rutas: son las definiciones de las rutas de la aplicación.

  Esta estructura permite tener un código limpio, mantenible y escalable.`;

  return (
    <Card title={title} content={content} />
  );
};

export default FrontendStructure;
