import { useState } from 'react';
import '../App.css';

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <header className="bg-slate-700">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-white font-bold text-xl kanit-bold">
              <a href="#">Arquitecturas Versatiles</a>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center space-x-8 kanit-regular">
                <li>
                  <a href="#" className="text-white kanit-regular">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white kanit-regular">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white kanit-regular">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white kanit-regular">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:hidden">
              <button
                className="outline-none mobile-menu-button"
                onClick={() => setShowMenu(!showMenu)}
              >
                {!showMenu && (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                )}
              </button>
              {showMenu && (
                <div className="mobile-menu">
                  {/* Mobile menu items can be added here */}
                </div>
              )}
            </div>
          </div>
          <div className={`mobile-menu ${showMenu ? '' : 'hidden'} md:hidden`}>
            <ul className="mt-4 space-y-4 kanit-regular">
              <li>
                <a href="#" className="block px-4 py-2 text-white bg-slate-700 rounded">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-white bg-slate-700 rounded">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-white  bg-slate-700 rounded">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-white bg-slate-700 rounded">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Topbar;
