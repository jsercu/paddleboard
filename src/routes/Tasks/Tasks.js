import React from 'react';
import { ReactComponent as WorkingTaskImage } from '../../assets/img/working-task.svg';
import TaskList from './TaskList/TaskList';

const Tasks = () => {
  return (
    <div className="flex flex-col w-full h-full py-24 align-middle bg-gray-50">
      <div className="flex flex-col items-center justify-center h-full px-8 pb-24 text-center sm:px-24 md:px-32">
        <div className="relative mb-6">
          <WorkingTaskImage className="mb-2 w-96 h-96" />
          <a
            href="https://storyset.com/work"
            target="_blank"
            className="absolute inset-x-0 bottom-0 mx-auto text-xs italic font-light text-gray-300 cursor-pointer hover:underline">
            Illustration by Freepik Storyset
          </a>
        </div>

        <h5 className="px-4 mb-1 text-lg font-semibold text-gray-800 leading-6">
          This page is still under construction.
        </h5>
        <p className="px-4 mb-6 text-sm font-normal text-gray-500 leading-5">
          We've created a list of tasks, rolled up our sleeves, and started writing code. However, we still have a bit
          more work left before this page will be ready...
        </p>
      </div>
    </div>
  );
};

export default Tasks;
