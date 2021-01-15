import React, { useState, useEffect } from 'react';
import Task from '../Task/Task';
import ColumnDropdown from './ColumnDropdown';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ columnValues, tasks, deleteColumn, deleteTask, toggleShowTaskSlideOver }) => {
  const getTaskListStyle = () => {};

  return (
    <>
      <Droppable droppableId={columnValues.id} direction="vertical" type="task">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={getTaskListStyle(snapshot.isDraggingOver)}>
            <div className="flex bg-gray-100 rounded-sm shadow-xl" style={{ minHeight: '33vh' }}>
              <div className="w-full p-4">
                <div className="flex items-center justify-between">
                  <h3 className="mb-1 text-sm font-medium text-gray-600 leading-6">{columnValues.name}</h3>
                  <ColumnDropdown
                    columnValues={columnValues}
                    deleteColumn={deleteColumn}
                    toggleShowTaskSlideOver={toggleShowTaskSlideOver}
                  />
                </div>
                {tasks && tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="">
                          <Task
                            key={task.id}
                            task={task}
                            toggleShowTaskSlideOver={toggleShowTaskSlideOver}
                            deleteTask={deleteTask}
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Column;
