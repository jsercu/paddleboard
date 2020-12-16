import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import Button from '../../common/Buttons/Button';
import Input from '../../common/Inputs/Input';
import Logo from '../../common/Logo';

import { ReactComponent as LockIcon } from '../../assets/img/icons/lock.svg';
import { ReactComponent as GoogleIcon } from '../../assets/img/icons/google-icon.svg';

const Login = ({ history, ...props }) => {
  const auth = useAuth();
  const [values, setValues] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleGoogleLogin = useCallback(async (event) => {
    event.preventDefault();
    try {
      await auth.signinWithGoogle();
      history.push('/');
    } catch (error) {
      alert(error);
    }
  });

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = values;
      try {
        await auth.signin(email, password);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history, values],
  );

  return (
    <div className={`flex min-h-screen justify-center sm:items-center bg-gray-50 px-6 sm:px-6 lg:px-8 py-24`}>
      <div className={`max-w-lg w-full mx-auto`}>
        <Logo size="large" color="gray" />
        <h2 className={`mt-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider`}>
          Sign In to your Account
        </h2>
        <form className={`mt-4`} onSubmit={handleLogin}>
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
            <Button text="Sign In" type="submit" color="primary" fullWidth hasIcon rounded="small">
              <LockIcon
                className={`h-5 w-5 text-blue-500 group-hover:text-blue-500 transition ease-in-out duration-150`}
                title="lock-icon"
              />
            </Button>
          </div>
        </form>
        <div className={`py-4 mt-3 mb-1`}>
          <div className={`w-full border-b border-gray-300`}></div>
          <div className={`text-center -mt-3`}>
            <span className={`px-6 bg-gray-50 text-sm font-light text-gray-500`}>Or continue with</span>
          </div>
        </div>
        <div className={`flex`}>
          <Button
            text="Sign In Using Google"
            type="button"
            action={handleGoogleLogin}
            color="tertiary"
            fullWidth
            hasIcon
            rounded="small">
            <GoogleIcon className={`h-5 w-5 ml-1`} title="google-icon" />
          </Button>
        </div>
        <div className={`py-8`}>
          <div className="flex flex-row justify-center space-x-4">
            <Link to="/register" className={`font-medium text-sm text-blue-600 hover:text-blue-500`}>
              Sign up for an account
            </Link>
            <Link to="/" className={`font-medium text-sm text-blue-600 hover:text-blue-500`}>
              Password Reset
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
