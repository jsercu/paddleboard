import React from 'react';

const Participant = ({ participant }) => {
  return (
    <div>
      <img
        src={participant.photoURL}
        className="inline-block w-10 h-10 border border-gray-900 rounded-full shadow-md cursor-pointer ring-2 ring-gray-900 ring-opacity-25 transition duration-100 ease-in-out transform hover:-translate-y-1"
      />
    </div>
  );
};

export default Participant;
