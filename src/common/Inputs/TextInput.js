import React from 'react';

const TextInput = ({ labelText, ariaLabel, name, type, isRequired, changeHandler, inputStyle }) => {
  const getInputClasses = () => {
    switch (inputStyle) {
      case 'fullWidth':
      default:
        return `mt-1 block w-full rounded-sm bg-gray-50 sm:bg-white border-gray-300 shadow-sm focus:border-blue-700 focus:bg-white`;
    }
  };

  return (
    <div>
      <label htmlFor={name} className={`block`}>
        <span className={`text-gray-700`}>{labelText}:</span>
        <input
          aria-label={ariaLabel}
          name={name}
          type={type}
          required={isRequired ? true : false}
          onChange={changeHandler}
          className={getInputClasses()}
        />
      </label>
    </div>
  );
};

export default TextInput;
