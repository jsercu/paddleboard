import React from 'react';
import Task from '../Task/Task';
import IconButton from '../../../../common/Buttons/IconButton';
import { ReactComponent as PlusIcon } from '../../../../assets/img/icons/plus.svg';

const Column = ({ name, id, tasks }) => {
  return (
    <div className="flex bg-gray-100 rounded-sm shadow-xl">
      <div className="w-full p-4">
        <div className="flex justify-between">
          <h3 className="mb-1 font-semibold text-gray-600 text-md leading-6">{name}</h3>
          <IconButton backgroundType="offWhite">
            <PlusIcon title="x-icon" className={`h-6 w-6`} />
          </IconButton>
        </div>
        {tasks.length > 0 &&
          tasks.map(({ name, id, description }) => <Task name={name} key={id} description={description} />)}
      </div>
    </div>
  );
};

export default Column;
