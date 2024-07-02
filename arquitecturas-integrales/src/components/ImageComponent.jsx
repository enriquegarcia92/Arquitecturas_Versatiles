import React from 'react';

const ImageComponent = ({ image, width, height, title, description }) => {
  return (
    <div className="w-fit bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 flex flex-col justify-center items-center">
      {image && (
        <img
          src={image}
          alt={title || 'Image'}
          className={`${height} ${width}`}
        />
      )}
      {title && <h2 className="text-md text-gray-300 font-semibold mt-2 text-center">{title}</h2>}
      {description && <p className="text-gray-300 mt-2">{description}</p>}
    </div>
  );
};

export default ImageComponent;


