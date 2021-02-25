import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PaddleboardIcon } from '../assets/img/icons/map-24.svg';

export const LogoColorTheme = {
  white: 'text-white',
  gray: 'text-gray-700',
};

export const LogoSizeTheme = {
  medium: {
    icon: 'h-8 w-8',
    text: 'text-xl',
  },
  large: {
    icon: 'h-12 w-12',
    text: 'text-4xl',
  },
};

const Logo = ({ size, color }) => {
  return (
    <div className={`flex flex-row items-center justify-center ${color}`}>
      <PaddleboardIcon className={`${size.icon}`} title="paddleboard-logo" />
      <h1 className={`ml-2 font-extrabold tracking-wider ${size.text}`}>PADDLEBOARD</h1>
    </div>
  );
};

Logo.propTypes = {
  /**  The size of the Logo component  */
  size: PropTypes.shape({
    icon: PropTypes.string,
    text: PropTypes.string,
  }),
  /** The color of the Logo component  */
  color: PropTypes.string,
};

Logo.defaultProps = {
  size: LogoSizeTheme.medium,
  color: LogoColorTheme.white,
};

export default Logo;
