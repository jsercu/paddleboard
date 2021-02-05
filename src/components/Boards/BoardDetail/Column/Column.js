import React, { useState, useEffect } from 'react';
import Task from '../Task/Task';
import ColumnDropdown from './ColumnDropdown';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ columnValues, deleteColumn, deleteTask, tasks, toggleShowColumnModal, toggleShowTaskSlideOver }) => {
  const getTaskListStyle = () => {};

  return (
    <>
      <Droppable droppableId={columnValues.id} direction="vertical" type="task">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              getTaskListStyle(snapshot.isDraggingOver) + ' flex-col h-full bg-gray-100 border-l border-gray-200'
            }>
            <div className="flex">
              <div className="w-full p-2">
                <div className="flex items-center justify-between px-2 pt-2">
                  <h3 className="mb-1 text-sm font-medium text-gray-600 leading-6">{columnValues.name}</h3>
                  <ColumnDropdown
                    columnValues={columnValues}
                    deleteColumn={deleteColumn}
                    toggleShowColumnModal={toggleShowColumnModal}
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Column;
