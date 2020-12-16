import React from 'react';

const Backdrop = ({ children, toggleShowModal }) => {
  const handleClick = () => {
    toggleShowModal();
  };

  return (
    <div className={`fixed z-30 inset-0 overflow-hidden`}>
      <div className={`absolute inset-0 overflow-hidden`}>
        <div
          className={`absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity`}
          aria-hidden="true"
          onClick={handleClick}></div>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
