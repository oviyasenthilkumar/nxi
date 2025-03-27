import React from 'react'
import {  NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#101828]">
      <nav className="w-full flex justify-center space-x-8 text-lg font-semibold pt-10 p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-gray-200"
          }
        >
          Nested Array
        </NavLink>

        <NavLink
          to="/association"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-gray-200"
          }
        >
          Associations
        </NavLink>

        <NavLink
          to="/detailing"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-gray-200"
          }
        >
          Detailing
        </NavLink>
      </nav>
    </div>
  );
}

export default Header
