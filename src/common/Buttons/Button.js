import React from 'react';

const Button = ({ action, type, children, text, color, rounded, size, fullWidth, hasIcon }) => {
  const getButtonClasses = () => {
    const baseStyles = `group items-center justify-center leading-6 focus:outline-none focus:ring transition duration-150 ease-in-out shadow-sm`;
    return baseStyles + ` ` + getSizeStyles() + ` ` + getColorStyles() + ` ` + getRoundedStyles();
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'large':
        return 'px-5 py-3 text-md font-medium ';
      case 'small':
        return 'px-4 py-1 text-sm font-medium ';
      case 'medium-wide':
        return 'px-12 py-2 text-sm font-medium ';
      case 'medium':
      default:
        return 'px-4 py-2 text-sm font-medium ';
    }
  };

  const getRoundedStyles = () => {
    switch (rounded) {
      case 'small':
        return 'rounded-sm';
      case 'normal':
        return 'rounded';
      case 'large':
        return 'rounded-lg';
      case 'medium':
      default:
        return 'rounded-md';
    }
  };

  const getColorStyles = () => {
    switch (color) {
      case 'transparent':
        return `bg-gray-600 bg-opacity-50 text-white hover:bg-gray-500 hover:bg-opacity-25 focus:ring-gray-300`;
      case 'danger':
        return `bg-red-600 bg-opacity-90 text-white hover:bg-red-500 focus:ring-red-300`;
      case 'tertiary':
        return `border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 focus:ring-gray-300`;
      case 'secondary':
        return `border border-transparent bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-400`;
      case 'primary':
      default:
        return `border border-indigo-800 bg-indigo-700 text-white hover:bg-indigo-600 focus:ring-indigo-400`;
    }
  };

  if (fullWidth) {
    return (
      <button type={type} className={`relative w-full font-medium ` + getButtonClasses()} onClick={action}>
        {!!hasIcon && <span className="absolute inset-y-0 left-0 flex items-center pl-3 mr-2">{children}</span>}
        {text}
      </button>
    );
  }

  return (
    <button type={type} onClick={action} className={`inline-flex ` + getButtonClasses()}>
      {!!hasIcon && <span className="w-5 h-5 mr-2 -ml-1">{children}</span>}
      {text}
    </button>
  );
};

export default Button;
