import React from 'react';
import Card from '../components/Card';

const DataHandling = () => {
  const title = "2.1.3 El manejo de los datos de una aplicación";
  const content = `En el caso de la capa que maneja la lógica de negocios, o también conocida como backend, debe tener persistencia, lo que implica que se requiere de una base de datos para poder almacenar todos los registros que se desean almacenar, para ello existen distintos tipos de bases de datos proporcionadas por distintos gestores, como Sql server, Mysql, Postgre, MongoDB, y muchas otras más, entre ellas se pueden dividir en bases de datos relacionales y bases de datos no relacionales, cada una cumple su objetivo y propósito, así como tener sus pros y sus contras. 
  Las bases de datos relacionales organizan los datos en tablas con columnas y filas, donde las columnas son atributos y las filas son registros o tuplas, entre ellas las más conocidas son MySQL, PostgreSQL, MariaDB y SQLite. Mientras que las bases de datos no relacionales organizan los datos en colecciones o documentos, entre los gestores más conocidos están MongoDB, Firebase, Redis, entre otros.`;

  return (
    <Card title={title} content={content} />
  );
};

export default DataHandling;
