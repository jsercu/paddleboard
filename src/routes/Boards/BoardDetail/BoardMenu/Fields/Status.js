import React, { useState } from 'react';
import { STATUSES } from '../../../../../components/Status/Status';
import { Listbox, Transition } from '@headlessui/react';
import { ReactComponent as StatusIcon } from '../../../../../assets/icons/status-online-24.svg';
import { ReactComponent as PencilIcon } from '../../../../../assets/icons/pencil-alt-20.svg';
import { ReactComponent as SelectorIcon } from '../../../../../assets/icons/selector-20.svg';
import { ReactComponent as CheckIcon } from '../../../../../assets/icons/check-20.svg';
import { firestore } from '../../../../../firebase';
import { Formik } from 'formik';
import Button, {
  ButtonColorTheme,
  ButtonSizeTheme,
  ButtonRoundedTheme,
} from '../../../../../components/Buttons/Button';

const Status = ({ status, boardId }) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateBoardStatus = (status) => {
    try {
      const boardRef = firestore.collection('boards').doc(boardId);
      boardRef.update({ status: status });
    } catch (exception) {
      console.error(exception);
    }
  };

  if (editMode) {
    return (
      <div className="relative flex px-4 py-2 mx-4 my-1 items-top">
        <StatusIcon className="flex-none w-5 h-5 text-gray-500" />
        <Formik
          initialValues={{ status: status }}
          onSubmit={(values) => {
            updateBoardStatus(values.status);
            toggleEditMode();
          }}>
          {(props) => (
            <form className="flex flex-col justify-between flex-grow h-full ml-2" onSubmit={props.handleSubmit}>
              <StatusSelectInput
                name="status"
                error={props.errors.status}
                placeholderText="Select status for this board"
                setFieldValue={props.setFieldValue}
                setFieldTouched={props.setFieldTouched}
                touched={props.touched.status}
                value={props.values.status}
              />
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
      className="relative flex px-4 py-2 mx-4 my-1 rounded-sm cursor-pointer group hover:bg-gray-200 hover:bg-opacity-50 items-top"
      onClick={toggleEditMode}>
      <StatusIcon className="flex-none w-5 h-5 text-gray-500" />
      <PencilIcon className="absolute top-0 right-0 w-4 h-4 m-2 text-gray-400 text-opacity-0 group-hover:text-opacity-100" />
      <span className="ml-2 text-sm text-gray-600">{STATUSES[status].title}</span>
    </div>
  );
};

const StatusSelectInput = ({ error, placeholderText, setFieldValue, setFieldTouched, touched, value }) => {
  const statuses = ['Not Started', 'Active', 'Paused', 'Completed', 'Closed'];

  const handleChange = (value) => {
    setFieldValue('status', value);
  };

  const handleBlur = () => {
    setFieldTouched('status', true);
  };

  return (
    <Listbox as="div" value={value} onChange={handleChange} onBlur={handleBlur}>
      {({ open }) => (
        <>
          <div className="relative">
            <span className="z-40 inline-block w-full mt-1 rounded-sm shadow-sm">
              <Listbox.Button
                className={`${
                  error && touched
                    ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-indigo-500'
                } relative bg-white w-full py-2 pl-3 pr-10 text-left border rounded-sm cursor-default focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-5`}>
                {value ? (
                  <span className="block truncate">{STATUSES[value].title}</span>
                ) : (
                  <span className="block text-gray-400 truncate">{placeholderText || 'None Selected'}</span>
                )}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="w-5 h-5 text-gray-400" />
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute z-50 w-full mt-1 bg-white shadow-lg rounded-md">
              <Listbox.Options
                static
                className="py-1 overflow-auto text-base max-h-60 rounded-md leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
                {Object.keys(STATUSES).map((status) => (
                  <Listbox.Option key={STATUSES[status].key} value={STATUSES[status].key}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active ? 'text-white bg-indigo-600' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-8 pr-4`}>
                        <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                          {STATUSES[status].title}
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-indigo-600'
                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}>
                            <CheckIcon className="w-5 h-5" />
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Status;
