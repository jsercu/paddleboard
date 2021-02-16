import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import { ReactComponent as XIcon } from '../../assets/img/icons/x-24.svg';
import IconButton, { IconButtonColorTheme, IconButtonRoundedTheme, IconButtonSizeTheme } from '../Buttons/IconButton';

const SlideOver = ({ children, toggleShowSlideOver }) => {
  const handleClick = () => {
    toggleShowSlideOver();
  };

  return ReactDOM.createPortal(
    <Backdrop toggleShowModal={handleClick}>
      <section className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="relative w-screen max-w-md">
          <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
            <IconButton
              ariaLabel="Close Panel"
              action={handleClick}
              color={IconButtonColorTheme.modalBackdrop}
              size={IconButtonSizeTheme.medium}
              rounded={IconButtonRoundedTheme.small}>
              <XIcon title="x-icon" className="w-6 h-6 mx-auto" />
            </IconButton>
          </div>
          {children}
        </div>
      </section>
    </Backdrop>,
    document.getElementById('modal-root'),
  );
};

export default SlideOver;
