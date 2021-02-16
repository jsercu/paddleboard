import React from 'react';

export const ButtonColorTheme = {
  transparent: 'bg-gray-600 bg-opacity-50 text-white hover:bg-gray-500 hover:bg-opacity-25 focus:ring-gray-300',
  danger: 'bg-red-600 border border-red-700 bg-opacity-90 text-white hover:bg-red-500 focus:ring-red-300',
  success: 'border border-green-700 bg-green-600 text-white hover:bg-green-500 focus:ring-green-300',
  tertiary: 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 focus:ring-gray-300',
  primary: 'border border-indigo-800 bg-indigo-700 text-white hover:bg-indigo-600 focus:ring-indigo-400',
};

export const ButtonSizeTheme = {
  tiny: 'px-2 text-xs font-medium',
  small: 'px-4 py-1 text-sm font-medium',
  medium: 'px-4 py-2 text-sm font-medium',
  large: 'px-5 py-3 text-md font-medium',
};

export const ButtonRoundedTheme = {
  tiny: 'rounded-sm',
  small: 'rounded',
  medium: 'rounded-md',
  large: 'rounded-lg',
};

const Button = ({ action, type, children, text, color, rounded, size, fullWidth, hasIcon }) => {
  if (fullWidth) {
    return (
      <button
        type={type}
        className={`relative w-full font-medium group items-center justify-center leading-6 focus:outline-none focus:ring transition duration-150 ease-in-out shadow-sm ${color} ${size} ${rounded}`}
        onClick={action}>
        {!!hasIcon && <span className="absolute inset-y-0 left-0 flex items-center pl-3 mr-2">{children}</span>}
        {text}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={action}
      className={`inline-flex group items-center justify-center leading-6 focus:outline-none focus:ring transition duration-150 ease-in-out shadow-sm ${color} ${size} ${rounded}`}>
      {!!hasIcon && <span className="w-5 h-5 mr-2 -ml-1">{children}</span>}
      {text}
    </button>
  );
};

export default Button;
