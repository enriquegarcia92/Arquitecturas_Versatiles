import React from 'react';
import Card from '../components/Card';

const InfrastructureFrontendBackend = () => {
  const title = "2.1.7 La infraestructura necesaria para el desarrollo de aplicaciones";
  const content = `Para poder desarrollar una aplicación web se requieren de distintas herramientas y tecnologías, entre ellas se encuentran:
  - Contenedores: Docker permite crear contenedores que encapsulan la aplicación y sus dependencias, permitiendo que se pueda ejecutar en cualquier entorno.
  - Orquestadores: Kubernetes permite gestionar los contenedores de Docker, facilitando el despliegue, escalabilidad y mantenimiento de las aplicaciones.
  - Servidores web: Nginx permite servir la aplicación al usuario final, además de manejar el balanceo de carga y la seguridad.
  - CI/CD: Jenkins permite automatizar el proceso de integración y despliegue continuo, facilitando el desarrollo y la entrega de nuevas funcionalidades.
  - Repositorios de código: Git permite gestionar el código fuente de la aplicación, facilitando la colaboración entre desarrolladores.`;

  return (
    <Card title={title} content={content} />
  );
};

export default InfrastructureFrontendBackend;
