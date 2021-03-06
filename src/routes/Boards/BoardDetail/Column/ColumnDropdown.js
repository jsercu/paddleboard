import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ReactComponent as ThreeDotsIcon } from '../../../../assets/icons/three-dots-24.svg';
import { ReactComponent as PencilIcon } from '../../../../assets/icons/pencil-alt-20.svg';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/plus-24.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash-20.svg';

const ColumnDropdown = ({ columnValues, deleteColumn, handleAddTask, toggleShowColumnModal }) => {
  const handleDelete = () => {
    const { id, taskIds } = columnValues;
    deleteColumn(id, taskIds);
  };

  const handleUpdateColumn = (event) => {
    if (event) {
      event.preventDefault();
    }
    const { name, id } = columnValues;
    const initialColumnValues = { name: name, id: id };
    toggleShowColumnModal(true, initialColumnValues);
  };

  return (
    <div className="relative flex items-center">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="p-1 text-gray-400 rounded-sm hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:bg-gray-200 focus:text-gray-500">
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
              <Menu.Items className="absolute right-0 z-40 w-56 mt-2 bg-white border border-gray-200 rounded-sm shadow-lg outline-none origin-top-right divide-y divide-gray-100">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-start w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer focus:outline-none focus:ring ring-inset focus:ring-gray-300`}
                        role="menuitem"
                        onClick={handleUpdateColumn}>
                        <PencilIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Edit Column</span>
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
                        onClick={handleAddTask}>
                        <PlusIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Create Task</span>
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
                        onClick={handleDelete}>
                        <TrashIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>Delete Column</span>
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

export default ColumnDropdown;
