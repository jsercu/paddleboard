import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import Logo from '../../common/Logo';
import Button from '../../common/Buttons/Button';
import Input from '../../common/Inputs/Input';

import { ReactComponent as LockIcon } from '../../assets/img/icons/lock-20.svg';
import { ReactComponent as GoogleIcon } from '../../assets/img/icons/google-icon.svg';

const Register = ({ history }) => {
  const auth = useAuth();
  const [values, setValues] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = values;
      try {
        await auth.signup(email, password);
        history.push('/boards');
      } catch (err) {
        console.error(err.toString());
      }
    },
    [history, values],
  );

  const handleGoogleLogin = useCallback(async (event) => {
    event.preventDefault();
    try {
      await auth.signinWithGoogle();
      history.push('/boards');
    } catch (error) {
      alert(error);
    }
  });

  return (
    <div className="flex justify-center min-h-screen px-6 py-24 bg-gray-100 sm:items-center sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <Logo size="large" color="gray" />
        <h2 className="mt-4 text-sm font-semibold tracking-wider text-center text-gray-500 uppercase">
          Create New Account
        </h2>
        <form className="mt-4" onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 gap-4">
            <Input
              labelText="Email"
              ariaLabel="Email address"
              name="email"
              type="email"
              isRequired="true"
              changeHandler={handleInputChange}
              inputStyle="fullWidth"
            />
            <Input
              labelText="Password"
              ariaLabel="Password"
              name="password"
              type="password"
              isRequired="true"
              changeHandler={handleInputChange}
              inputStyle="fullWidth"
            />
          </div>
          <div className="mt-8">
            <Button text="Sign Up" type="submit" color="primary" fullWidth hasIcon rounded="small">
              <LockIcon
                className="w-5 h-5 text-purple-500 group-hover:text-purple-500 transition ease-in-out duration-150"
                title="lock-icon"
              />
            </Button>
          </div>
        </form>
        <div className="py-4 mt-3 mb-1">
          <div className="w-full border-b border-gray-300"></div>
          <div className="-mt-3 text-center">
            <span className="px-6 text-sm font-light text-gray-500 bg-gray-100">Or continue with</span>
          </div>
        </div>
        <div className="flex">
          <Button
            text="Sign Up Using Google"
            type="button"
            color="tertiary"
            fullWidth
            action={handleGoogleLogin}
            hasIcon
            rounded="small">
            <GoogleIcon className="w-5 h-5 ml-1" title="google-icon" />
          </Button>
        </div>
        <div className="py-8">
          <div className="flex flex-row justify-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-purple-700 hover:text-purple-600">
              Already have an account?
            </Link>
            <Link to="/" className="text-sm font-medium text-purple-700 hover:text-purple-600">
              Password Reset
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
