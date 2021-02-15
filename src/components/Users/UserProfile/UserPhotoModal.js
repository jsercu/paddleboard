import React, { useState, useMemo } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useDropzone } from 'react-dropzone';
import { firestore, storage } from '../../../firebase';
import Modal from '../../../common/Modals/Modal';
import Button from '../../../common/Buttons/Button';
import IconButton from '../../../common/Buttons/IconButton';
import { ReactComponent as XIcon } from '../../../assets/img/icons/x-24.svg';
import { ReactComponent as UploadPictureIcon } from '../../../assets/img/icons/upload-picture-48.svg';

const UserPhotoModal = ({ toggleShowUserPhotoModal }) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
    onDropAccepted: (files) => {
      setUploadedImg(
        files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      setShowImagePreview(true);
    },
  });

  const [showImagePreview, setShowImagePreview] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(false);
  const auth = useAuth();

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '37px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
    color: '#64748B',
    fontSize: '0.875rem',
    outline: 'none',
  };

  const activeStyle = {
    borderColor: '#4338CA',
  };

  const acceptStyle = {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
    backgroundColor: '#FEF2F2',
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const storeProfilePhoto = async (profilePhoto) => {
    const userId = auth.user.uid;
    const uploadTask = storage.ref(`profileImages/${userId}/${profilePhoto.name}`).put(profilePhoto);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error.toString());
      },
      async () => {
        // Handle successful uploads on complete
        const photoURL = await uploadTask.snapshot.ref.getDownloadURL();
        updateUserPhotoInfo(photoURL, userId);
        toggleShowUserPhotoModal();
      },
    );
  };

  const updateUserPhotoInfo = async (profilePhotoURL, userId) => {
    try {
      // Some User Profile information is stored both on user doc AND on any board doc
      // where user is a participant ( in order to reduce number of database reads for commonly accessed items )
      const batch = firestore.batch();
      // Update photoURL on user doc
      const userRef = firestore.collection('users').doc(userId);
      batch.update(userRef, { photoURL: profilePhotoURL });
      // Query for all boards where user is participant
      const userBoards = [];
      await firestore
        .collection('boards')
        .where('participantIds', 'array-contains', userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userBoards.push({ boardData: doc.data(), boardId: doc.id });
          });
        });
      // Update participants array with new user photoURL
      userBoards.forEach(({ boardData, boardId }) => {
        const newBoard = { ...boardData };
        const newParticipant = newBoard.participants.filter((participant) => participant.userId == userId)[0];
        newParticipant.photoURL = profilePhotoURL;
        const newParticipants = [
          ...newBoard.participants.filter((participant) => participant.userId != userId),
          newParticipant,
        ];
        newBoard.participants = newParticipants;
        const boardRef = firestore.collection('boards').doc(boardId);
        batch.update(boardRef, { participants: newParticipants });
      });
      batch.commit();
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    storeProfilePhoto(uploadedImg[0]);
  };

  return (
    <Modal toggleShowModal={toggleShowUserPhotoModal}>
      <div className="relative bg-white">
        <div className="px-10 text-left sm:mt-0">
          <div className="flex justify-between pt-8">
            <h3 className="text-xl font-medium tracking-tight text-gray-800 leading-6">Edit Profile Photo</h3>
            <IconButton backgroundType="white" size="small" action={toggleShowUserPhotoModal}>
              <XIcon />
            </IconButton>
          </div>
          <section className="py-8 cursor-pointer">
            {!showImagePreview && (
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <UploadPictureIcon className={`${isDragReject ? 'text-red-500' : 'text-gray-400'} w-10 h-10`} />
                {!isDragReject ? (
                  <div className="text-center">
                    <p>
                      <span className="font-medium text-indigo-600 hover:underline">Upload a photo </span>or drag and
                      drop
                    </p>
                    <span className="text-xs">PNG or JPG up to 5MB</span>
                  </div>
                ) : (
                  <div className="text-center text-red-600">
                    <p>
                      <span className="font-medium hover:underline">Upload a photo </span>or drag and drop
                    </p>
                    <span className="text-xs font-semibold">Files of this type are not accepted</span>
                  </div>
                )}
              </div>
            )}
            {showImagePreview && (
              <div className="flex items-center justify-center">
                <img
                  src={uploadedImg[0].preview}
                  className="w-40 h-40 border border-gray-100 rounded-full shadow-sm"></img>
              </div>
            )}
          </section>
        </div>
      </div>
      <div className="px-4 py-4 bg-gray-50 space-x-2 space-x-reverse sm:px-10 sm:flex sm:flex-row-reverse">
        <Button text="Update Photo" type="button" color="primary" size="small" action={handleSubmit}></Button>
        <Button text="Cancel" type="button" color="tertiary" size="small" action={toggleShowUserPhotoModal}></Button>
      </div>
    </Modal>
  );
};

export default UserPhotoModal;
