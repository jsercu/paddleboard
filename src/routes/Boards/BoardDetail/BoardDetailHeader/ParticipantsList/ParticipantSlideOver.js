import React from 'react';
import SlideOver from '../../../../../components/Modals/SlideOver';
import Button, {
  ButtonColorTheme,
  ButtonRoundedTheme,
  ButtonSizeTheme,
} from '../../../../../components/Buttons/Button';
import { ReactComponent as LocationIcon } from '../../../../../assets/icons/location-24.svg';
import { ReactComponent as TitleIcon } from '../../../../../assets/icons/identification-24.svg';
import { ReactComponent as CompanyIcon } from '../../../../../assets/icons/office-building-24.svg';
import { ReactComponent as BioIcon } from '../../../../../assets/icons/newspaper-24.svg';

const ParticipantSlideOver = ({ participant, toggleShowParticipantSlideOver }) => {
  return (
    <SlideOver toggleShowSlideOver={toggleShowParticipantSlideOver}>
      <div className="relative flex flex-col h-full overflow-y-scroll bg-white shadow-xl space-y-6">
        <div className="px-4 py-16 bg-gradient-to-tr from-indigo-800 to-indigo-600 sm:px-6"></div>
        <div className="flex-1">
          <div className="absolute flex flex-col items-start w-full top-16">
            <div className="px-8">
              <img src={participant.photoURL} className="w-32 h-32 border-4 border-white rounded-full" />
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
            <div className="w-full px-8 pt-4 pb-8 border-b border-gray-200 space-y-4">
              <div className="flex items-center my-3">
                <LocationIcon className="flex-none w-5 h-5 text-gray-500" />
                <span className="inline-block ml-2 text-sm text-gray-800 align-baseline">
                  {participant.location || '--'}
                </span>
              </div>
              <div className="flex items-center my-3">
                <TitleIcon className="flex-none w-5 h-5 text-gray-500" />
                <span className="inline-block ml-2 text-sm text-gray-800 align-baseline">
                  {participant.title || '--'}
                </span>
              </div>
              <div className="flex items-center my-3">
                <CompanyIcon className="flex-none w-5 h-5 text-gray-500" />
                <span className="inline-block ml-2 text-sm text-gray-800 align-baseline">
                  {participant.company || '--'}
                </span>
              </div>
              <div className="flex items-start my-3">
                <BioIcon className="flex-none w-5 h-5 text-gray-500" />
                <span className="inline-block ml-2 text-sm text-gray-800 align-baseline">
                  {participant.bio || '--'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default ParticipantSlideOver;
