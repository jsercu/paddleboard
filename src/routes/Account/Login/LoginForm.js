import React from 'react';
import { withFormik } from 'formik';
import { object as YupObject, string as YupString } from 'yup';
import Button, { ButtonColorTheme, ButtonSizeTheme, ButtonRoundedTheme } from '../../../components/Buttons/Button';
import { ReactComponent as LockIcon } from '../../../assets/img/icons/lock-20.svg';

const LoginForm = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
  const { email, password } = values;

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1">
        <div>
          <label htmlFor="email" className="block">
            <span className="block text-sm font-medium text-gray-700 leading-5">Email:</span>
            <input
              className={`${
                errors.email && touched.email
                  ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-indigo-500'
              } bg-white block w-full mt-1 text-sm rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2`}
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={email}
              name="email"
            />
          </label>
          <div id="error-container" className="h-5 mt-2">
            {errors.email && touched.email && (
              <div id="feedback" className="text-xs text-red-700">
                {errors.email}
              </div>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block">
            <span className="block text-sm font-medium text-gray-700 leading-5">Password</span>
            <input
              className={`${
                errors.password && touched.password
                  ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-indigo-500'
              } bg-white block w-full mt-1 text-sm rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2`}
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={password}
              name="password"
            />
          </label>
          <div id="error-container" className="h-5 mt-2">
            {errors.password && touched.password && (
              <div id="feedback" className="text-xs text-red-700">
                {errors.password}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Button
          text="Sign In"
          type="submit"
          color={ButtonColorTheme.primary}
          size={ButtonSizeTheme.medium}
          rounded={ButtonRoundedTheme.tiny}
          fullWidth
          hasIcon>
          <LockIcon
            className="w-5 h-5 text-indigo-500 group-hover:text-indigo-500 transition ease-in-out duration-150"
            title="lock-icon"
          />
        </Button>
      </div>
    </form>
  );
};

const LoginFormExtended = withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validationSchema: YupObject().shape({
    email: YupString().email('Please enter a valid email.').required('This field is required.'),
    password: YupString().required('This field is required.'),
  }),
  validateOnBlur: false,
  validateOnChange: true,

  handleSubmit: (values, FormikBag) => {
    const { email, password } = values;
    FormikBag.props.loginWithEmailAndPassword(email, password);
    FormikBag.setSubmitting(false);
  },
})(LoginForm);

export { LoginFormExtended as LoginForm };
