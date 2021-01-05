import React, { useState, useEffect } from 'react';
import firebase, { firestore } from '../../../../firebase';
import { useAuth } from '../../../../hooks/useAuth';
import SlideOver from '../../../../common/Modals/SlideOver';
import Input from '../../../../common/Inputs/Input';
import TextArea from '../../../../common/Inputs/TextArea';
import SelectInput from '../../../../common/Inputs/SelectInput';
import Button from '../../../../common/Buttons/Button';
import { useParams } from 'react-router-dom';

const CreateTaskSlideOver = ({ toggleShowCreateTaskSlideOver, addTask, columnId }) => {
  let { boardId } = useParams();
  let auth = useAuth();
  const [values, setValues] = useState({
    name: '',
    description: '',
    columnName: '',
  });
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSelectInputChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const { name, description, columnName } = values;
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

  // const participants = [
  //   { name: 'Wade Cooper' },
  //   { name: 'Stephen Hynes' },
  //   { name: 'Angela Lee' },
  //   { name: 'Clark Hynik' },
  // ];

  // const categories = ['Feature Request', 'Product Documentation', 'Design', 'Backend'];

  if (isLoading) {
    return <></>;
  }

  return (
    <SlideOver
      panelTitle="Create Task"
      panelSecondaryText="Get started by filling in the information below to create your new task."
      toggleShowSlideOver={toggleShowCreateTaskSlideOver}>
      <form className="flex flex-col h-full space-y-6" onSubmit={handleSubmit}>
        <div>
          <Input
            labelText="Name"
            ariaLabel="Name"
            name="name"
            value={values.name}
            type="text"
            isRequired
            color="white"
            changeHandler={handleInputChange}
            inputStyle="fullWidth"
          />
        </div>
        <div>
          <TextArea
            labelText="Description"
            ariaLabel="Description"
            name="description"
            value={values.description}
            rows="5"
            color="white"
            changeHandler={handleInputChange}
            inputStyle="fullWidth"
          />
        </div>
        {/* <SelectInput
          name="assignedTo"
          labelText="Assigned To"
          options={participants}
          handleSelectInputChange={handleSelectInputChange}
        />
        <SelectInput
          name="category"
          labelText="Category"
          options={categories}
          handleSelectInputChange={handleSelectInputChange}
        /> */}
        <SelectInput
          name="columnName"
          labelText="Column"
          options={columns}
          initialValue={columnId ? lookupColumnName(columnId) : null}
          handleSelectInputChange={handleSelectInputChange}
        />
        <div className="flex flex-row-reverse space-x-4 space-x-reverse">
          <Button type="submit" color="primary" size="medium" text="Create Task" />
          <Button type="button" action={toggleShowCreateTaskSlideOver} color="tertiary" size="medium" text="Cancel" />
        </div>
      </form>
    </SlideOver>
  );
};

export default CreateTaskSlideOver;
