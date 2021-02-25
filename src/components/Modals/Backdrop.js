import React from 'react';
import PropTypes from 'prop-types';

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

Backdrop.propTypes = {
  /**  The content to display over the Backdrop (e.g. Modal, Slideover panel, etc.)  */
  children: PropTypes.node,
  /** Provide a function that toggles whether to show/hide the backdrop overlay and modal. */
  toggleShowModal: PropTypes.func.isRequired,
};

export default Backdrop;
