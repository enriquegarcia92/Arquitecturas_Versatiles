
import React from 'react';
import flyImg from '../img/Fly.png'

const Header = () => {
  return (
    <div className="w-full bg-gray-900 text-white p-4 flex items-center">
      <img src={flyImg} alt="Fly" className="h-8 w-8 mr-4" />
      <h1 className="text-xl font-bold">Flaiestack</h1>
    </div>
  );
};

export default Header;
