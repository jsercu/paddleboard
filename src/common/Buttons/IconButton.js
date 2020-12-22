import React from 'react';

const IconButton = ({ children, ariaLabel, action, backgroundType }) => {
  const getStyles = () => {
    switch (backgroundType) {
      case 'modalBackdrop':
        return 'text-gray-300 hover:text-white transition ease-in-out duration-150';
      case 'offWhite':
      default:
        return `text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 focus:bg-blue-100 focus:text-blue-500 rounded-full transition ease-in-out duration-150'`;
    }
  };

  return (
    <button aria-label={ariaLabel} className={getStyles()} onClick={action}>
      {children}
    </button>
  );
};

export default IconButton;
