import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ReactComponent as AddColumnIcon } from '../../../../assets/img/icons/view-grid-add-20.svg';
import { ReactComponent as UsersIcon } from '../../../../assets/img/icons/users-20.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/img/icons/trash-20.svg';
import { ReactComponent as CogIcon } from '../../../../assets/img/icons/cog-20.svg';
import { ReactComponent as ThreeDotsIcon } from '../../../../assets/img/icons/three-dots-24.svg';

const BoardDetailHeaderDropdown = ({
  toggleShowBoardMenuSlideOver,
  handleCreateColumn,
  toggleShowDeleteBoardModal,
}) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="w-10 h-10 text-white bg-gray-600 bg-opacity-50 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:ring transition focus:ring-gray-300 rounded-md">
              <ThreeDotsIcon
                className="w-5 h-5 mx-auto text-white transition ease-in-out duration-150"
                title="menu-icon"
              />
            </Menu.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute z-40 w-56 mt-2 bg-white border border-gray-200 rounded-sm shadow-lg outline-none lg:right-0 origin-top-right divide-y divide-gray-100">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-start w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer focus:outline-none focus:ring ring-inset focus:ring-gray-300`}
                        role="menuitem"
                        onClick={handleCreateColumn}>
                        <AddColumnIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Create Column</span>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-start w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer focus:outline-none focus:ring ring-inset focus:ring-gray-300`}
                        role="menuitem"
                        onClick={toggleShowBoardMenuSlideOver}>
                        <CogIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Board Menu</span>
                      </div>
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
                        onClick={toggleShowDeleteBoardModal}>
                        <TrashIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Delete Board</span>
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

export default BoardDetailHeaderDropdown;
