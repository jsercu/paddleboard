import React from 'react';
import dayjs from 'dayjs';
import TaskDropdown from './TaskDropdown';
import { ReactComponent as DescriptionIcon } from '../../../../assets/icons/menu-alt-2-20.svg';
import { ReactComponent as ClockIcon } from '../../../../assets/icons/clock-24.svg';

const Task = ({ deleteTask, task, toggleShowTaskSlideOver }) => {
  const { name, description, id, columnId, dueDate } = task;
  // Format the dueDate propert of the task
  const formattedDueDate = dueDate ? dayjs(dueDate).format('MMM DD YYYY') : null;

  const handleDeleteTask = () => {
    deleteTask(id, columnId);
  };

  const handleEditTask = () => {
    toggleShowTaskSlideOver(true, { ...task });
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-sm cursor-pointer hover:border-gray-300 group shadow-sm">
      <div className="flex flex-col p-3 group-hover:bg-gray-50 group-hover:bg-opacity-50">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xs font-medium text-gray-800 leading-4">{name}</p>
        </div>
        <div className="flex flex-row items-center justify-between mt-2 align-text-bottom space-x-3">
          {description && (
            <div className="h-3">
              <DescriptionIcon className="w-3 h-3 text-gray-400" />
            </div>
          )}
          {dueDate && (
            <div className="flex flex-row items-center h-3">
              <ClockIcon className="w-3 h-3 text-gray-400" />
              <div className="ml-1 text-xs font-light text-gray-400">{formattedDueDate}</div>
            </div>
          )}
        </div>
        {/* <div className="flex flex-row items-center justify-between mt-2">
          <img
            className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span className={`px-2 text-xs font-semibold rounded-full ` + getCategoryStyles()}>{category}</span>
        </div> */}
      </div>
      <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100">
        <TaskDropdown deleteTask={handleDeleteTask} editTask={handleEditTask} />
      </div>
    </div>
  );
};

export default Task;
