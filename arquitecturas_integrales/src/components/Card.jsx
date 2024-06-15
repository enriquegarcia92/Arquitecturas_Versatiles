// src/components/Card.jsx

import React from 'react';

const Card = ({ title, content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-10 mb-4">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Card;

/* 
Espaciado (margin y padding)
Margen (margin)
m-: Aplica margen en todas las direcciones.
mt-: Margen superior.
mb-: Margen inferior.
ml-: Margen izquierdo.
mr-: Margen derecho.
mx-: Margen horizontal (izquierda y derecha).
my-: Margen vertical (arriba y abajo).
Padding
p-: Aplica padding en todas las direcciones.
pt-: Padding superior.
pb-: Padding inferior.
pl-: Padding izquierdo.
pr-: Padding derecho.
px-: Padding horizontal (izquierda y derecha).
py-: Padding vertical (arriba y abajo).
Tamaño (width y height)
w-: Ancho.
h-: Alto.
Espacio entre elementos
space-x-: Espacio horizontal entre elementos.
space-y-: Espacio vertical entre elementos.
Colores
bg-: Color de fondo.
text-: Color de texto.
Borde
border-: Borde.
rounded-: Bordes redondeados.
Otros
flex-: Propiedades de flexbox.
grid-: Propiedades de grid.
font-: Propiedades de fuente.
Tamaños predefinidos
sm-: Pequeño (small).
md-: Mediano (medium).
lg-: Grande (large).
xl-: Extra grande (extra large).
Responsividad
sm-: Responsividad para pantallas pequeñas.
md-: Responsividad para pantallas medianas.
lg-: Responsividad para pantallas grandes.*/