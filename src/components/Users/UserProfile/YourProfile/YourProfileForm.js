import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../../../common/Buttons/Button';

const YourProfileForm = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
  const { displayName, photoURL, title, company, location, bio } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-12 pt-6 grid grid-cols-12">
        <div className="p-4 col-span-7 sm:px-0">
          <h3 className="text-lg font-medium text-gray-900 leading-6">Your Profile</h3>
          <p className="text-sm text-gray-500 leading-5">
            This information may be displayed publicly so be careful about what you share.
          </p>
        </div>
        <div className="py-6 text-right col-span-5 place-self-stretch">
          <Button text="Save Changes" type="submit" color="tertiary" size="medium"></Button>
        </div>
      </div>
      <div className="px-12 pb-12 mt-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <label htmlFor="name" className="block">
              <span className="block text-sm font-medium text-gray-700 leading-5">Display Name</span>
              <input
                className={`${
                  errors.displayName && touched.displayName
                    ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-indigo-500'
                } bg-gray-50 block w-full mt-1 text-sm rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={displayName}
                name="displayName"
              />
            </label>
            <div id="error-container" className="h-5 mt-2">
              {errors.displayName && touched.displayName && (
                <div id="feedback" className="text-xs text-red-700">
                  {errors.displayName}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <label htmlFor="description" className="block">
              <span className="block text-sm font-medium text-gray-700 leading-5">Title / Role</span>
              <input
                className={`${
                  errors.title && touched.title
                    ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-indigo-500'
                } bg-gray-50 block w-full mt-1 text-sm rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={title}
                name="title"
              />
            </label>
            <div id="error-container" className="h-5 mt-2">
              {errors.title && touched.title && (
                <div id="feedback" className="text-xs text-red-700">
                  {errors.title}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <label htmlFor="company" className="block">
              <span className="block text-sm font-medium text-gray-700 leading-5">Company / Organization</span>
              <input
                className={`${
                  errors.company && touched.company
                    ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-indigo-500'
                } bg-gray-50 block w-full mt-1 text-sm rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={company}
                name="company"
              />
            </label>
            <div id="error-container" className="h-5 mt-2">
              {errors.title && touched.title && (
                <div id="feedback" className="text-xs text-red-700">
                  {errors.title}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-6 gap-6">
          <div className="col-span-3">
            <label htmlFor="location" className="block">
              <span className="block text-sm font-medium text-gray-700 leading-5">Location</span>
              <input
                className={`${
                  errors.location && touched.location
                    ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-indigo-500'
                } bg-gray-50 block w-full mt-1 text-sm rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={location}
                name="location"
              />
            </label>
            <div id="error-container" className="h-5 mt-2">
              {errors.location && touched.location && (
                <div id="feedback" className="text-xs text-red-700">
                  {errors.locatio}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label htmlFor="bio" className="block">
              <span className="block text-sm font-medium text-gray-700 leading-5">Bio</span>
              <textarea
                className="block w-full mt-1 text-sm border-gray-300 rounded-sm bg-gray-50 shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                rows="5"
                onChange={handleChange}
                onBlur={handleBlur}
                value={bio}
                name="bio"
              />
            </label>
            <div id="error-container" className="h-5 mt-2">
              {errors.bio && touched.bio && (
                <div id="feedback" className="text-xs text-red-700">
                  {errors.bio}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const YourProfileFormExtended = withFormik({
  mapPropsToValues: (props) => ({
    displayName: props.initialValues.displayName || '',
    photoURL: props.initialValues.photoURL || null,
    title: props.initialValues.title || '',
    company: props.initialValues.company || '',
    location: props.initialValues.location || '',
    bio: props.initialValues.bio || '',
  }),
  validationSchema: Yup.object().shape({
    displayName: Yup.string().required('This field is required.'),
  }),
  validateOnBlur: true,
  validateOnChange: true,

  handleSubmit: (values, FormikBag) => {
    const { displayName, title, company, location, bio } = values;
    const userId = FormikBag.props.userId;
    const yourProfileFormValues = {
      displayName,
      title,
      company,
      location,
      bio,
    };
    FormikBag.props.updateUser(yourProfileFormValues, userId);
    FormikBag.props.toggleEditMode();
    FormikBag.setSubmitting(false);
  },
})(YourProfileForm);

export { YourProfileFormExtended as YourProfileForm };
