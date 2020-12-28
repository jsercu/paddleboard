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
    <div className={`flex min-h-screen justify-center sm:items-center bg-gray-100 px-6 sm:px-6 lg:px-8 py-24`}>
      <div className={`max-w-lg w-full`}>
        <Logo size="large" color="gray" />
        <h2 className={`mt-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider`}>
          Create New Account
        </h2>
        <form className={`mt-4`} onSubmit={handleSignUp}>
          <div className={`grid grid-cols-1 gap-4`}>
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
          <div className={`mt-8`}>
            <Button text="Sign Up" type="submit" color="primary" fullWidth hasIcon rounded="small">
              <LockIcon
                className={`h-5 w-5 text-pink-500 group-hover:text-pink-500 transition ease-in-out duration-150`}
                title="lock-icon"
              />
            </Button>
          </div>
        </form>
        <div className={`py-4 mt-3 mb-1`}>
          <div className={`w-full border-b border-gray-300`}></div>
          <div className={`text-center -mt-3`}>
            <span className={`px-6 bg-gray-100 text-sm font-light text-gray-500`}>Or continue with</span>
          </div>
        </div>
        <div className={`flex`}>
          <Button
            text="Sign Up Using Google"
            type="button"
            color="tertiary"
            fullWidth
            action={handleGoogleLogin}
            hasIcon
            rounded="small">
            <GoogleIcon className={`h-5 w-5 ml-1`} title="google-icon" />
          </Button>
        </div>
        <div className={`py-8`}>
          <div className="flex flex-row justify-center space-x-4">
            <Link to="/login" className={`font-medium text-sm text-pink-600 hover:text-pink-500`}>
              Already have an account?
            </Link>
            <Link to="/" className={`font-medium text-sm text-pink-600 hover:text-pink-500`}>
              Password Reset
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
