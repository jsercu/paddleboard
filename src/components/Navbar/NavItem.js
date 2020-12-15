import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ path, text }) => {
  return (
    <Link
      to={path}
      className={`px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:text-white`}>
      {text}
    </Link>
  );
};

export default NavItem;
