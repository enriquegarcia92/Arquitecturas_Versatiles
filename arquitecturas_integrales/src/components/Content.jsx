import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = () => <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, voluptatum quasi. Hic incidunt impedit veritatis, iure pariatur, ab molestias natus ratione tempora facere quasi dolorem, vero laboriosam. Cum, non natus.</div>;
const About = () => <div>About Content</div>;
const Contact = () => <div>Contact Content</div>;

const Content = () => {
  return (
    <div className="w-3/4 p-4">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default Content;
