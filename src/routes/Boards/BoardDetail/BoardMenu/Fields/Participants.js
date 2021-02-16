import React, { useEffect, useState, useRef } from 'react';
import { firestore } from '../../../../../firebase';
import { ReactComponent as UsersIcon } from '../../../../../assets/img/icons/users-24.svg';
import { ReactComponent as PencilIcon } from '../../../../../assets/img/icons/pencil-alt-20.svg';
import { ReactComponent as LockIcon } from '../../../../../assets/img/icons/lock-20.svg';
import { Formik } from 'formik';
import Button, {
  ButtonColorTheme,
  ButtonRoundedTheme,
  ButtonSizeTheme,
} from '../../../../../components/Buttons/Button';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectAutoComplete, connectHighlight, connectPoweredBy } from 'react-instantsearch-dom';
import { ReactComponent as AlgoliaIcon } from '../../../../../assets/img/icons/algolia-light-background.svg';
import { useOnClickOutside } from '../../../../../hooks/useOnClickOutside';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);

const Participants = ({ participants, boardId }) => {
  const [editMode, setEditMode] = useState(false);
  const [participantsStore, setParticipantsStore] = useState([...participants]);

  useEffect(() => {
    setParticipantsStore([...participants]);
  }, [participants]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const addParticipant = (newParticipant) => {
    const existingParticipant = participantsStore.find((participant) => participant.userId === newParticipant.userId);
    if (existingParticipant) {
      return;
    } else {
      setParticipantsStore([...participantsStore, newParticipant]);
    }
  };

  const removeParticipant = (event, removedParticipant) => {
    if (event) {
      event.preventDefault();
    }
    const newParticipants = participantsStore.filter((participant) => participant.userId !== removedParticipant.userId);
    setParticipantsStore(newParticipants);
  };

  const updateBoardParticipants = (newParticipants) => {
    try {
      const newParticipantIds = [];
      newParticipants.forEach((participant) => {
        newParticipantIds.push(participant.userId);
      });
      let batch = firestore.batch();
      const boardRef = firestore.collection('boards').doc(boardId);
      batch.update(boardRef, { participants: newParticipants });
      boardRef.update({ participantIds: newParticipantIds });
      batch.commit();
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  if (editMode) {
    return (
      <div className="relative flex px-4 py-2 mx-4 my-1 items-top">
        <UsersIcon className="flex-none w-5 h-5 mt-1 text-gray-500" />
        <Formik
          initialValues={{ participants: participants }}
          onSubmit={(values, actions) => {
            updateBoardParticipants(participantsStore);
            toggleEditMode();
          }}>
          {(props) => (
            <form className="flex flex-col justify-between flex-grow h-full ml-2" onSubmit={props.handleSubmit}>
              <InstantSearch searchClient={searchClient} indexName="users">
                <UserSearchAutocomplete defaultRefinement="" addParticipant={addParticipant} />
                <div className="mt-1 divide-y divide-solid divide-gray-100">
                  {participantsStore.map((participant) => (
                    <div className="flex items-center justify-between p-3" key={participant.userId}>
                      <div className="flex">
                        <img
                          className="w-8 h-8 rounded-full shadow-sm"
                          src={participant.photoURL}
                          alt={participant.displayName}
                        />
                        <div className="flex-col items-center ml-2">
                          <div className="text-sm font-medium text-gray-800 leading-5">{participant.displayName}</div>
                          <div className="text-xs font-normal leading-none text-gray-500">{participant.company}</div>
                        </div>
                      </div>
                      {participant.isOwner ? (
                        <div className="flex items-center pl-2 pr-3 ml-2 text-xs font-semibold text-indigo-700 align-bottom bg-indigo-100 rounded-full">
                          <LockIcon className="inline-block w-3 h-3 mr-1 text-indigo-800" />
                          <span className="">Board Owner</span>
                        </div>
                      ) : (
                        <Button
                          text="Remove"
                          color={ButtonColorTheme.tertiary}
                          size={ButtonSizeTheme.tiny}
                          rounded={ButtonRoundedTheme.small}
                          action={() => removeParticipant(event, participant)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </InstantSearch>
              <div className="flex mt-3 space-x-2">
                <Button
                  type="submit"
                  color={ButtonColorTheme.primary}
                  size={ButtonSizeTheme.tiny}
                  rounded={ButtonRoundedTheme.small}
                  text="Update Participants"
                />
                <Button
                  type="button"
                  color={ButtonColorTheme.tertiary}
                  size={ButtonSizeTheme.tiny}
                  rounded={ButtonRoundedTheme.small}
                  text="Cancel"
                  action={toggleEditMode}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <div
      className="relative flex px-4 py-2 mx-4 my-1 rounded-sm cursor-pointer group hover:bg-gray-200 hover:bg-opacity-50 items-top"
      onClick={toggleEditMode}>
      <UsersIcon className="flex-none w-5 h-5 mt-1 text-gray-500" />
      <PencilIcon className="absolute top-0 right-0 w-4 h-4 m-2 text-gray-400 text-opacity-0 group-hover:text-opacity-100" />
      <div className="flex flex-wrap">
        {participants.map((participant) => (
          <div key={participant.userId} className="flex items-center pr-4 mx-2 bg-indigo-100 rounded-full">
            <img src={participant.photoURL} className="w-8 h-8 rounded-full" />
            <span className="inline-block ml-1 text-sm font-medium text-indigo-700">{participant.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserSearchAutocomplete = connectAutoComplete(({ hits, currentRefinement, refine, addParticipant, ownerId }) => {
  const resultsRef = useRef();
  const [isResultsPanelOpen, setIsResultsPanelOpen] = useState(false);
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
      company: hit.company || '',
      displayName: hit.displayName,
      email: hit.email,
      isOwner: false,
      photoURL: hit.photoURL,
      userId: hit.objectID,
    };
    addParticipant(participant);
    setIsResultsPanelOpen(false);
    refine();
  };

  return (
    <div className="relative" ref={resultsRef}>
      <input
        className="block w-full mt-1 text-sm placeholder-gray-400 bg-white border-gray-300 rounded-sm shadow-sm focus:ring-indigo-500 focus:outline-none focus:bg-white focus:border-transparent focus:ring-2"
        type="search"
        value={currentRefinement}
        placeholder="Search by name or organization..."
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
});

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
          color={ButtonColorTheme.tertiary}
          size={ButtonSizeTheme.tiny}
          rounded={ButtonRoundedTheme.small}
          action={() => handleInviteParticipant(event, hit)}
        />
      )}
    </div>
  );
});

export default Participants;
