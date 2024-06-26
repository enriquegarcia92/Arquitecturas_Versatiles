import React from 'react';

const TextBlock = ({ title, textContent }) => {
  return (
    <div className="w-full mx-auto p-4 flex flex-col">
      {title && <h2 className="text-xl font-bold text-gray-300 justify-self-start">{title}</h2>}
      {textContent && <p className="text-justify text-gray-300">{textContent}</p>}
    </div>
  );
};

export default TextBlock;
