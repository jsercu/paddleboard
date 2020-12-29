import React from 'react';

const TextArea = ({ labelText, ariaLabel, name, value, isRequired, rows, changeHandler, color }) => {
  const getInputClasses = () => {
    const baseStyles = `mt-1 block w-full rounded-sm shadow-sm`;
    return baseStyles + ' ' + getColorStyles(color);
  };

  const getColorStyles = () => {
    switch (color) {
      case 'white':
        return 'bg-white border-gray-300 focus:border-transparent focus:ring-2 focus:ring-indigo-500';
      case 'offWhite':
      default:
        return 'bg-gray-50 border-gray-300 focus:bg-white focus:border-transparent focus:ring-2 focus:ring-indigo-500';
    }
  };

  return (
    <div>
      <label htmlFor={name} className={`block`}>
        <span className={`text-gray-700 mb-1 block text-sm leading-5 font-medium`}>{labelText}:</span>
        <textarea
          aria-label={ariaLabel}
          name={name}
          value={value}
          required={isRequired ? true : false}
          rows={rows}
          onChange={changeHandler}
          className={getInputClasses()}
        />
      </label>
    </div>
  );
};

export default TextArea;
