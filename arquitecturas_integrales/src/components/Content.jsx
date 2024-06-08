// src/components/Content.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Card from './Card';



const Content = () => {
  return (
    <div className="w-3/4 p-4 bg-custom5 h-screen overflow-auto">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default Content;
