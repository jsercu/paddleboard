import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ path, text }) => {
  return (
    <Link
      to={path}
      className={`px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:text-white`}>
      {text}
    </Link>
  );
};

export default NavItem;
