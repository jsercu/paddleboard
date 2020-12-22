import React from 'react';

const Task = ({ name, description }) => {
  return (
    <div className="p-4 my-2 bg-white border border-gray-200 rounded-sm cursor-grab hover:bg-gray-50">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <span className="text-sm font-medium text-gray-600">{name}</span>
          <img
            className={`inline-block w-6 h-6 rounded-full ring-2 ring-white`}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="mr-8">
          <p className="text-xs font-light text-gray-400 leading-4">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
