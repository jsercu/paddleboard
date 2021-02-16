import React from 'react';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import Logo, { LogoColorTheme, LogoSizeTheme } from '../Logo';
import { useAuth } from '../../hooks/useAuth';
import { ReactComponent as MenuIcon } from '../../assets/img/icons/menu-24.svg';
import { ReactComponent as XIcon } from '../../assets/img/icons/x-24.svg';

const Navbar = () => {
  const auth = useAuth();
  const handleSignOut = () => auth.signout();
  return (
    <nav className="fixed z-10 w-full bg-gray-900 shadow-md">
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo size={LogoSizeTheme.medium} color={LogoColorTheme.white} />
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10 space-x-4">
                <NavItem path="/dashboard" text="Dashboard" />
                <NavItem path="/boards" text="Boards" />
                <NavItem path="/tasks" text="Tasks" />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:hidden">
              {/* Mobile menu button */}
              <button className="inline-flex items-center justify-center p-2 text-gray-300 rounded-md hover:text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400">
                {/* Heroicon: menu  -- Menu open: "hidden", Menu closed: "block" */}
                <MenuIcon title="menu-icon" className="block w-6 h-6" />
                {/* Heroicon: x -- Menu open: "block", Menu closed: "hidden" */}
                <XIcon title="x-icon" className="hidden w-6 h-6" />
              </button>
            </div>
            <NavDropdown handleSignOut={handleSignOut} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
