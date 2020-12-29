import React from 'react';
import Modal from '../../../../common/Modals/Modal';
import Button from '../../../../common/Buttons/Button';
import Input from '../../../../common/Inputs/Input';

const CreateColumnModal = ({ toggleShowCreateColumnModal }) => {
  return (
    <Modal toggleShowModal={toggleShowCreateColumnModal}>
      <div className="bg-white">
        <div className="text-left sm:mt-0">
          <div className="pt-8">
            <h3 className="px-10 text-2xl font-semibold tracking-tight text-gray-800 leading-6">Create Column</h3>
          </div>
          <div className="px-10 pt-8 pb-12 text-left">
            <Input
              labelText="Column Name"
              ariaLabel="Column Name"
              name="columnName"
              type="text"
              isRequired
              color="offwhite"
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-6 bg-gray-100 space-x-2 space-x-reverse sm:px-10 sm:flex sm:flex-row-reverse">
        <Button text="Create Column" type="button" color="primary" size="medium"></Button>
        <Button
          text="Cancel"
          type="button"
          color="tertiary"
          size="medium"
          action={toggleShowCreateColumnModal}></Button>
      </div>
    </Modal>
  );
};

export default CreateColumnModal;
