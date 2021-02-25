import React from 'react';
import PropTypes from 'prop-types';

export const ButtonColorTheme = {
  transparent: 'bg-gray-600 bg-opacity-50 text-white hover:bg-gray-500 hover:bg-opacity-25 focus:ring-gray-300',
  danger: 'bg-red-600 border border-red-700 bg-opacity-90 text-white hover:bg-red-500 focus:ring-red-300',
  success: 'border border-green-700 bg-green-600 text-white hover:bg-green-500 focus:ring-green-300',
  tertiary: 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 focus:ring-gray-300',
  primary: 'border border-indigo-800 bg-indigo-700 text-white hover:bg-indigo-600 focus:ring-indigo-400',
};

export const ButtonSizeTheme = {
  tiny: 'px-2 text-xs font-medium',
  small: 'px-4 py-1 text-sm font-medium',
  medium: 'px-4 py-2 text-sm font-medium',
  large: 'px-5 py-3 text-md font-medium',
};

export const ButtonRoundedTheme = {
  tiny: 'rounded-sm',
  small: 'rounded',
  medium: 'rounded-md',
  large: 'rounded-lg',
};

const Button = ({ action, type, children, text, color, rounded, size, fullWidth, hasIcon }) => {
  const buttonClasses = `${
    !!fullWidth ? 'relative w-full' : 'inline-flex'
  } group leading-6 focus:outline-none focus:ring items-center justify-center transition duration-150 ease-in-out shadow-sm ${color} ${size} ${rounded}`;

  const iconClasses = `${!!fullWidth ? 'absolute inset-y-0 left-0 flex items-center pl-3' : 'w-5 h-5 -ml-1'} mr-2`;

  const btnIcon = !!hasIcon ? <span className={iconClasses}>{children}</span> : null;

  return (
    <button type={type} onClick={action} className={buttonClasses}>
      {btnIcon}
      {text}
    </button>
  );
};

Button.propTypes = {
  /** Gets called when the user clicks on the button */
  action: PropTypes.func,
  /** The type attribute of the button element */
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  /** Specify the icon for the button in the parent component  */
  children: PropTypes.element,
  /** Button label   */
  text: PropTypes.string.isRequired,
  /** The color for the button   */
  color: PropTypes.string,
  /** The border radius of the button   */
  rounded: PropTypes.string,
  /** The size of the button   */
  size: PropTypes.string,
  /** Whether the button should expand to fill its container   */
  fullWidth: PropTypes.bool,
  /** Whether the button has an icon   */
  hasIcon: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  color: ButtonColorTheme.primary,
  rounded: ButtonRoundedTheme.small,
  size: ButtonSizeTheme.medium,
};

export default Button;
