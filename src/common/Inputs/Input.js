import React from 'react';

const Input = ({ labelText, ariaLabel, name, value, type, isRequired, changeHandler, color }) => {
  const getInputClasses = () => {
    const baseStyles = `mt-1 block w-full rounded-sm shadow-sm focus:outline-none`;
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
      <label htmlFor={name} className="block">
        <div className="flex items-end justify-between space-between">
          <span className="block text-sm font-medium text-gray-700 leading-5">{labelText}:</span>
          {isRequired && (
            <span className="block text-xs italic text-gray-400 text-opacity-70 leading-5">* Field Required</span>
          )}
        </div>
        <input
          aria-label={ariaLabel}
          name={name}
          value={value}
          type={type}
          required={isRequired ? true : false}
          onChange={changeHandler}
          className={getInputClasses()}
        />
      </label>
    </div>
  );
};

export default Input;
