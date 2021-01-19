import React from 'react';
import SlideOver from '../../../../../common/Modals/SlideOver';
import { TaskSlideOverForm } from './TaskSlideOverForm';

const TaskSlideOver = ({ addTask, updateTask, columns, editMode, initialValues, toggleShowTaskSlideOver }) => {
  const getFormattedInitialValues = () => {
    if (initialValues.columnId) {
      return { ...initialValues, column: columns[initialValues.columnId] };
    } else {
      return initialValues;
    }
  };

  return (
    <SlideOver
      panelTitle={editMode ? 'Edit Task' : 'Create Task'}
      panelSecondaryText={
        editMode
          ? 'Make any edits required to the information below and then click save to update the task.'
          : 'Get started by filling in the information below to create your new task.'
      }
      toggleShowSlideOver={toggleShowTaskSlideOver}>
      <TaskSlideOverForm
        addTask={addTask}
        updateTask={updateTask}
        editMode={editMode}
        initialValues={getFormattedInitialValues()}
        toggleShowTaskSlideOver={toggleShowTaskSlideOver}
      />
    </SlideOver>
  );
};

export default TaskSlideOver;
