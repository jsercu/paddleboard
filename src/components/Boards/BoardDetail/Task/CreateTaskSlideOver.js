import React, { useState } from 'react';
import SlideOver from '../../../../common/Modals/SlideOver';
import Input from '../../../../common/Inputs/Input';
import TextArea from '../../../../common/Inputs/TextArea';
import SelectInput from '../../../../common/Inputs/SelectInput';
import Button from '../../../../common/Buttons/Button';

const CreateTaskSlideOver = ({ toggleShowCreateTaskSlideOver }) => {
  const [values, setValues] = useState({ name: '', description: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const participants = [
    'Wade Cooper',
    'Arlene Mccoy',
    'Devon Webb',
    'Tom Cook',
    'Tanya Fox',
    'Hellen Schmidt',
    'Caroline Schultz',
    'Mason Heaney',
    'Claudie Smitham',
    'Emil Schaefer',
  ];

  const categories = ['Feature Request', 'Product Documentation', 'Design', 'Backend'];

  const columns = ['Backlog', 'In Progress', 'Completed'];

  return (
    <SlideOver
      panelTitle="Create Task"
      panelSecondaryText="Get started by filling in the information below to create your new task."
      toggleShowSlideOver={toggleShowCreateTaskSlideOver}>
      <form className={`h-full flex flex-col space-y-6`}>
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
        <SelectInput labelText="Assigned To" options={participants} />
        <SelectInput labelText="Category" options={categories} />
        <SelectInput labelText="Column" options={columns} />
        <div className={`flex flex-row-reverse space-x-4 space-x-reverse`}>
          <Button type="submit" color="primary" size="medium" text="Create Task" />
          <Button type="button" action={toggleShowCreateTaskSlideOver} color="tertiary" size="medium" text="Cancel" />
        </div>
      </form>
    </SlideOver>
  );
};

export default CreateTaskSlideOver;
