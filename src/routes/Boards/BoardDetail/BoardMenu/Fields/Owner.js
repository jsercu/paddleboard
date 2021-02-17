import React, { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ReactComponent as UserCircleIcon } from '../../../../../assets/img/icons/user-circle-24.svg';
import { ReactComponent as PencilIcon } from '../../../../../assets/img/icons/pencil-alt-20.svg';
import { ReactComponent as SelectorIcon } from '../../../../../assets/img/icons/selector-20.svg';
import { ReactComponent as CheckIcon } from '../../../../../assets/img/icons/check-20.svg';
import { firestore } from '../../../../../firebase';
import { Formik } from 'formik';
import Button, {
  ButtonColorTheme,
  ButtonSizeTheme,
  ButtonRoundedTheme,
} from '../../../../../components/Buttons/Button';

const Owner = ({ owner, participants, boardId }) => {
  const [editMode, setEditMode] = useState(false);
  const [participantsStore, setParticipantsStore] = useState([...participants]);

  useEffect(() => {
    setParticipantsStore([...participants]);
  }, [participants]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateBoardOwner = (newOwner) => {
    try {
      const newParticipants = [];
      participants.forEach((participant) => {
        const newParticipant = { ...participant };
        if (participant.userId === newOwner.userId) {
          newParticipant.isOwner = true;
        } else {
          newParticipant.isOwner = false;
        }
        newParticipants.push(newParticipant);
      });
      const boardRef = firestore.collection('boards').doc(boardId);
      boardRef.update({ participants: newParticipants });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  if (editMode) {
    return (
      <div className="relative flex px-4 py-2 mx-4 my-1 items-top">
        <UserCircleIcon className="flex-none w-5 h-5 text-gray-500" />
        <Formik
          initialValues={{ owner: owner }}
          onSubmit={(values, actions) => {
            updateBoardOwner(values.owner);
            toggleEditMode();
          }}>
          {(props) => (
            <form className="flex flex-col justify-between flex-grow h-full ml-2" onSubmit={props.handleSubmit}>
              <OwnerSelectInput
                name="owner"
                error={props.errors.owner}
                placeholderText="Select owner for this board"
                setFieldValue={props.setFieldValue}
                setFieldTouched={props.setFieldTouched}
                touched={props.touched.owner}
                value={props.values.owner}
                participants={participantsStore}
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
      <UserCircleIcon className="flex-none w-5 h-5 text-gray-500" />
      <PencilIcon className="absolute top-0 right-0 w-4 h-4 m-2 text-gray-400 text-opacity-0 group-hover:text-opacity-100" />
      <span className="inline-block ml-2 text-sm text-gray-600">
        Owned by
        <span className="ml-1 font-medium text-indigo-600">{owner.displayName}</span>
      </span>
    </div>
  );
};

const OwnerSelectInput = ({ error, placeholderText, setFieldValue, setFieldTouched, touched, value, participants }) => {
  const handleChange = (value) => {
    setFieldValue('owner', value);
  };

  const handleBlur = () => {
    setFieldTouched('owner', true);
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
                  <span className="block truncate">{value.displayName}</span>
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
                {participants.map((participant) => (
                  <Listbox.Option key={participant.userId} value={participant}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active ? 'text-white bg-indigo-600' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-8 pr-4`}>
                        <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                          {participant.displayName}
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

export default Owner;
