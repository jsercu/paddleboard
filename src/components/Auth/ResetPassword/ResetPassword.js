import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Logo, { LogoColorTheme, LogoSizeTheme } from '../../../common/Logo';
import { ResetPasswordForm } from './ResetPasswordForm';

const ResetPassword = ({ history }) => {
  const auth = useAuth();
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const sendPasswordReset = async (email) => {
    setSuccessMessage(false);
    try {
      await auth.sendPasswordResetEmail(email).then(() => {
        setError(false);
        setSuccessMessage(
          'Instructions on how to reset your password have been sent to the email address you provided.',
        );
      });
    } catch (exception) {
      setError(exception.toString());
    }
  };

  return (
    <div className="flex justify-center min-h-screen px-6 py-24 bg-gray-100 sm:items-center sm:px-6 lg:px-8">
      <div className="w-full max-w-lg mx-auto">
        <Logo size={LogoSizeTheme.large} color={LogoColorTheme.gray} />
        <h2 className="my-4 text-sm font-semibold tracking-wider text-center text-gray-500 uppercase">
          Password Reset
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-200 rounded-sm">
            <p className="px-4 py-2 text-xs leading-tight text-red-800">{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-200 rounded-sm">
            <p className="px-4 py-2 text-xs leading-tight text-green-800">{successMessage}</p>
          </div>
        )}
        <ResetPasswordForm sendPasswordReset={sendPasswordReset} />
        <div className="py-6">
          <div className="flex flex-row items-center justify-center">
            <div>
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

export default withRouter(ResetPassword);
