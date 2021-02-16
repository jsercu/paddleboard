import React from 'react';
import SlideOver from '../../../../../common/Modals/SlideOver';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../../../common/Buttons/Button';

const ParticipantSlideOver = ({ participant, toggleShowParticipantSlideOver }) => {
  return (
    <SlideOver toggleShowSlideOver={toggleShowParticipantSlideOver}>
      <div className="relative flex flex-col h-full overflow-y-scroll bg-white shadow-xl space-y-6">
        <div className="px-4 py-16 bg-gradient-to-tr from-indigo-800 to-indigo-600 sm:px-6"></div>
        <div className="flex-1">
          <div className="absolute flex flex-col items-start top-12">
            <div className="px-8">
              <img src={participant.photoURL} className="w-40 h-40 border-4 border-white rounded-full" />
            </div>
            <div className="w-full mt-2 border-b border-gray-200 text-start">
              <div className="px-8">
                <h4 className="text-3xl font-bold text-gray-800">{participant.displayName}</h4>
                <span className="text-base text-gray-500">{participant.email}</span>
                <div className="flex pt-3 pb-6 space-x-4">
                  <Button
                    text="Remove From Board"
                    color={ButtonColorTheme.tertiary}
                    size={ButtonSizeTheme.tiny}
                    rounded={ButtonRoundedTheme.small}
                  />
                  <Button
                    text="Make Admin"
                    color={ButtonColorTheme.tertiary}
                    size={ButtonSizeTheme.tiny}
                    rounded={ButtonRoundedTheme.small}
                  />
                </div>
              </div>
            </div>
            <div className="px-8 mt-4 space-y-4">
              <div>
                <span className="text-sm text-gray-400 leading-5">Location:</span>
                <p className="text-sm text-gray-900">{participant.location}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400 leading-5">Title:</span>
                <p className="text-sm text-gray-900">{participant.title}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400 leading-5">Company / Organization:</span>
                <p className="text-sm text-gray-900">{participant.company}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400 leading-5">Bio:</span>
                <p className="text-sm text-gray-900">{participant.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default ParticipantSlideOver;
