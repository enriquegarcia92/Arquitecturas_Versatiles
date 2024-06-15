import React from 'react';
import Card from '../components/Card';

const IntegrationTechnologies = () => {
  const title = "2.1 Integración de diferentes tecnologías de back-end y front-end en el desarrollo de aplicaciones";
  const content = `El desarrollo de aplicaciones se puede basar en la combinación de tecnologías conocidas en la industria. Entre las cuales se encuentran Spring boot, Django, Express para el desarrollo del backend, cada uno disponible con dos versiones distintas, una usando una base de datos NoSQL MongoDB, y la otra versión usando la base de datos relacional PostgreSQL. 
  Además para la capa del cliente o front end se puede implementar el uso de Angular, Vue y React, frameworks los cuales son considerados líderes en el desarrollo de aplicaciones web interactivas y dinámicas. La implementación de una arquitectura uniforme, en la cual las tecnologías empleadas para el back end y front end sean compatibles e interoperables entre sí, permite mayor flexibilidad y modularidad en el desarrollo así como una fácil demostración de la integración de distintas tecnologías y la incorporación del uso de nuevas funcionalidades en el futuro. A la vez utilizar herramientas de contenerización como Docker y Docker Compose, junto con un servidor web Nginx para su despliegue y gestión dará paso a una implementación eficiente y confiable.`;

  return (
    <Card title={title} content={content} />
  );
};

export default IntegrationTechnologies;
