import React from 'react';

const TextArea = ({ labelText, ariaLabel, name, value, isRequired, rows, changeHandler }) => {
  const getInputClasses = () => {
    const baseStyles = `mt-1 block w-full rounded-sm bg-white border-gray-300 shadow-sm focus:border-blue-700 focus:bg-white`;
    return baseStyles;
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
