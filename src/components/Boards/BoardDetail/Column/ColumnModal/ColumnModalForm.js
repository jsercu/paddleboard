import React from 'react';
import Button from '../../../../../common/Buttons/Button';
import IconButton from '../../../../../common/Buttons/IconButton';
import Input from '../../../../../common/Inputs/Input';
import { ReactComponent as XIcon } from '../../../../../assets/img/icons/x-24.svg';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const ColumnForm = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, editMode, toggleShowColumnModal } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white">
        <div className="text-left sm:mt-0">
          <div className="flex justify-between px-10 pt-8">
            <h3 className="text-xl font-medium tracking-tight text-gray-800 leading-6">
              {editMode ? 'Edit Column' : 'Create New Column'}
            </h3>
            <IconButton backgroundType="white" size="small" action={toggleShowColumnModal}>
              <XIcon />
            </IconButton>
          </div>
          <div className="px-10 pt-6 pb-8 text-left">
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
                  value={values.name}
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
          </div>
        </div>
      </div>
      <div className="px-4 py-4 bg-gray-100 space-x-2 space-x-reverse sm:px-10 sm:flex sm:flex-row-reverse">
        <Button text={editMode ? 'Save Changes' : 'Create Column'} type="submit" color="primary" size="small"></Button>
        <Button text="Cancel" type="button" color="tertiary" size="small" action={toggleShowColumnModal}></Button>
      </div>
    </form>
  );
};

const ColumnModalForm = withFormik({
  mapPropsToValues: (props) => ({
    name: props.initialValues.name,
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('This field is required.'),
  }),
  validateOnBlur: false,
  validateOnChange: true,

  handleSubmit: (values, FormikBag) => {
    const { name } = values;
    const { id: columnId } = FormikBag.props.initialValues;
    const columnFormValues = {
      name: name,
    };
    if (FormikBag.props.editMode) {
      FormikBag.props.updateColumn(columnFormValues, columnId);
    } else {
      FormikBag.props.addColumn(columnFormValues);
    }

    FormikBag.setSubmitting(false);
    FormikBag.props.toggleShowColumnModal();
  },
})(ColumnForm);

export default ColumnModalForm;
