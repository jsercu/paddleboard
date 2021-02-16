import React from 'react';

const Backdrop = ({ children, toggleShowModal }) => {
  return (
    <div className="fixed inset-0 z-30 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={toggleShowModal}></div>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
