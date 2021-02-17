import React from 'react';
import Task from '../Task/Task';
import ColumnDropdown from './ColumnDropdown';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ columnValues, deleteColumn, deleteTask, tasks, toggleShowColumnModal, toggleShowTaskSlideOver }) => {
  const getTaskListStyle = () => {};

  const handleAddTask = (event) => {
    if (event) {
      event.preventDefault();
    }
    const initialTaskValues = { column: { ...columnValues } };
    toggleShowTaskSlideOver(false, initialTaskValues);
  };

  return (
    <>
      <Droppable droppableId={columnValues.id} direction="vertical" type="task">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              getTaskListStyle(snapshot.isDraggingOver) +
              ' flex flex-col relative justify-between h-full w-full bg-gray-100 border-l border-gray-200 overflow-auto'
            }>
            <div>
              <div className="sticky top-0 z-10 pt-2 bg-gray-100">
                <div className="flex items-center justify-between px-4 py-2">
                  <h3 className="text-sm font-medium text-gray-600 leading-6">{columnValues.name}</h3>
                  <div>
                    <ColumnDropdown
                      columnValues={columnValues}
                      deleteColumn={deleteColumn}
                      toggleShowColumnModal={toggleShowColumnModal}
                      toggleShowTaskSlideOver={toggleShowTaskSlideOver}
                      handleAddTask={handleAddTask}
                    />
                  </div>
                </div>
              </div>
              <div className="px-2">
                {tasks && tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mt-1">
                          <Task
                            key={task.id}
                            deleteTask={deleteTask}
                            task={task}
                            toggleShowTaskSlideOver={toggleShowTaskSlideOver}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/* <div className="absolute inset-x-0 bottom-0 p-4 bg-white">
              <button
                onClick={handleAddTask}
                className="inline-flex items-center justify-start w-full px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                <PlusIcon className="w-5 h-5 mr-2 transition ease-in-out duration-150" title="plus-icon" />
                Add Task
              </button>
            </div> */}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Column;
