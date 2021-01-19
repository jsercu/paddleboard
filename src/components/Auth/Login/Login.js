import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../../common/Buttons/Button';
import Logo from '../../../common/Logo';
import { LoginForm } from './LoginForm';
import { ReactComponent as GoogleIcon } from '../../../assets/img/icons/google-icon.svg';

const Login = ({ history }) => {
  const auth = useAuth();

  const loginWithGoogle = async (event) => {
    if (event) event.preventDefault();
    try {
      await auth.signinWithGoogle();
      history.push('/boards');
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signin(email, password);
      history.push('/boards');
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  return (
    <div className="flex justify-center min-h-screen px-6 py-24 bg-gray-100 sm:items-center sm:px-6 lg:px-8">
      <div className="w-full max-w-lg mx-auto">
        <Logo size="large" color="gray" />
        <h2 className="mt-4 text-sm font-semibold tracking-wider text-center text-gray-500 uppercase">
          Sign In to your Account
        </h2>
        <LoginForm loginWithEmailAndPassword={loginWithEmailAndPassword} />
        <div className="py-4 mt-3 mb-1">
          <div className="w-full border-b border-gray-300"></div>
          <div className="-mt-3 text-center">
            <span className="px-6 text-sm font-light text-gray-500 bg-gray-100">Or continue with</span>
          </div>
        </div>
        <div className="flex">
          <Button
            text="Sign In Using Google"
            type="button"
            action={loginWithGoogle}
            color="tertiary"
            fullWidth
            hasIcon
            rounded="small">
            <GoogleIcon className="w-5 h-5 ml-1" title="google-icon" />
          </Button>
        </div>
        <div className="py-8">
          <div className="flex flex-row justify-center space-x-4">
            <Link to="/register" className="text-sm font-medium text-indigo-700 hover:text-indigo-600">
              Sign up for an account
            </Link>
            <Link to="/" className="text-sm font-medium text-indigo-700 hover:text-indigo-600">
              Password Reset
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
