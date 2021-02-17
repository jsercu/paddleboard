import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../../components/Buttons/Button';
import { withFormik } from 'formik';
import { object as YupObject, string as YupString } from 'yup';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import UserSearchAutocomplete from './UserSearchAutocomplete';
import { ReactComponent as LockIcon } from '../../../../assets/img/icons/lock-20.svg';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);

const BoardSlideOverForm = (props) => {
  const auth = useAuth();
  const [participantsStore, setParticipantsStore] = useState([
    {
      displayName: auth.userProfile.displayName,
      email: auth.userProfile.email,
      company: auth.userProfile.company,
      photoURL: auth.userProfile.photoURL,
      userId: auth.user.uid,
      isOwner: true,
    },
  ]);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    toggleShowBoardSlideOver,
  } = props;
  const { name, description } = values;

  useEffect(() => {
    setFieldValue('participants', participantsStore);
  }, [participantsStore]);

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

  return (
    <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
      <div className="px-4 sm:px-6">
        <div>
          <label htmlFor="name" className="block">
            <span className="block text-sm font-medium text-gray-700 leading-5">Name</span>
            <input
              className={`${
                errors.name && touched.name
                  ? 'border-transparent ring-2 ring-red-600 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-indigo-500'
              } bg-gray-50 block w-full mt-1 text-sm rounded-sm shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2`}
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={name}
              name="name"
            />
          </label>
          <div id="error-container" className="h-5 mt-2">
            {errors.name && touched.name && (
              <div id="feedback" className="text-xs text-red-700">
                {errors.name}
              </div>
            )}
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="name" className="block">
            <span className="block text-sm font-medium text-gray-700 leading-5">Description</span>
            <textarea
              className="block w-full mt-1 text-sm border-gray-300 rounded-sm bg-gray-50 shadow-sm focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              rows="5"
              onChange={handleChange}
              onBlur={handleBlur}
              value={description}
              name="description"
            />
          </label>
          <div id="error-container" className="h-5 mt-2">
            {errors.description && touched.description && (
              <div id="feedback" className="text-xs text-red-700">
                {errors.description}
              </div>
            )}
          </div>
        </div>
        <InstantSearch searchClient={searchClient} indexName="users">
          <UserSearchAutocomplete defaultRefinement="" addParticipant={addParticipant} ownerId={auth.user.uid} />
          <div className="mt-1 divide-y divide-solid divide-gray-100">
            {!participantsStore.length && (
              <div className="flex-col items-center justify-center px-3 py-4 text-left">
                <h5 className="text-sm font-semibold text-gray-600">No participants added yet.</h5>
                <p className="mb-3 text-xs font-normal text-gray-400">
                  We'll send out an invitation to join the board to all of the participants on this list.
                </p>
              </div>
            )}
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
      </div>
      <div className="flex px-4 py-4 border-t border-gray-200 bg-gray-50 b sm:px-6 space-x-4">
        <Button
          type="submit"
          color={ButtonColorTheme.primary}
          size={ButtonSizeTheme.medium}
          rounded={ButtonRoundedTheme.medium}
          text="Create Board"
        />
        <Button
          type="button"
          action={toggleShowBoardSlideOver}
          color={ButtonColorTheme.tertiary}
          size={ButtonSizeTheme.medium}
          rounded={ButtonRoundedTheme.medium}
          text="Cancel"
        />
      </div>
    </form>
  );
};

const BoardSlideOverFormExtended = withFormik({
  mapPropsToValues: () => ({
    name: '',
    description: '',
    participants: [],
  }),
  validationSchema: YupObject().shape({
    name: YupString().required('This field is required.'),
  }),
  validateOnBlur: false,
  validateOnChange: false,

  handleSubmit: (values, FormikBag) => {
    const { name, description, participants } = values;
    const boardValues = {
      name: name,
      description: description,
      participants: participants,
    };
    FormikBag.props.addBoard(boardValues);
    FormikBag.setSubmitting(false);
    FormikBag.props.toggleShowBoardSlideOver();
  },
})(BoardSlideOverForm);

export { BoardSlideOverFormExtended as BoardSlideOverForm };
