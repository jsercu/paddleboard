import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ReactComponent as ThreeDotsIcon } from '../../../../assets/icons/three-dots-24.svg';
import { ReactComponent as LockIcon } from '../../../../assets/icons/lock-20.svg';
import { ReactComponent as PencilIcon } from '../../../../assets/icons/pencil-alt-20.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash-20.svg';

const TaskDropdown = ({ deleteTask, editTask }) => {
  return (
    <div className="relative flex">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="p-1 m-1 text-gray-500 rounded-sm bg-gray-50 bg-opacity-95 hover:text-gray-500 hover:bg-gray-50">
              <ThreeDotsIcon className="w-5 h-5 mx-auto" title="menu-icon" />
            </Menu.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-75"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-300"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute right-0 z-40 w-56 mt-2 bg-white border border-gray-200 rounded-sm shadow-lg outline-none top-4 origin-top-right divide-y divide-gray-100">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-start w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer focus:outline-none focus:ring ring-inset focus:ring-gray-300`}
                        role="menuitem">
                        <LockIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Lock Position</span>
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
                        onClick={editTask}>
                        <PencilIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Edit Task</span>
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
                        onClick={deleteTask}>
                        <TrashIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Delete Task</span>
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

export default TaskDropdown;
