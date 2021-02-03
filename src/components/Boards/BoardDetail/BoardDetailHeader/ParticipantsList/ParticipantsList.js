import React, { useState } from 'react';
import Participant from './Participant';
import ParticipantSlideOver from './ParticipantSlideOver';
import Button from '../../../../../common/Buttons/Button';
import IconButton from '../../../../../common/Buttons/IconButton';
import { ReactComponent as PlusIcon } from '../../../../../assets/img/icons/plus-24.svg';
import { ReactComponent as XIcon } from '../../../../../assets/img/icons/x-24.svg';

const ParticipantsList = ({ participants }) => {
  const [participantSlideOverConfig, setParticipantSlideOverConfig] = useState({ display: false, participant: null });

  const toggleShowParticipantSlideOver = (participant) => {
    if (participant) {
      setParticipantSlideOverConfig({ display: true, participant: participant });
    } else {
      setParticipantSlideOverConfig({ display: false, participant: null });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center space-x-2">
        <ul className="flex flex-row-reverse justify-start space-x-2">
          {participants.map((participant) => (
            <li key={participant.userId} className="-ml-1" onClick={() => toggleShowParticipantSlideOver(participant)}>
              <Participant participant={participant} />
            </li>
          ))}
        </ul>
        <IconButton backgroundType="darkGray" size="small">
          <PlusIcon className="w-5 h-5 mx-auto text-gray-100" />
        </IconButton>
      </div>
      {!!participantSlideOverConfig.display && (
        <div className="relative">
          <ParticipantSlideOver
            participant={participantSlideOverConfig.participant}
            toggleShowParticipantSlideOver={toggleShowParticipantSlideOver}
          />
        </div>
      )}
    </div>
  );
};

export default ParticipantsList;
