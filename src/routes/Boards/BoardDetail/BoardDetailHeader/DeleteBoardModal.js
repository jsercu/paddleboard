import React from 'react';
import Modal from '../../../../components/Modals/Modal';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../../components/Buttons/Button';
import IconButton, {
  IconButtonColorTheme,
  IconButtonSizeTheme,
  IconButtonRoundedTheme,
} from '../../../../components/Buttons/IconButton';
import BgPattern from '../../../../components/BgPattern/BgPattern';
import { ReactComponent as XIcon } from '../../../../assets/img/icons/x-24.svg';

const DeleteBoardModal = ({ toggleShowDeleteBoardModal, deleteBoard, boardId }) => {
  const handleDelete = () => {
    deleteBoard(boardId);
  };

  return (
    <Modal toggleShowModal={toggleShowDeleteBoardModal}>
      <div className="relative bg-white">
        <div className="absolute top-0 right-0 p-4">
          <IconButton
            color={IconButtonColorTheme.transparent}
            size={IconButtonSizeTheme.medium}
            rounded={IconButtonRoundedTheme.full}
            action={toggleShowDeleteBoardModal}>
            <XIcon className="w-5 h-5 mx-auto" />
          </IconButton>
        </div>
        <BgPattern pattern="diagonalStripes" bgColor="bg-red-500">
          <div className="px-10 py-8 text-left sm:mt-0">
            <h3 className="text-2xl font-semibold text-white leading-6">Delete this board?</h3>
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
        <Button
          text="Delete Board"
          type="button"
          color={ButtonColorTheme.danger}
          size={ButtonSizeTheme.small}
          rounded={ButtonRoundedTheme.small}
          action={handleDelete}></Button>
        <Button
          text="Cancel"
          type="button"
          color={ButtonColorTheme.tertiary}
          size={ButtonSizeTheme.small}
          rounded={ButtonRoundedTheme.small}
          action={toggleShowDeleteBoardModal}></Button>
      </div>
    </Modal>
  );
};

export default DeleteBoardModal;
