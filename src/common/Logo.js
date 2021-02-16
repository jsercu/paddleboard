import React from 'react';
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

export default Logo;
