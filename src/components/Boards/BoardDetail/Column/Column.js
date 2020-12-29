import React from 'react';
import Task from '../Task/Task';
import IconButton from '../../../../common/Buttons/IconButton';
import { ReactComponent as PlusIcon } from '../../../../assets/img/icons/plus-24.svg';

const Column = ({ name, tasks }) => {
  return (
    <div className="flex bg-gray-100 rounded-sm shadow-xl">
      <div className="w-full p-4">
        <div className="flex justify-between">
          <h3 className="mb-1 text-sm font-medium text-gray-600 leading-6">{name}</h3>
          <IconButton backgroundType="offWhite">
            <PlusIcon title="x-icon" className="w-6 h-6" />
          </IconButton>
        </div>
        {tasks.length > 0 &&
          tasks.map(({ name, id, created, category, description }) => (
            <Task name={name} key={id} category={category} created={created} description={description} />
          ))}
      </div>
    </div>
  );
};

export default Column;
