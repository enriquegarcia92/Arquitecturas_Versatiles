// MainLayout.tsx
import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { FaArrowLeft, FaBars, FaCheck, FaServer, FaTimes } from "react-icons/fa";
import GettingStartedPage from "./subPages/GettingStartedPage";
import BackEndPage from "./subPages/BackEndPage";
import { MdComputer } from "react-icons/md";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { BsCheck, BsHandThumbsUp, BsListCheck } from "react-icons/bs";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto bg-gray-900">
          <Outlet  />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
