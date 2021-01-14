import React, { useState, useEffect } from 'react';
import Task from '../Task/Task';
import CreateTaskSlideOver from '../Task/CreateTaskSlideOver/CreateTaskSlideOver';
import ColumnDropdown from './ColumnDropdown';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ columnValues, tasks, deleteColumn, addTask, deleteTask }) => {
  const [isShowCreateTaskSlideOver, setIsShowCreateTaskSlideOver] = useState(false);

  const getTaskListStyle = () => {};

  const toggleShowCreateTaskSlideOver = () => setIsShowCreateTaskSlideOver(!isShowCreateTaskSlideOver);

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
                    id={columnValues.id}
                    deleteColumn={deleteColumn}
                    toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver}
                  />
                </div>
                {tasks && tasks.length > 0 ? (
                  tasks.map(({ name, id, description }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="">
                          <Task
                            key={id}
                            name={name}
                            id={id}
                            columnId={columnValues.id}
                            description={description}
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
      {!!isShowCreateTaskSlideOver && (
        <CreateTaskSlideOver
          toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver}
          addTask={addTask}
          columnId={columnValues.id}
        />
      )}
    </>
  );
};

export default Column;
