import React from 'react'
import {  NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#ffffff]">
      <nav className="w-full flex justify-center space-x-8 text-lg font-semibold pt-10 p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-black font-bold" : "text-gray-600"
          }
        >
          Nested Array
        </NavLink>

        <NavLink
          to="/association"
          className={({ isActive }) =>
            isActive ? "text-black font-bold" : "text-gray-600"
          }
        >
          Associations
        </NavLink>

        <NavLink
          to="/detailing"
          className={({ isActive }) =>
            isActive ? "text-black font-bold" : "text-gray-600"
          }
        >
          Detailing
        </NavLink>
      </nav>
    </div>
  );
}

export default Header
