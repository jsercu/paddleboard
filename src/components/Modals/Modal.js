import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Backdrop from './Backdrop';
const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, toggleShowModal }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  });

  return createPortal(
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <Backdrop toggleShowModal={toggleShowModal}>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div
            className="inline-block overflow-hidden text-left align-bottom bg-white rounded-sm shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline">
            {children}
          </div>
        </Backdrop>
      </div>
    </div>,
    elRef.current,
  );
};

Modal.propTypes = {
  /** Specify the content to display in this modal in the parent component  */
  children: PropTypes.node,
  /** Provide a function that toggles whether to show/hide the backdrop overlay and modal. */
  toggleShowModal: PropTypes.func.isRequired,
};

export default Modal;
