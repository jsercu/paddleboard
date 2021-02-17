import React from 'react';

export const ContainerWidthTheme = {
  small: 'max-w-2xl',
  medium: 'max-w-3xl',
  large: 'max-w-7xl',
};

const Container = ({ children, width }) => {
  return <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${width}`}>{children}</div>;
};

export default Container;
