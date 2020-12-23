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
        return `px-4 py-1 text-sm font-medium `;
      case 'medium':
      default:
        return `px-4 py-2 text-sm font-medium '`;
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
      case 'transparent':
        return `bg-gray-600 bg-opacity-50 text-white hover:bg-gray-500 hover:bg-opacity-25 focus:ring-gray-300`;
      case 'tertiary':
        return `border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 focus:ring-blue-400`;
      case 'secondary':
        return `border border-transparent bg-lightblue-600 text-white hover:bg-lightblue-500 focus:ring-lightblue-400`;
      case 'primary':
      default:
        return `border border-transparent bg-pink-600 text-white hover:bg-pink-500 focus:ring-pink-400`;
    }
  };

  if (fullWidth) {
    return (
      <button type={type} className={`relative w-full font-medium ` + getButtonClasses()} onClick={action}>
        {!!hasIcon && <span className={`absolute left-0 inset-y-0 flex items-center pl-3 mr-2`}>{children}</span>}
        {text}
      </button>
    );
  }

  return (
    <button type={type} onClick={action} className={`inline-flex ` + getButtonClasses()}>
      {!!hasIcon && <span className={`w-5 h-5 mr-2 -ml-1`}>{children}</span>}
      {text}
    </button>
  );
};

export default Button;
