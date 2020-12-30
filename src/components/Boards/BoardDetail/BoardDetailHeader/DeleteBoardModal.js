import React from 'react';
import Modal from '../../../../common/Modals/Modal';
import Button from '../../../../common/Buttons/Button';
import IconButton from '../../../../common/Buttons/IconButton';
import BgPattern from '../../../../common/BgPattern/BgPattern';
import { ReactComponent as XIcon } from '../../../../assets/img/icons/x-24.svg';

const DeleteBoardModal = ({ toggleShowDeleteBoardModal, deleteBoard, id: boardId }) => {
  const handleDelete = () => {
    deleteBoard(boardId);
  };

  return (
    <Modal toggleShowModal={toggleShowDeleteBoardModal}>
      <div className="relative bg-white">
        <div className="absolute top-0 right-0 p-4">
          <IconButton backgroundType="transparent" size="small" action={toggleShowDeleteBoardModal}>
            <XIcon />
          </IconButton>
        </div>
        <BgPattern pattern="diagonalStripes" bgColor="bg-red-500">
          <div className="px-10 py-8 text-left sm:mt-0">
            <h3 className="text-2xl font-semibold text-red-50 leading-6">Delete this board?</h3>
            <div className="mt-3">
              <p className="text-sm text-white font-base leading-6">
                Are you sure you want to delete this board? All of the data for this board will be permanently removed.
                This action cannot be undone.
              </p>
            </div>
          </div>
        </BgPattern>
      </div>
      <div className="px-4 py-4 bg-gray-50 space-x-2 space-x-reverse sm:px-10 sm:flex sm:flex-row-reverse">
        <Button text="Delete Board" type="button" color="danger" size="small" action={handleDelete}></Button>
        <Button text="Cancel" type="button" color="tertiary" size="small" action={toggleShowDeleteBoardModal}></Button>
      </div>
    </Modal>
  );
};

export default DeleteBoardModal;
