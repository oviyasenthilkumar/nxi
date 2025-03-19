import React from 'react'
import {  NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
       
      <nav className="w-full flex justify-center space-x-8 text-lg font-semibold mb-6 mt-10 p-4">
  <NavLink
    to="/entities"
    className={({ isActive }) =>
      isActive ? "text-black font-bold" : "text-gray-500"
    }
  >
    ENTITIES
  </NavLink>

  <NavLink
    to="/association"
    className={({ isActive }) =>
      isActive ? "text-black font-bold" : "text-gray-500"
    }
  >
    ASSOCIATION
  </NavLink>

  <NavLink
    to="/process"
    className={({ isActive }) =>
      isActive ? "text-black font-bold" : "text-gray-500"
    }
  >
    PROCESS
  </NavLink>
</nav>
    
    </div>
  )
}

export default Header
