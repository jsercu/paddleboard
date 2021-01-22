import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { firestore } from '../../../firebase';
import Container from '../../../common/Container';
import Button from '../../../common/Buttons/Button';
import YourProfile from '../../Users/UserProfile/YourProfile/YourProfile';
import { ReactComponent as LocationIcon } from '../../../assets/img/icons/location-20.svg';

const UserProfile = () => {
  const auth = useAuth();

  const updateUser = async (userValues, userId) => {
    const { displayName, title, company, location, bio } = userValues;
    try {
      await firestore
        .collection('users')
        .doc(userId)
        .update({ displayName: displayName, title: title, company, company, location: location, bio: bio });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  return (
    <div>
      <div className="pt-24 pb-40 bg-gradient-to-tr from-gray-900 to-gray-800">
        <Container width="medium">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Edit user profile photo</span>
                  <img className="w-20 h-20 rounded-full" src={auth.user.photoURL} alt="User Profile Photo" />
                </button>
              </div>
              <div className="ml-4">
                <div className="flex flex-row items-center text-2xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
                    {auth.userProfile.displayName}
                  </span>
                  <span className="px-2 mt-1 ml-2 text-xs font-semibold text-gray-800 bg-green-400 rounded-full">
                    Active
                  </span>
                </div>
                <div className="text-sm">
                  <div className="flex flex-row items-center">
                    <LocationIcon className="w-4 h-4 text-gray-500" />
                    <span className="ml-1 font-medium text-gray-400">{auth.userProfile.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex lg:ml-4 space-x-2">
              <Button text="Lorem" type="button" color="transparent" size="medium"></Button>
              <Button text="Lorem Ipsum" type="button" color="primary" size="medium"></Button>
            </div>
          </div>
        </Container>
      </div>
      <div className="-mt-32">
        <Container width="medium">
          <YourProfile user={auth.userProfile} userId={auth.user.uid} updateUser={updateUser} />
        </Container>
      </div>
    </div>
  );
};

export default UserProfile;
