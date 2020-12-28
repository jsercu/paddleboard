import React from 'react';
import { ReactComponent as PaddleboardIcon } from '../assets/img/icons/map-24.svg';

const Logo = ({ size, color }) => {
  const getLogoColor = () => {
    switch (color) {
      case 'white':
        return `text-white`;
      case 'gray':
      default:
        return `text-gray-700`;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'medium':
        return `h-8 w-8`;
      case 'large':
      default:
        return `h-12 w-12`;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'medium':
        return `text-xl`;
      case 'large':
      default:
        return `text-4xl`;
    }
  };

  return (
    <div className={`flex flex-row items-center justify-center ` + getLogoColor()}>
      <PaddleboardIcon className={getIconSize()} title="paddleboard-logo" />
      <h1 className={`ml-2 font-extrabold tracking-wider ` + getTextSize()}>PADDLEBOARD</h1>
    </div>
  );
};

export default Logo;
