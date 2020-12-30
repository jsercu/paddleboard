import React from 'react';

const BoardsTableHeader = () => {
  return (
    <div className="flex items-center justify-between py-2 border-b bg-gray-50">
      <div className="w-full">
        <span className="inline-block px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase align-middle">
          Board
        </span>
      </div>
      <div className="w-full">
        <span className="inline-block px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase align-middle">
          Participants
        </span>
      </div>
      <div className="w-full">
        <span className="inline-block px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase align-middle">
          Created
        </span>
      </div>
      <div className="flex justify-end w-full">
        <span className="inline-block px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase align-middle sr-only">
          Actions
        </span>
      </div>
    </div>
  );
};

export default BoardsTableHeader;
