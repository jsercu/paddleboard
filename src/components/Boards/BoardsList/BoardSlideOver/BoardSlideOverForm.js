import React, { useState } from 'react';
import Button from '../../../../common/Buttons/Button';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const BoardSlideOverForm = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, toggleShowBoardSlideOver } = props;
  const { name, description } = values;

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
              rows="10"
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
      </div>
      <div className="flex px-4 py-4 border-t border-gray-200 bg-gray-50 b sm:px-6 space-x-4">
        <Button type="submit" color="primary" size="medium-wide" text="Create Board" />
        <Button type="button" action={toggleShowBoardSlideOver} color="tertiary" size="medium" text="Cancel" />
      </div>
    </form>
  );
};

const BoardSlideOverFormExtended = withFormik({
  mapPropsToValues: () => ({
    name: '',
    description: '',
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('This field is required.'),
  }),
  validateOnBlur: false,
  validateOnChange: false,

  handleSubmit: (values, FormikBag) => {
    const { name, description } = values;
    const boardValues = {
      name: name,
      description: description,
    };
    FormikBag.props.addBoard(boardValues);
    FormikBag.setSubmitting(false);
    FormikBag.props.toggleShowBoardSlideOver();
  },
})(BoardSlideOverForm);

export { BoardSlideOverFormExtended as BoardSlideOverForm };
