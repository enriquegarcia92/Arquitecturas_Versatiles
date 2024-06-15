import React from 'react';
import Card from '../components/Card';

const BackendDatabaseIntegration = () => {
  const title = "2.1.4 La integración de la lógica del servidor con la base de datos";
  const content = `La integración entre la base de datos y la lógica del negocio debe ser uniforme para la persistencia de los datos. La lógica del servidor se encarga de manejar todas las peticiones hechas por los clientes de la aplicación, sean usuarios que usan un navegador web, aplicaciones móviles o incluso otros servicios que requieren de la funcionalidad del backend, por lo que es indispensable que la base de datos sea la única fuente de información, además de mantener la persistencia de los datos.
  Existen tecnologías que permiten mapear las tablas de las bases de datos con las clases de la aplicación, esto es conocido como ORM (Object Relational Mapping), estas tecnologías simplifican la interacción con la base de datos mediante código del lenguaje de programación utilizado, como es el caso de Hibernate en Java, Entity Framework en C#, Sequelize en Node.js y muchos otros más, estos permiten manipular los datos de la base de datos como si fueran objetos del lenguaje de programación utilizado, facilitando el desarrollo y mantenimiento del código.`;

  return (
    <Card title={title} content={content} />
  );
};

export default BackendDatabaseIntegration;
