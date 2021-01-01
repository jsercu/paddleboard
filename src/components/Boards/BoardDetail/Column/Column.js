import React, { useState, useEffect } from 'react';
import { firestore } from '../../../../firebase';
import Task from '../Task/Task';
import ColumnDropdown from './ColumnDropdown';
import { useParams } from 'react-router-dom';

const Column = ({ id: columnId, deleteColumn, deleteTask }) => {
  let { boardId } = useParams();
  const [column, setColumn] = useState();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('boards')
      .doc(boardId)
      .collection('columns')
      .doc(columnId)
      .onSnapshot((doc) => {
        const newColumn = doc.data();
        setColumn(newColumn);
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
        setTasks(newTasks);
        setIsLoading(false);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <></>;
  }

  if (column) {
    return (
      <div className="flex bg-gray-100 rounded-sm shadow-xl h-96">
        <div className="w-full p-4">
          <div className="flex items-center justify-between">
            <h3 className="mb-1 text-sm font-medium text-gray-600 leading-6">{column.name}</h3>
            <ColumnDropdown id={columnId} deleteColumn={deleteColumn} />
          </div>
          {!!tasks && tasks.length > 0 ? (
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
    );
  }

  return <></>;
};

export default Column;
