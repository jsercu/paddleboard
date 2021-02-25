import React from 'react';
import PropTypes from 'prop-types';

export const IconButtonColorTheme = {
  white:
    'text-gray-300 hover:text-gray-400 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:bg-gray-100 focus:text-gray-500',
  lightGray:
    'text-gray-300 hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:bg-gray-200 focus:text-gray-500 rounded-sm',
  darkGray:
    'bg-gray-600 bg-opacity-50 text-white hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:ring transition focus:ring-gray-300 rounded-md',
  transparent:
    'bg-white bg-opacity-10 text-white hover:bg-gray-800 hover:bg-opacity-10 focus:outline-none focus:ring transition focus:ring-gray-200 rounded-md',
  modalBackdrop:
    'text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-opacity-50 rounded-sm',
};

export const IconButtonSizeTheme = {
  tiny: 'h-4 w-4',
  small: 'h-6 w-6',
  medium: 'h-8 w-8',
  large: 'h-10 w-10',
};

export const IconButtonRoundedTheme = {
  tiny: 'rounded-sm',
  small: 'rounded',
  medium: 'rounded-md',
  large: 'rounded-lg',
  full: 'rounded-full',
};

const IconButton = ({ action, ariaLabel, children, color, rounded, size }) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`group relative items-center justify-center transition duration-150 ease-in-out ${color} ${size} ${rounded}`}
      onClick={action}>
      {children}
    </button>
  );
};

IconButton.propTypes = {
  /** Gets called when the user clicks on the button */
  action: PropTypes.func.isRequired,
  /** The color for the button   */
  ariaLabel: PropTypes.string.isRequired,
  /** Specify the icon for the button in the parent component  */
  children: PropTypes.element,
  /** The color for the button   */
  color: PropTypes.string,
  /** The border radius of the button   */
  rounded: PropTypes.string,
  /** The size of the button   */
  size: PropTypes.string,
};

IconButton.defaultProps = {
  color: IconButtonColorTheme.white,
  rounded: IconButtonRoundedTheme.full,
  size: IconButtonSizeTheme.small,
};

export default IconButton;
