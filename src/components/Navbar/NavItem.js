import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ path, text }) => {
  return (
    <NavLink
      to={path}
      className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700 hover:bg-opacity-60 focus:outline-none focus:text-white"
      activeClassName="bg-gray-800">
      {text}
    </NavLink>
  );
};

export default NavItem;
