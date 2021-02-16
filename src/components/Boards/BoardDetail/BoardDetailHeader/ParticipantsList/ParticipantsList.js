import React, { useState } from 'react';
import ParticipantSlideOver from './ParticipantSlideOver';

const ParticipantsList = ({ participants }) => {
  const [participantSlideOverConfig, setParticipantSlideOverConfig] = useState({ display: false, participant: null });

  const toggleShowParticipantSlideOver = (newParticipant) => {
    if (newParticipant) {
      setParticipantSlideOverConfig({ display: true, participant: newParticipant });
    } else {
      setParticipantSlideOverConfig({ display: false, participant: null });
    }
  };

  return (
    <>
      <ul className="flex -space-x-1">
        {participants.map((participant) => (
          <li key={participant.userId}>
            <button
              onClick={() => toggleShowParticipantSlideOver(participant)}
              className="bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white transition duration-100 ease-in-out transform hover:-translate-y-1">
              <img src={participant.photoURL} className="rounded-full w-7 h-7" />
            </button>
          </li>
        ))}
      </ul>
      {!!participantSlideOverConfig.display && (
        <div className="relative">
          <ParticipantSlideOver
            participant={participantSlideOverConfig.participant}
            toggleShowParticipantSlideOver={toggleShowParticipantSlideOver}
          />
        </div>
      )}
    </>
  );
};

export default ParticipantsList;
