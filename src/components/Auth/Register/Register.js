import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Logo from '../../../common/Logo';
import Button from '../../../common/Buttons/Button';
import { ReactComponent as GoogleIcon } from '../../../assets/img/icons/google-icon.svg';
import { RegisterForm } from './RegisterForm';

const Register = ({ history }) => {
  const auth = useAuth();

  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signup(email, password);
      history.push('/boards');
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const signUpWithGoogle = async (event) => {
    if (event) event.preventDefault();
    try {
      await auth.signinWithGoogle();
      history.push('/boards');
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  return (
    <div className="flex justify-center min-h-screen px-6 py-24 bg-gray-100 sm:items-center sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <Logo size="large" color="gray" />
        <h2 className="mt-4 text-sm font-semibold tracking-wider text-center text-gray-500 uppercase">
          Create New Account
        </h2>
        <RegisterForm signUpWithEmailAndPassword={signUpWithEmailAndPassword} />
        <div className="py-4 mt-3 mb-1">
          <div className="w-full border-b border-gray-300"></div>
          <div className="-mt-3 text-center">
            <span className="px-6 text-sm text-gray-500 bg-gray-100">Or continue with</span>
          </div>
        </div>
        <div className="flex">
          <Button
            text="Sign Up Using Google"
            type="button"
            color="tertiary"
            fullWidth
            action={signUpWithGoogle}
            hasIcon
            rounded="small">
            <GoogleIcon className="w-5 h-5 ml-1" title="google-icon" />
          </Button>
        </div>
        <div className="py-6">
          <div className="flex flex-row items-center justify-center">
            <div>
              <span className="mr-1 text-xs text-gray-500">Already have an account? </span>
              <Link to="/login" className="text-xs font-medium text-indigo-700 hover:underline hover:text-indigo-600">
                Sign In
              </Link>
            </div>
            <div className="px-2 mt-1 text-gray-300" style={{ fontSize: '8px' }}>
              <span>{'\u25CF'}</span>
            </div>
            <div>
              <Link
                to="/register"
                className="text-xs font-medium text-indigo-700 hover:underline hover:text-indigo-600">
                Create New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
