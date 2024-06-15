import React from 'react';
import Card from '../components/Card';

const BackendStructure = () => {
  const title = "2.1.5 Estructura del backend de una aplicación";
  const content = `Para poder manejar todas las peticiones de una forma óptima y mantenible se debe estructurar correctamente, por ejemplo con la siguiente estructura:
  - Controladores: son los encargados de manejar las peticiones HTTP y retornar las respuestas adecuadas.
  - Servicios: son los encargados de implementar la lógica de negocio.
  - Repositorios: son los encargados de interactuar con la base de datos.
  - Modelos: son las representaciones de las tablas de la base de datos en forma de clases u objetos.
  - DTO (Data Transfer Object): son objetos que permiten transferir datos entre capas de la aplicación, estos se utilizan para encapsular los datos y evitar exponer directamente las entidades de la base de datos.
  
  Esta estructura permite tener un código limpio, mantenible y escalable.`;

  return (
    <Card title={title} content={content} />
  );
};

export default BackendStructure;
