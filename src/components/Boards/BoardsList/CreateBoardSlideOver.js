import React, { useState } from 'react';
import SlideOver from '../../../common/Modals/SlideOver';
import Button from '../../../common/Buttons/Button';
import Input from '../../../common/Inputs/Input';
import TextArea from '../../../common/Inputs/TextArea';

const CreateBoardSlideOver = ({ toggleShowCreateBoard, addBoard }) => {
  const [values, setValues] = useState({ name: '', description: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const { name, description } = values;
    let board = {
      name: name,
      description: description,
    };
    addBoard(board);
    setValues({ name: '', description: '' });
  };

  return (
    <SlideOver
      panelTitle={'Create New Board'}
      panelSecondaryText={'Get started by filling in the information below to create your new board.'}
      toggleShowPanel={toggleShowCreateBoard}>
      <form className={`h-full flex flex-col space-y-6`} onSubmit={handleSubmit}>
        <div>
          <Input
            labelText="Name"
            ariaLabel="Name"
            name="name"
            value={values.name}
            type="text"
            isRequired
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
            changeHandler={handleInputChange}
            inputStyle="fullWidth"
          />
        </div>
        <div className={`flex flex-row-reverse space-x-4 space-x-reverse`}>
          <Button type="submit" color="primary" size="medium" text="Create Board" />
          <Button type="button" action={toggleShowCreateBoard} color="tertiary" size="medium" text="Cancel" />
        </div>
      </form>
    </SlideOver>
  );
};

export default CreateBoardSlideOver;
