// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { MdComputer } from "react-icons/md";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";
import { FaArrowLeft, FaBars, FaCheck, FaServer } from "react-icons/fa";
import DisclosureMenu from "./DisclosureMenu";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setIsMenuOpen(false); // Close the menu when an item is selected
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Always open above md screen size
      }
    };

    handleResize(); // Set the initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:flex md:h-full">
      {/* Sidebar for md and above */}
      <div
        className={`bg-gray-700 text-white hidden md:flex flex-col space-y-2 px-2 py-4 transition-width duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {window.innerWidth < 768 && (
          <button
            onClick={toggleSidebar}
            className={`focus:outline-none mb-4 flex ${
              isSidebarOpen ? "justify-end" : "justify-center"
            }`}
          >
            {isSidebarOpen ? (
              <FaArrowLeft className="text-white w-6 h-6" />
            ) : (
              <FaBars className="text-white w-6 h-6" />
            )}
          </button>
        )}
        {isSidebarOpen && (
          <>
          <DisclosureMenu
              title="Metodologia"
              subtitles={[
                { label: "Introduction", link: "/main/methodology/intro" },
    
              ]}
              icon={FaCheck}
            />
            <DisclosureMenu
              title="First Principles"
              subtitles={[
                { label: "Introduction", link: "/main/methodology" },
                { label: "Overview", link: "/first-principles/overview" },
              ]}
              icon={FaCheck}
            />
            <DisclosureMenu
              title="Back-End Guide"
              subtitles={[
                { label: "Introduction", link: "/backend/introduction" },
                { label: "Overview", link: "/backend/overview" },
              ]}
              icon={FaServer}
            />
            <DisclosureMenu
              title="Front-End Guide"
              subtitles={[
                { label: "Introduction", link: "/frontend/introduction" },
                { label: "Overview", link: "/frontend/overview" },
              ]}
              icon={MdComputer}
            />
            <DisclosureMenu
              title="Deployment"
              subtitles={[
                { label: "Introduction", link: "/deployment/introduction" },
                { label: "Overview", link: "/deployment/overview" },
              ]}
              icon={AiOutlineDeploymentUnit}
            />
            <DisclosureMenu
              title="Best Practices"
              subtitles={[
                { label: "Introduction", link: "/best-practices/introduction" },
                { label: "Overview", link: "/best-practices/overview" },
              ]}
              icon={BsHandThumbsUp}
            />
          </>
        )}
      </div>

      {/* Topbar for below md */}
      <div className="md:hidden">
        <div className="bg-gray-700 text-white flex justify-between items-center p-4">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FaBars className="text-white w-6 h-6" />
          </button>
          <div className="text-white font-bold text-xl kanit-bold">
            {selectedMenu}
          </div>
        </div>
        {isMenuOpen && (
          <div className="bg-gray-700 text-white flex flex-col space-y-2 px-2 py-4">
            <DisclosureMenu
              title="First Principles"
              subtitles={[
                { label: "Introduction", link: "/main/methodology" },
                { label: "Overview", link: "/" },
              ]}
              icon={FaCheck}
            />
            
            <DisclosureMenu
              title="Back-End Guide"
              subtitles={[
                { label: "Introduction", link: "/backend/introduction" },
                { label: "Overview", link: "/backend/overview" },
              ]}
              icon={FaServer}
            />
            <DisclosureMenu
              title="Front-End Guide"
              subtitles={[
                { label: "Introduction", link: "/frontend/introduction" },
                { label: "Overview", link: "/frontend/overview" },
              ]}
              icon={MdComputer}
            />
            <DisclosureMenu
              title="Deployment"
              subtitles={[
                { label: "Introduction", link: "/deployment/introduction" },
                { label: "Overview", link: "/deployment/overview" },
              ]}
              icon={AiOutlineDeploymentUnit}
            />
            <DisclosureMenu
              title="Best Practices"
              subtitles={[
                { label: "Introduction", link: "/best-practices/introduction" },
                { label: "Overview", link: "/best-practices/overview" },
              ]}
              icon={BsHandThumbsUp}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
