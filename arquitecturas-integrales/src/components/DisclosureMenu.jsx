// src/components/DisclosureMenu.jsx
import React from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const DisclosureMenu = ({ title, subtitles, icon: Icon }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full p-2 text-left text-white bg-gray-800 rounded hover:bg-gray-700">
            <div className="flex items-center space-x-2">
              <Icon className="w-5 h-5" />
              <span>{title}</span>
            </div>
            {open ? (
              <FaChevronDown className="w-5 h-5" />
            ) : (
              <FaChevronRight className="w-5 h-5" />
            )}
          </Disclosure.Button>
          <Disclosure.Panel className="pl-6">
            {subtitles.map((subtitle, index) => (
              <Link
                key={index}
                to={subtitle.link}
                className="block p-2 text-white hover:bg-gray-700 rounded"
              >
                {subtitle.label}
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default DisclosureMenu;
