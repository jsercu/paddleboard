import React, { useState } from 'react';
import Modal from '../../../../../common/Modals/Modal';
import ColumnModalForm from './ColumnModalForm';

const ColumnModal = ({ addColumn, editMode, initialValues, toggleShowColumnModal, updateColumn }) => {
  return (
    <Modal toggleShowModal={toggleShowColumnModal}>
      <ColumnModalForm
        addColumn={addColumn}
        editMode={editMode}
        initialValues={initialValues}
        toggleShowColumnModal={toggleShowColumnModal}
        updateColumn={updateColumn}
      />
    </Modal>
  );
};

export default ColumnModal;
