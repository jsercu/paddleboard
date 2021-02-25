import React from 'react';
import SlideOver from '../../../../../components/Modals/SlideOver';
import { TaskSlideOverForm } from './TaskSlideOverForm';

const TaskSlideOver = ({
  addTask,
  updateTask,
  columns,
  editMode,
  initialValues,
  toggleShowColumnModal,
  toggleShowTaskSlideOver,
}) => {
  const getFormattedInitialValues = () => {
    if (initialValues.columnId) {
      return { ...initialValues, column: columns[initialValues.columnId] };
    } else {
      return initialValues;
    }
  };

  return (
    <SlideOver toggleShowSlideOver={toggleShowTaskSlideOver}>
      <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl space-y-6">
        <header className="px-4 py-6 bg-indigo-800 sm:px-6">
          <h2 className="mb-1 text-xl font-medium leading-6 text-indigo-50">
            {editMode ? 'Edit Task' : 'Create Task'}
          </h2>
          <h5 className="text-sm font-light leading-snug text-indigo-200">
            {editMode
              ? 'Make any edits required to the information below and then click save to update the task.'
              : 'Get started by filling in the information below to create your new task.'}
          </h5>
        </header>
        <div className="relative flex-1">
          <TaskSlideOverForm
            addTask={addTask}
            updateTask={updateTask}
            editMode={editMode}
            initialValues={getFormattedInitialValues()}
            toggleShowColumnModal={toggleShowColumnModal}
            toggleShowTaskSlideOver={toggleShowTaskSlideOver}
          />
        </div>
      </div>
    </SlideOver>
  );
};

export default TaskSlideOver;
