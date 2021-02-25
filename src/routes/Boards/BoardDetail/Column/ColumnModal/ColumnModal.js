import React, { useState } from 'react';
import Modal from '../../../../../components/Modals/Modal';
import IconButton, {
  IconButtonColorTheme,
  IconButtonSizeTheme,
  IconButtonRoundedTheme,
} from '../../../../../components/Buttons/IconButton';
import { ReactComponent as XIcon } from '../../../../../assets/icons/x-24.svg';
import ColumnModalForm from './ColumnModalForm';

const ColumnModal = ({ addColumn, editMode, initialValues, toggleShowColumnModal, updateColumn }) => {
  return (
    <Modal toggleShowModal={toggleShowColumnModal}>
      <div className="relative bg-white">
        <div className="absolute top-0 right-0 p-4">
          <IconButton
            ariaLabel="Dismiss Column"
            color={IconButtonColorTheme.lightGray}
            size={IconButtonSizeTheme.medium}
            rounded={IconButtonRoundedTheme.full}
            action={toggleShowColumnModal}>
            <XIcon className="w-5 h-5 mx-auto" />
          </IconButton>
        </div>
        <ColumnModalForm
          addColumn={addColumn}
          editMode={editMode}
          initialValues={initialValues}
          toggleShowColumnModal={toggleShowColumnModal}
          updateColumn={updateColumn}
        />
      </div>
    </Modal>
  );
};

export default ColumnModal;
