import React, { useState, useRef } from 'react';
// import useComponentVisible from '../../hooks/useComponentVisible';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const Dropdown = ({ children, toggleShowDropdown }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => toggleShowDropdown());

  return (
    <div ref={ref} className="absolute right-0 z-10 w-48 rounded-sm shadow-lg top-12 origin-top-right">
      <div
        className="py-2 bg-white rounded-sm shadow-xs"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu">
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
