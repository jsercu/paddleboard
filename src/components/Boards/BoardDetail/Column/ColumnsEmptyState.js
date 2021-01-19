import React from 'react';
import Button from '../../../../common/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../../../assets/img/icons/plus-24.svg';

const ColumnsEmptyState = ({ toggleShowColumnModal }) => {
  return (
    <div className="flex flex-col -mt-32">
      <div className="inline-block min-w-full min-h-full py-2 align-middle">
        <div className="overflow-hidden rounded-sm shadow-xl">
          <div className="min-w-full bg-white border border-gray-200">
            <div className="flex flex-col items-center justify-center px-8 py-24 text-center sm:px-24 md:px-48">
              <h5 className="text-lg font-semibold text-gray-800">This board doesn't have any columns yet.</h5>
              <p className="mb-3 text-sm font-normal text-gray-500">
                Columns are used to group individual tasks into categories (for example:
                <span className="italic"> Not Started</span>,<span className="italic"> In Progress</span>,
                <span className="italic"> Completed</span>).
              </p>
              <Button
                type="button"
                text="Create Column"
                color="primary"
                size="medium"
                hasIcon
                action={() => toggleShowColumnModal(false)}>
                <PlusIcon title="plus-icon"></PlusIcon>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnsEmptyState;
