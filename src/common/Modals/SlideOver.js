import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import { ReactComponent as XIcon } from '../../assets/img/icons/x.svg';

import IconButton from '../Buttons/IconButton';

const SlideOver = ({ children, panelTitle, panelSecondaryText, toggleShowPanel }) => {
  const handleClick = () => {
    toggleShowPanel();
  };

  return ReactDOM.createPortal(
    <Backdrop toggleShowModal={toggleShowPanel}>
      <section className={`absolute inset-y-0 right-0 pl-10 max-w-full flex`}>
        <div className={`relative w-screen max-w-md`}>
          <div className={`absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4`}>
            <IconButton ariaLabel="Close Panel" action={handleClick} backgroundType="modalBackdrop">
              <XIcon title="x-icon" className={`h-6 w-6`} />
            </IconButton>
          </div>
          <div className={`h-full flex flex-col space-y-6 bg-gray-50 shadow-xl overflow-y-scroll`}>
            <header className={`px-4 py-6 sm:px-6 bg-blue-700`}>
              <h2 className={`mb-1 text-xl leading-7 font-normal text-white`}>{panelTitle}</h2>
              <h5 className={`text-sm leading-normal font-light text-blue-400`}>{panelSecondaryText}</h5>
            </header>
            <div className={`relative flex-1 px-4 sm:px-6`}>{children}</div>
          </div>
        </div>
      </section>
    </Backdrop>,
    document.getElementById('modal-root'),
  );
};

export default SlideOver;
