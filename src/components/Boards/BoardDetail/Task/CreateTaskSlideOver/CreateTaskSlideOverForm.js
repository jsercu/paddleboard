import React, { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { firestore } from '../../../../../firebase';
import { useParams } from 'react-router-dom';
import { withFormik } from 'formik';
import Button from '../../../../../common/Buttons/Button';
import { ReactComponent as SelectorIcon } from '../../../../../assets/img/icons/selector-20.svg';
import { ReactComponent as CheckIcon } from '../../../../../assets/img/icons/check-20.svg';

import * as Yup from 'yup';

const CreateTaskForm = (props) => {
  let { boardId } = useParams();
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    editMode,
    toggleShowTaskSlideOver,
    columnId,
  } = props;
  const { name, description, column } = values;

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

  if (isLoading) {
    return <></>;
  }

  return (
    <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
      <div className="px-4 sm:px-6">
        <div>
          <label htmlFor="name" className="block">
            <span className="block text-sm font-medium text-gray-700 leading-5">Name</span>
            <input
              className={`${
                errors.name && touched.name
                  ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-indigo-500'
              } bg-gray-50 block w-full mt-1 text-sm rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2`}
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={name}
              name="name"
            />
          </label>
          <div id="error-container" className="h-5 mt-2">
            {errors.name && touched.name && (
              <div id="feedback" className="text-xs text-red-700">
                {errors.name}
              </div>
            )}
          </div>
        </div>
        <div className="mt-1">
          <label htmlFor="name" className="block">
            <span className="block text-sm font-medium text-gray-700 leading-5">Description</span>
            <textarea
              className="block w-full mt-1 text-sm border-gray-300 rounded-sm bg-gray-50 shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              rows="5"
              onChange={handleChange}
              onBlur={handleBlur}
              value={description}
              name="description"
            />
          </label>
          <div id="error-container" className="h-5 mt-2">
            {errors.description && touched.description && (
              <div id="feedback" className="text-xs text-red-700">
                {errors.description}
              </div>
            )}
          </div>
        </div>
        <div className="mt-1">
          <ColumnSelectInput
            name="column"
            labelText="Column"
            columns={columns}
            columnId={columnId}
            value={column}
            placeholderText="Select column to add task to..."
            error={errors.column}
            touched={touched.column}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
          <div id="error-container" className="h-5 mt-2">
            {errors.column && touched.column && (
              <div id="feedback" className="text-xs text-red-700">
                {errors.column.id}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex px-4 py-4 border-t border-gray-200 bg-gray-50 b sm:px-6 space-x-4">
        <Button type="submit" color="primary" size="medium-wide" text={editMode ? 'Update Task' : 'Create Task'} />
        <Button type="button" action={toggleShowTaskSlideOver} color="tertiary" size="medium" text="Cancel" />
      </div>
    </form>
  );
};

const ColumnSelectInput = ({
  labelText,
  placeholderText,
  columns,
  columnId,
  value,
  error,
  touched,
  setFieldValue,
  setFieldTouched,
}) => {
  useEffect(() => {
    if (!!columnId) {
      const column = columns.find((column) => column.id === columnId);
      setFieldValue('column', column);
    }
  }, []);

  const handleChange = (value) => {
    setFieldValue('column', value);
  };

  const handleBlur = () => {
    setFieldTouched('column', true);
  };

  return (
    <Listbox as="div" value={value} onChange={handleChange} onBlur={handleBlur}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700 leading-5">{labelText}:</Listbox.Label>
          <div className="relative">
            <span className="z-40 inline-block w-full mt-1 rounded-sm shadow-sm">
              <Listbox.Button
                className={`${
                  error && touched
                    ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-indigo-500'
                } relative bg-gray-50 w-full py-2 pl-3 pr-10 text-left border rounded-sm cursor-default focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-5`}>
                {value ? (
                  <span className="block truncate">{value.name}</span>
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
                {columns.map((column) => (
                  <Listbox.Option key={column.id} value={column}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active ? 'text-white bg-indigo-600' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-8 pr-4`}>
                        <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                          {column.name}
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

const CreateTaskSlideOverForm = withFormik({
  mapPropsToValues: (props) => ({
    name: props.initialValues.name,
    description: props.initialValues.description,
    column: props.initialValues.column,
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('This field is required.'),
    column: Yup.object().shape({
      id: Yup.string().required('This field is required.'),
    }),
  }),
  validateOnBlur: false,
  validateOnChange: false,

  handleSubmit: (values, FormikBag) => {
    const { name, description, column } = values;
    const { id: taskId, columnId } = FormikBag.props.initialValues;
    const taskFormValues = {
      name: name,
      description: description,
      columnId: column.id,
    };
    if (FormikBag.props.editMode) {
      FormikBag.props.updateTask(taskFormValues, taskId, columnId);
    } else {
      FormikBag.props.addTask(taskFormValues);
    }

    FormikBag.setSubmitting(false);
    FormikBag.props.toggleShowTaskSlideOver();
  },
})(CreateTaskForm);

export default CreateTaskSlideOverForm;
