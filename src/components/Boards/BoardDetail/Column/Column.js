import React, { useState, useEffect } from 'react';
import { firestore } from '../../../../firebase';
import Task from '../Task/Task';
import CreateTaskSlideOver from '../Task/CreateTaskSlideOver';
import ColumnDropdown from './ColumnDropdown';
import { useParams } from 'react-router-dom';

const Column = ({ id: columnId, deleteColumn, addTask, deleteTask }) => {
  let { boardId } = useParams();
  const [column, setColumn] = useState();
  const [taskIds, setTaskIds] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowCreateTaskSlideOver, setIsShowCreateTaskSlideOver] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('boards')
      .doc(boardId)
      .collection('columns')
      .doc(columnId)
      .onSnapshot((doc) => {
        const newColumn = doc.data();
        setColumn(newColumn);
        setTaskIds(newColumn ? newColumn.taskIds : []);
        setIsLoading(false);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('tasks')
      .where('boardId', '==', boardId)
      .where('columnId', '==', columnId)
      .onSnapshot((snapshot) => {
        const newTasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (!column && !!column.taskIds.length) return;
        const sortedTasks = [];
        column.taskIds.forEach((taskId) => {
          const matchedTask = newTasks.find((task) => task.id === taskId);
          sortedTasks.push(matchedTask);
        });
        setTasks(sortedTasks);
      });
    return () => {
      unsubscribe();
    };
  }, [taskIds]);

  const toggleShowCreateTaskSlideOver = () => setIsShowCreateTaskSlideOver(!isShowCreateTaskSlideOver);

  if (isLoading) {
    return <></>;
  }

  if (column) {
    return (
      <>
        <div className="flex bg-gray-100 rounded-sm shadow-xl" style={{ minHeight: '33vh' }}>
          <div className="w-full p-4">
            <div className="flex items-center justify-between">
              <h3 className="mb-1 text-sm font-medium text-gray-600 leading-6">{column.name}</h3>
              <ColumnDropdown
                id={columnId}
                deleteColumn={deleteColumn}
                toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver}
              />
            </div>
            {tasks && tasks.length > 0 ? (
              tasks.map(({ name, id, description }) => (
                <Task
                  key={id}
                  name={name}
                  id={id}
                  description={description}
                  deleteTask={deleteTask}
                  columnId={columnId}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        {!!isShowCreateTaskSlideOver && (
          <CreateTaskSlideOver
            toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver}
            addTask={addTask}
            columnId={columnId}
          />
        )}
      </>
    );
  }

  return <></>;
};

export default Column;
