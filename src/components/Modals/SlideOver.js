import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Backdrop from './Backdrop';
import { ReactComponent as XIcon } from '../../assets/img/icons/x-24.svg';
import IconButton, { IconButtonColorTheme, IconButtonRoundedTheme, IconButtonSizeTheme } from '../Buttons/IconButton';

const modalRoot = document.getElementById('modal-root');

const SlideOver = ({ children, toggleShowSlideOver }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  });

  const handleClick = () => toggleShowSlideOver();

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
    elRef.current,
  );
};

SlideOver.propTypes = {
  /**  The content to display within the SlidOver panel  */
  children: PropTypes.node,
  /** Provide a function that toggles whether to show/hide the SlideOver */
  toggleShowSlideOver: PropTypes.func.isRequired,
};

export default SlideOver;
