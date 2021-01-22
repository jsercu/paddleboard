import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ReactComponent as UserProfileIcon } from '../../assets/img/icons/user-circle-20.svg';
import { ReactComponent as LogoutIcon } from '../../assets/img/icons/logout-20.svg';

const NavDropdown = ({ handleSignOut }) => {
  const auth = useAuth();
  return (
    <div className="relative flex">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={auth.user.photoURL} alt="User Profile Photo" />
            </Menu.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-75"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-300"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute right-0 z-40 w-56 mt-2 bg-white border border-gray-200 rounded-sm shadow-lg outline-none top-8 origin-top-right divide-y divide-gray-100">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`/users/${auth.user.uid}`}
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-start w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer focus:outline-none focus:ring ring-inset focus:ring-gray-300s`}>
                        <UserProfileIcon className="w-5 h-5 mr-2 text-gray-400" />
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                </div>

                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-start w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer focus:outline-none focus:ring ring-inset focus:ring-gray-300s`}
                        role="menuitem"
                        onClick={handleSignOut}>
                        <LogoutIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Sign Out</span>
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default NavDropdown;
