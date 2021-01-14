import React from 'react';
import ReactDOM from 'react-dom';
import { Transition } from '@headlessui/react';
import Backdrop from './Backdrop';
import { ReactComponent as XIcon } from '../../assets/img/icons/x-24.svg';
import IconButton from '../Buttons/IconButton';

const SlideOver = ({ children, panelTitle, panelSecondaryText, toggleShowSlideOver }) => {
  const handleClick = () => {
    toggleShowSlideOver();
  };

  return ReactDOM.createPortal(
    <Backdrop toggleShowModal={toggleShowSlideOver}>
      <section className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="relative w-screen max-w-md">
          <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
            <IconButton ariaLabel="Close Panel" action={handleClick} backgroundType="modalBackdrop">
              <XIcon title="x-icon" className={`h-6 w-6`} />
            </IconButton>
          </div>
          <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl space-y-6">
            <header className="px-4 py-6 bg-indigo-800 sm:px-6">
              <h2 className="mb-1 text-xl font-medium leading-6 text-purple-50">{panelTitle}</h2>
              <h5 className="text-sm font-light leading-snug text-purple-200">{panelSecondaryText}</h5>
            </header>
            <div className="relative flex-1">{children}</div>
          </div>
        </div>
      </section>
    </Backdrop>,
    document.getElementById('modal-root'),
  );
};

export default SlideOver;
