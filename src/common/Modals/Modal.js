import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import BgPattern from '../BgPattern/BgPattern';
import IconButton from '../Buttons/IconButton';
import { ReactComponent as XIcon } from '../../assets/img/icons/x-24.svg';

const Modal = ({ children, panelTitle, panelSecondaryText, toggleShowModal }) => {
  const handleClick = () => {
    toggleShowModal();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <Backdrop toggleShowModal={toggleShowModal}>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div
            className="inline-block overflow-hidden text-left align-bottom bg-white shadow-xl rounded-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline">
            {children}
          </div>
        </Backdrop>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

export default Modal;
