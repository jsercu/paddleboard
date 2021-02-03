import React, { useEffect, useState, useRef } from 'react';
import { firestore } from '../../../../../firebase';
import { ReactComponent as NewspaperIcon } from '../../../../../assets/img/icons/newspaper-24.svg';
import { ReactComponent as PencilIcon } from '../../../../../assets/img/icons/pencil-alt-20.svg';
import { Formik } from 'formik';
import Button from '../../../../../common/Buttons/Button';

const Description = ({ description, boardId }) => {
  const [editMode, setEditMode] = useState(false);
  const descriptionTextArea = useRef(null);

  useEffect(() => {
    if (editMode) {
      descriptionTextArea.current.focus();
    }
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateBoardDescription = (description) => {
    try {
      const boardRef = firestore.collection('boards').doc(boardId);
      boardRef.update({ description: description });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  if (editMode) {
    return (
      <div className="relative flex px-4 py-2 mx-4 my-1 items-top">
        <NewspaperIcon className="flex-none w-5 h-5 text-gray-500" />
        <Formik
          initialValues={{ description: description }}
          onSubmit={(values, actions) => {
            updateBoardDescription(values.description);
            toggleEditMode();
          }}>
          {(props) => (
            <form className="flex flex-col justify-between flex-grow h-full ml-2" onSubmit={props.handleSubmit}>
              <textarea
                ref={descriptionTextArea}
                className="flex w-full text-sm bg-white border-gray-300 rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                rows="8"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
                name="description"
              />
              <div className="flex mt-3 space-x-4">
                <Button type="submit" color="primary" size="small" text="Save Changes" />
                <Button type="button" color="tertiary" size="small" text="Cancel" action={toggleEditMode} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <div
      className="relative flex px-4 py-2 mx-4 my-1 rounded-sm cursor-pointer group hover:bg-gray-100 items-top"
      onClick={toggleEditMode}>
      <NewspaperIcon className="flex-none w-5 h-5 text-gray-500" />
      <PencilIcon className="absolute top-0 right-0 w-4 h-4 m-2 text-gray-500 text-opacity-0 group-hover:text-opacity-100" />
      <span className="ml-2 text-sm text-gray-600">{description}</span>
    </div>
  );
};

export default Description;
