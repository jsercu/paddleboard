import React from 'react';

const Button = ({ action, type, children, text, color, rounded, size, fullWidth }) => {
  const getButtonClasses = () => {
    const baseStyles = `group items-center justify-center leading-6 font-medium focus:outline-none focus:ring transition duration-150 ease-in-out shadow-md`;
    return baseStyles + ` ` + getSizeStyles() + ` ` + getColorStyles() + ` ` + getRoundedStyles();
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return `px-4 py-2 text-sm`;
      case 'medium':
      default:
        return `px-5 py-3 text-md`;
    }
  };

  const getRoundedStyles = () => {
    switch (rounded) {
      case 'small':
        return `rounded-sm`;
      case 'normal':
        return `rounded`;
      case 'large':
        return `rounded-lg`;
      case 'medium':
      default:
        return `rounded-md`;
    }
  };

  const getColorStyles = () => {
    switch (color) {
      case `tertiary`:
        return `border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 focus:ring-indigo-400`;
      case 'primary':
      default:
        return `border border-transparent bg-indigo-700 text-white hover:bg-indigo-600 focus:ring-indigo-400`;
    }
  };

  if (fullWidth) {
    return (
      <button type={type} className={`relative w-full ` + getButtonClasses()} onClick={action}>
        <span className={`absolute left-0 inset-y-0 flex items-center pl-3 mr-2`}>{children}</span>
        <span>{text}</span>
      </button>
    );
  }

  return (
    <button type={type} onClick={action} className={`inline-flex ` + getButtonClasses()}>
      <span className={`w-5 h-5 mr-2 -ml-1`}>{children}</span>
      <span>{text}</span>
    </button>
  );
};

export default Button;
