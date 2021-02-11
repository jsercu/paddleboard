import React, { useState, useRef } from 'react';
import { connectAutoComplete, connectHighlight, connectPoweredBy } from 'react-instantsearch-dom';
import Button from '../../../../common/Buttons/Button';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';
import { ReactComponent as AlgoliaIcon } from '../../../../assets/img/icons/algolia-light-background.svg';
import { ReactComponent as LockIcon } from '../../../../assets/img/icons/lock-20.svg';

const Autocomplete = ({ hits, currentRefinement, refine, addParticipant, ownerId }) => {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const resultsRef = useRef();
  // State for our modal
  const [isResultsPanelOpen, setIsResultsPanelOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(resultsRef, () => setIsResultsPanelOpen(false));

  const handleInputChange = (event) => {
    setIsResultsPanelOpen(true);
    refine(event.currentTarget.value);
  };

  const handleInviteParticipant = (event, hit) => {
    if (event) {
      event.preventDefault();
    }
    const participant = {
      displayName: hit.displayName,
      email: hit.email,
      userId: hit.objectID,
      photoURL: hit.photoURL,
      company: hit.company,
      isOwner: false,
    };
    addParticipant(participant);
    setIsResultsPanelOpen(false);
    refine();
  };

  return (
    <div className="relative" ref={resultsRef}>
      <span className="block text-sm font-medium text-gray-700 leading-5">Participants</span>
      <input
        className="block w-full mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-sm bg-gray-50 shadow-sm focus:ring-indigo-500 focus:outline-none focus:bg-white focus:border-transparent focus:ring-2"
        type="search"
        value={currentRefinement}
        placeholder="Search for participants by name or organization..."
        onChange={handleInputChange}
      />
      {isResultsPanelOpen && (
        <div>
          {hits.length > 0 ? (
            <ul className="absolute right-0 flex flex-col w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-lg outline-none origin-top-right divide-y divide-gray-100">
              {hits.map((hit) => (
                <Hit key={hit.objectID} hit={hit} handleInviteParticipant={handleInviteParticipant} ownerId={ownerId} />
              ))}
              <CustomPoweredBy />
            </ul>
          ) : (
            <div className="absolute right-0 w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-lg outline-none origin-top-right divide-y divide-gray-100">
              <div className="flex items-center justify-center">
                <p className="py-4 ml-4 text-sm text-gray-500">No Results for "{currentRefinement}"</p>
              </div>
              <CustomPoweredBy />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const PoweredBy = ({ url }) => (
  <a className="flex items-center justify-end px-4 py-2 bg-gray-50" href={url}>
    <span className="mr-2 text-xs font-medium text-gray-600">Search by</span>
    <AlgoliaIcon />
  </a>
);

const CustomPoweredBy = connectPoweredBy(PoweredBy);

const Hit = ({ hit, handleInviteParticipant, ownerId }) => (
  <span>
    <CustomHighlight
      attribute="displayName"
      hit={hit}
      handleInviteParticipant={handleInviteParticipant}
      ownerId={ownerId}
    />
  </span>
);

const CustomHighlight = connectHighlight(({ highlight, attribute, hit, handleInviteParticipant, ownerId }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return (
    <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-gr1y-50 hover:bg-opacity-70">
      <div className="flex">
        <img className="w-8 h-8 rounded-full" src={hit.photoURL} alt={hit.displayName} />
        <div className="flex-col items-center ml-2">
          <div className="text-sm font-medium text-gray-800 leading-5">
            {parsedHit.map((part, index) =>
              part.isHighlighted ? (
                <mark key={index} className="bg-indigo-200">
                  {part.value}
                </mark>
              ) : (
                <span key={index}>{part.value}</span>
              ),
            )}
          </div>
          <div className="text-xs font-normal leading-none text-gray-500">{hit.company}</div>
        </div>
      </div>
      {hit.objectID === ownerId ? (
        <div className="flex items-center pl-2 pr-3 ml-2 text-xs font-semibold text-indigo-700 align-bottom bg-indigo-100 rounded-full">
          <LockIcon className="inline-block w-3 h-3 mr-1 text-indigo-800" />
          <span className="">Board Owner</span>
        </div>
      ) : (
        <Button
          text="Add Participant"
          color="tertiary"
          size="tiny"
          action={() => handleInviteParticipant(event, hit)}
        />
      )}
    </div>
  );
});

const UserSearchAutoComplete = connectAutoComplete(Autocomplete);

export default UserSearchAutoComplete;
