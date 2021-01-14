import React, { useState, useEffect } from 'react';
import firebase, { firestore } from '../../../../../firebase';
import { useAuth } from '../../../../../hooks/useAuth';
import SlideOver from '../../../../../common/Modals/SlideOver';
import Input from '../../../../../common/Inputs/Input';
import TextArea from '../../../../../common/Inputs/TextArea';
import SelectInput from '../../../../../common/Inputs/SelectInput';
import Button from '../../../../../common/Buttons/Button';
import { useParams } from 'react-router-dom';
import CreateTaskSlideOverForm from './CreateTaskSlideOverForm';

const CreateTaskSlideOver = ({ toggleShowCreateTaskSlideOver, addTask, columnId }) => {
  let { boardId } = useParams();
  let auth = useAuth();
  const [columns, setColumns] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore.collection(`boards/${boardId}/columns`).onSnapshot((snapshot) => {
      const newColumns = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setColumns(newColumns);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    // Hardcoded ColumnName to random selection of ['Backlog', 'In Progress', 'Completed']
    // TODO: FIX once select column SelectInput is working again...
    const columns = ['Backlog', 'In Progress', 'Completed'];
    const columnName = columns[Math.floor(Math.random() * columns.length)];

    const { name, description } = values;
    const taskColumnId = lookupColumnId(columnName);
    const taskValues = {
      name: name,
      description: description,
      columnId: taskColumnId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      author: auth.user.displayName,
      authorId: auth.user.uid,
      deleteStatus: false,
    };
    addTask(taskValues);
    toggleShowCreateTaskSlideOver();
  };

  const lookupColumnId = (columnName) => {
    let matchedColumn = columns.find((column) => column.name === columnName);
    return matchedColumn.id;
  };

  const lookupColumnName = (columnId) => {
    let matchedColumn = columns.find((column) => column.id === columnId);
    return matchedColumn.name;
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <SlideOver
      panelTitle="Create Task"
      panelSecondaryText="Get started by filling in the information below to create your new task."
      toggleShowSlideOver={toggleShowCreateTaskSlideOver}>
      <CreateTaskSlideOverForm
        toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver}
        handleSubmit={handleSubmit}
        addTask={addTask}
        columnId={columnId}
      />
    </SlideOver>
  );
};

export default CreateTaskSlideOver;
