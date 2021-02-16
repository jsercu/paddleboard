import React, { useState, useEffect, useRef } from 'react';
import { firestore } from '../../../../../firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as PencilIcon } from '../../../../../assets/img/icons/pencil-alt-20.svg';
import Button, {
  ButtonColorTheme,
  ButtonRoundedTheme,
  ButtonSizeTheme,
} from '../../../../../components/Buttons/Button';

const Name = ({ name, boardId, toggleShowBackdrop }) => {
  const [editMode, setEditMode] = useState(false);
  const nameInput = useRef(null);

  useEffect(() => {
    if (editMode) {
      nameInput.current.focus();
    }
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required.'),
  });

  const showFieldLightbox = () => {
    toggleShowBackdrop();
    nameInput.current.focus();
  };

  const clearFieldLightbox = () => {};

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateBoardName = (name) => {
    try {
      const boardRef = firestore.collection('boards').doc(boardId);
      boardRef.update({ name: name });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  if (editMode) {
    return (
      <div className="relative flex px-2 mx-4 items-top">
        <Formik
          initialValues={{ name: name }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            updateBoardName(values.name);
            toggleEditMode();
          }}>
          {(props) => (
            <form className="flex flex-col justify-between flex-grow h-full" onSubmit={props.handleSubmit}>
              <input
                ref={nameInput}
                className={`${
                  props.errors.name && props.touched.name
                    ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-indigo-500'
                } flex w-full p-2 text-2xl font-bold text-gray-800 bg-white border rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2`}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />
              {props.errors.name && props.touched.name && (
                <div id="error-container" className="h-3 mt-2">
                  <div id="feedback" className="text-xs text-red-700">
                    {props.errors.name}
                  </div>
                </div>
              )}
              <div className="flex mt-3 space-x-2">
                <Button
                  type="submit"
                  color={ButtonColorTheme.primary}
                  size={ButtonSizeTheme.tiny}
                  rounded={ButtonRoundedTheme.small}
                  text="Save Changes"
                />
                <Button
                  type="button"
                  color={ButtonColorTheme.tertiary}
                  size={ButtonSizeTheme.tiny}
                  rounded={ButtonRoundedTheme.small}
                  text="Cancel"
                  action={toggleEditMode}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <div
      className="relative flex px-4 py-2 mx-4 border border-transparent rounded-sm cursor-pointer group hover:bg-gray-200 hover:bg-opacity-50 items-top"
      onClick={toggleEditMode}>
      <h4 className="text-2xl font-bold text-gray-800">{name}</h4>
      <PencilIcon className="absolute top-0 right-0 w-4 h-4 m-2 text-gray-400 text-opacity-0 group-hover:text-opacity-100" />
    </div>
  );
};

export default Name;
