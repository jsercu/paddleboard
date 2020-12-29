import React from 'react';

const IconButton = ({ children, ariaLabel, action, backgroundType, size }) => {
  const getButtonClasses = () => {
    const baseStyles = 'group relative items-center justify-center transition duration-150 ease-in-out';
    return baseStyles + ' ' + getSizeStyles() + ' ' + getColorStyles();
  };

  const getColorStyles = () => {
    switch (backgroundType) {
      case 'darkGray':
        return 'bg-gray-600 bg-opacity-50 text-white hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:ring transition focus:ring-gray-300 rounded-md';
      case 'modalBackdrop':
        return 'text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-opacity-50 rounded-sm';
      case 'white':
        return 'text-gray-300 hover:text-gray-400 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:bg-gray-100 focus:text-gray-500';
      case 'offWhite':
      default:
        return 'text-gray-300 hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:bg-gray-200 focus:text-gray-500 rounded-sm';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'medium':
        return 'h-10 w-10';
      case 'small':
      default:
        return 'h-6 w-6';
    }
  };

  return (
    <button aria-label={ariaLabel} className={getButtonClasses()} onClick={action}>
      {children}
    </button>
  );
};

export default IconButton;
