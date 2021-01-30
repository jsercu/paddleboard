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
            <li
              key={participant.participantId}
              className="-ml-1"
              onClick={() => toggleShowParticipantSlideOver(participant)}>
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

const ParticipantDetail = ({ participant, toggleShowParticipantDetail }) => {
  const handleCloseParticipantDetail = () => {
    toggleShowParticipantDetail(participant);
  };

  return (
    <div className="absolute z-50 flex h-40 bg-white rounded-sm shadow-2xl w-100 card text-grey-darkest top-2">
      <img
        className="object-cover h-full border-t border-b border-l border-gray-200 rounded-l-sm w-28"
        src={participant.photoURL}
        alt={participant.photoURL}
      />
      <div className="relative flex flex-col justify-between w-full p-4 border-t border-b border-r border-gray-200 rounded-tr-sm rounded-br-sm">
        <div>
          <h5 className="font-semibold text-gray-800 text-md leading">{participant.displayName}</h5>
          <p className="overflow-hidden text-xs font-normal text-gray-500">{participant.bio}</p>
        </div>
        <div className="flex pt-3 space-x-2">
          <Button text="Make Admin" color="tertiary" size="tiny" />
          <Button text="Remove From Board" color="tertiary" size="tiny" />
        </div>
      </div>
      <div className="absolute top-0 right-0 p-2">
        <IconButton backgroundType="white" size="small" action={handleCloseParticipantDetail}>
          <XIcon className="w-5 h-5 mx-auto text-gray-500" />
        </IconButton>
      </div>
    </div>
  );
};

export default ParticipantsList;
