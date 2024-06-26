import React from 'react';

const ImageComponent = ({ image, width, height, title, description }) => {
  return (
    <div className="max-w-xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-lg p-4">
      {image && (
        <img
          src={image}
          alt={title || 'Image'}
          className={`object-cover w-full ${height} md:h-auto`}
          style={{ width }}
        />
      )}
      {title && <h2 className="text-xl font-bold mt-2">{title}</h2>}
      {description && <p className="text-gray-300 mt-2">{description}</p>}
    </div>
  );
};

export default ImageComponent;

