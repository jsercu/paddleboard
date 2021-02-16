import React from 'react';

export const TextAreaColorTheme = {
  white: 'bg-white border-gray-300 focus:border-transparent focus:ring-2 focus:ring-indigo-500',
  lightGray: 'bg-gray-50 border-gray-300 focus:bg-white focus:border-transparent focus:ring-2 focus:ring-indigo-500',
};

const TextArea = ({ labelText, ariaLabel, name, value, isRequired, rows, changeHandler, color }) => {
  return (
    <label htmlFor={name} className={`block`}>
      <span className={`text-gray-700 mb-1 block text-sm leading-5 font-medium`}>{labelText}:</span>
      <textarea
        aria-label={ariaLabel}
        name={name}
        value={value}
        required={!!isRequired}
        rows={rows}
        onChange={changeHandler}
        className={`mt-1 block w-full rounded-sm shadow-sm ${color}`}
      />
    </label>
  );
};

export default TextArea;
