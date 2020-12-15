import React from 'react';
import NavItem from './NavItem';
import Logo from '../../common/Logo';
import { ReactComponent as MenuIcon } from '../../assets/img/icons/menu.svg';
import { ReactComponent as XIcon } from '../../assets/img/icons/x.svg';

import firebase from '../../firebase';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSignOut = () => firebase.auth().signOut();
  render() {
    return (
      <>
        <nav className={`bg-gray-900 w-full fixed z-10 shadow-md`}>
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className={`flex items-center justify-between h-16`}>
              <div className={`flex items-center`}>
                <div className={`flex-shrink-0`}>
                  <Logo size="medium" color="white" />
                </div>
                <div className={`hidden md:block`}>
                  <div className={`ml-10 flex items-baseline space-x-4`}>
                    <NavItem path="/dashboard" text="Dashboard" />
                    <NavItem path="/boards" text="Boards" />
                    {/* <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700`}>Team</a> */}
                  </div>
                </div>
              </div>
              <div className={`hidden md:block`}>
                <div className={`ml-4 flex items-center md:ml-6`}>
                  <div className={`ml-3 relative`}>
                    <div>{/* User avatar goes here... */}</div>
                  </div>
                </div>
              </div>
              <div className={`flex md:block`}>
                <div className={`md:hidden mr-2`}>
                  {/* Mobile menu button */}
                  <button
                    className={`inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400`}>
                    {/* Heroicon: menu  -- Menu open: "hidden", Menu closed: "block" */}
                    <MenuIcon className={`h-6 w-6 block`} />
                    {/* Heroicon: x -- Menu open: "block", Menu closed: "hidden" */}
                    <XIcon className={`h-6 w-6 hidden`} />
                  </button>
                </div>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:text-white`}
                  onClick={this.handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          {/* // TODO Implement mobile menu toggle show/hide                     */}
          {/* Mobile menu, toggle classes based on menu state.
                Open: "block", closed: "hidden" */}
          {/* <div className={`hidden md:hidden`}> */}
          {/* <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3`}>
              <button
                className={`block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700`}
              >
                Dashboard
              </button> 
              {/* <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700`}>Team</a>
                        <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700`}>Projects</a>
                        <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700`}>Calendar</a>
                        <a href="#" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700`}>Reports</a> */}
          {/* </div> */}
          {/* <div className={`pt-4 pb-3 border-t border-gray-700`}>
              <div className={`flex items-center px-5 space-x-3`}>
                <div className={`flex-shrink-0`}>
                  <img
                    className={`h-10 w-10 rounded-full`}
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className={`space-y-1`}>
                  <div
                    className={`text-base font-medium leading-none text-white`}
                  >
                    Tom Cook
                  </div>
                  <div
                    className={`text-sm font-medium leading-none text-gray-400`}
                  >
                    tom@example.com
                  </div>
                </div>
              </div>
              <div className={`mt-3 px-2 space-y-1`}>
                <button
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700`}
                >
                  Your Profile
                </button>
                <button
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700`}
                >
                  Settings
                </button>
                <button
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700`}
                >
                  Sign out
                </button>
              </div>
            </div> */}
          {/* </div> */}
        </nav>
      </>
    );
  }
}

export default Navbar;
