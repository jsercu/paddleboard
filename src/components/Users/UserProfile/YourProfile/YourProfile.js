import React, { useState } from 'react';
import { YourProfileForm } from './YourProfileForm';
import Button from '../../../../common/Buttons/Button';

const YourProfile = ({ user, userId, updateUser }) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((editMode) => !editMode);
  };
  return (
    <div className="shadow sm:rounded-sm sm:overflow-hidden">
      <div className="bg-white">
        {editMode && (
          <YourProfileForm
            initialValues={user}
            userId={userId}
            updateUser={updateUser}
            toggleEditMode={toggleEditMode}
          />
        )}
        {!editMode && (
          <div>
            <div className="px-12 pt-6 grid grid-cols-12">
              <div className="p-4 col-span-7 sm:px-0">
                <h3 className="text-lg font-medium text-gray-900 leading-6">Your Profile</h3>
                <p className="text-sm text-gray-500 leading-5">
                  This information may be displayed publicly so be careful about what you share.
                </p>
              </div>
              <div className="py-6 text-right col-span-5 place-self-stretch">
                <Button
                  text="Edit Profile"
                  type="submit"
                  color="tertiary"
                  size="medium"
                  action={toggleEditMode}></Button>
              </div>
            </div>
            <div className="px-12 pb-12 mt-4">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6">
                  <span className="text-sm text-gray-500 leading-5">Display Name:</span>
                  <p className="text-sm text-black">{user.displayName}</p>
                </div>
                <div className="col-span-6">
                  <span className="text-sm text-gray-500 leading-5">Location:</span>
                  <p className="text-sm text-black">{user.location}</p>
                </div>
                <div className="col-span-6">
                  <span className="text-sm text-gray-500 leading-5">Title / Role:</span>
                  <p className="text-sm text-black">{user.title}</p>
                </div>
                <div className="col-span-6">
                  <span className="text-sm text-gray-500 leading-5">Company / Organization:</span>
                  <p className="text-sm text-black">{user.company}</p>
                </div>
                <div className="col-span-12">
                  <span className="text-sm text-gray-500 leading-5">Personal Bio:</span>
                  <p className="text-sm text-black">{user.bio}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourProfile;
