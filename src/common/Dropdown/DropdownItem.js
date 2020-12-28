import React from 'react';

const DropdownItem = ({ text, icon, action }) => {
  return (
    <div className="flex px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" onClick={action}>
      <div className="flex flex-row items-center justify-start">
        {icon}
        <span className="font-medium text-gray-600">{text}</span>
      </div>
    </div>
  );
};

export default DropdownItem;
