import React from 'react';

const Container = ({ children, width }) => {
  const getSizeStyles = () => {
    switch (width) {
      case 'small':
        return 'container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8';
      case 'medium':
        return 'container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8';
      case 'large':
      default:
        return 'container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
    }
  };

  return <div className={getSizeStyles()}>{children}</div>;
};

export default Container;
