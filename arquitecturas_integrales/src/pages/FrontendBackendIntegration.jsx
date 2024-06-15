import React from 'react';
import Card from '../components/Card';

const FrontendBackendIntegration = () => {
  const title = "2.1.2 Integración del front-end con el back-end para el desarrollo de aplicaciones";
  const content = `Estas tecnologías se integran de forma apropiada desarrollando el backend como una REST API, esta es una interfaz que permite a acceder a las funcionalidades y lógica de negocio mediante peticiones HTTP, entre ellas existen cuatro tipos básicos, las GET que sirven para obtener información, las POST que sirven para enviar información, las PUT que sirven para actualizar información y las DELETE que permiten eliminar información, todas estas peticiones se deben seleccionar apropiadamente según el contexto de las peticiones que se realicen a la API, estas proporcionan una serie de operaciones que pueden realizarse en base a rutas URL mediante un método http, por ejemplo obtener una lista o crear un nuevo registro en una base datos, además de que estas no necesitan mantener una sesión en el servidor, lo que hace que sean escalables. 
  Debido al protocolo HTTP, existen distintas herramientas como POSTMAN o INSOMNIA, que permiten hacer llamadas mediante una URL a la API, lo que implica que se pueden realizar peticiones a través de internet, es ahí donde se integran las tecnologías de front-end y back-end dado que las URL de las API pueden ser consultados tanto a través de internet, como a través de una red local, lo que permite que tanto las aplicaciones previamente mencionadas, como un sitio web o incluso una aplicación móvil puedan interactuar con las API, la cual se encarga de manejar toda la lógica de negocio de una aplicación reduciendo los tiempos de carga en el front end y brindando escalabilidad.
  La interacción entre múltiples lenguajes de programación tanto en el front-end como en el back end es posible gracias al formato de texto JSON.`;

  return (
    <Card title={title} content={content} />
  );
};

export default FrontendBackendIntegration;
