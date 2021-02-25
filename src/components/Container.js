import React from 'react';
import PropTypes from 'prop-types';

export const ContainerWidthTheme = {
  small: 'max-w-2xl',
  medium: 'max-w-3xl',
  large: 'max-w-7xl',
};

const Container = ({ children, width }) => {
  return <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${width}`}>{children}</div>;
};

Container.propTypes = {
  /**  The content to display with the Container */
  children: PropTypes.element,
  /** Width of the container */
  width: PropTypes.string,
};

Container.defaultProps = {
  width: ContainerWidthTheme.large,
};

export default Container;
