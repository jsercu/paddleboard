import React from 'react';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../../common/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../../../assets/img/icons/plus-24.svg';

const ColumnsEmptyState = ({ toggleShowColumnModal }) => {
  return (
    <div className="flex flex-col w-full h-full py-24 align-middle bg-gray-50">
      <div className="flex flex-col items-center justify-center h-full px-8 pb-24 text-center sm:px-24 md:px-32">
        <h5 className="text-lg font-semibold text-gray-800">
          This board doesn't have any columns yet.{' '}
          <span className="hidden sm:inline-block">Add one to get started.</span>
        </h5>
        <p className="mb-3 text-sm font-normal text-gray-500">
          Columns are collections of individual tasks. Use columns to group related tasks into categories.
        </p>
        <Button
          type="button"
          text="Create Column"
          color={ButtonColorTheme.primary}
          size={ButtonSizeTheme.medium}
          rounded={ButtonRoundedTheme.medium}
          hasIcon
          action={() => toggleShowColumnModal(false)}>
          <PlusIcon title="plus-icon"></PlusIcon>
        </Button>
      </div>
    </div>
  );
};

export default ColumnsEmptyState;
