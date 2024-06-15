import React from 'react';
import Card from '../components/Card';

const ClientServerArchitecture = () => {
  const title = "2.1.1 Arquitectura cliente-servidor en un desarrollo de aplicaciones";
  const content = `Esta arquitectura separa la lógica de negocios en la capa del servidor, donde se puede implementar tecnologías como Spring Boot, Django y Express, esta capa maneja todas las operaciones requeridas para que la aplicación funcione correctamente interactuando directamente con la base de datos. Además gracias al uso de Json Web Token se implementa una capa de seguridad en la que solo se puede acceder al servidor con un token válido que se otorga en el inicio de sesión el cual es manejado por el cliente. 
  Por otro lado la capa de cliente contiene todo el aspecto visual la cual se puede implementar tecnologías como React, Vue.js y Angular, todas las páginas web serán implementadas con el lenguaje JavaScript, pero estas únicamente interactúan con el servidor mediante peticiones manejando la información recibida. 
  La arquitectura cliente servidor permite hacer las aplicaciones web más seguras debido a que el usuario solo tiene acceso al código compilado de la página web.`;

  return (
    <Card title={title} content={content} />
  );
};

export default ClientServerArchitecture;
