import React from 'react';

export const ContainerWidthTheme = {
  small: 'container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8',
  medium: 'container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
  large: 'container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
};

const Container = ({ children, width }) => {
  // const getSizeStyles = () => {
  //   switch (width) {
  //     case 'small':
  //       return 'container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8';
  //     case 'medium':
  //       return 'container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8';
  //     case 'large':
  //     default:
  //       return 'container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
  //   }
  // };

  return <div className={`${width}`}>{children}</div>;
};

export default Container;
