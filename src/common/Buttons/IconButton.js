import React from 'react';

export const IconButtonColorTheme = {
  white:
    'text-gray-300 hover:text-gray-400 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:bg-gray-100 focus:text-gray-500',
  lightGray:
    'text-gray-300 hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:bg-gray-200 focus:text-gray-500 rounded-sm',
  darkGray:
    'bg-gray-600 bg-opacity-50 text-white hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:ring transition focus:ring-gray-300 rounded-md',
  transparent:
    'bg-white bg-opacity-10 text-white hover:bg-gray-800 hover:bg-opacity-10 focus:outline-none focus:ring transition focus:ring-gray-200 rounded-md',
  modalBackdrop:
    'text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-opacity-50 rounded-sm',
};

export const IconButtonSizeTheme = {
  tiny: 'h-4 w-4',
  small: 'h-6 w-6',
  medium: 'h-8 w-8',
  large: 'h-10 w-10',
};

export const IconButtonRoundedTheme = {
  tiny: 'rounded-sm',
  small: 'rounded',
  medium: 'rounded-md',
  large: 'rounded-lg',
  full: 'rounded-full',
};

const IconButton = ({ children, ariaLabel, action, color, size, rounded }) => {
  // const getButtonClasses = () => {
  //   const baseStyles = 'group relative items-center justify-center transition duration-150 ease-in-out';
  //   return baseStyles + ' ' + getSizeStyles() + ' ' + getColorStyles();
  // };

  // const getColorStyles = () => {
  //   switch (backgroundType) {
  //     case 'darkGray':
  //       return 'bg-gray-600 bg-opacity-50 text-white hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:ring transition focus:ring-gray-300 rounded-md';
  //     case 'transparent':
  //       return 'bg-white bg-opacity-10 text-white hover:bg-gray-800 hover:bg-opacity-10 focus:outline-none focus:ring transition focus:ring-gray-300 rounded-md';
  //     case 'modalBackdrop':
  //       return 'text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-opacity-50 rounded-sm';
  //     case 'white':
  //       return 'text-gray-300 hover:text-gray-400 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:bg-gray-100 focus:text-gray-500';
  //     case 'offWhite':
  //     default:
  //       return 'text-gray-300 hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:bg-gray-200 focus:text-gray-500 rounded-sm';
  //   }
  // };

  // const getSizeStyles = () => {
  //   switch (size) {
  //     case 'medium':
  //       return 'h-10 w-10';
  //     case 'small':
  //     default:
  //       return 'h-6 w-6';
  //   }
  // };

  return (
    <button
      aria-label={ariaLabel}
      className={`group relative items-center justify-center transition duration-150 ease-in-out ${color} ${size} ${rounded}`}
      onClick={action}>
      {children}
    </button>
  );
};

export default IconButton;
