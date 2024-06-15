// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-1/6 h-screen bg-gray-200 p-4">
      <ul>
        <li className="mb-2">
          <Link to="/home" className="text-blue-500 hover:underline">Home</Link>
        </li>
        <li className="mb-2">
          <Link to="/about" className="text-blue-500 hover:underline">About</Link>
        </li>
        <li className="mb-2">
          <Link to="/contact" className="text-blue-500 hover:underline">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
