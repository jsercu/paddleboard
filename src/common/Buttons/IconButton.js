import React from 'react';

const IconButton = ({ children, ariaLabel, action }) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`text-gray-300 hover:text-white transition ease-in-out duration-150`}
      onClick={action}>
      {children}
    </button>
  );
};

export default IconButton;
