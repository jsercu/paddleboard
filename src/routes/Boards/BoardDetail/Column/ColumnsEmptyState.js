import React from 'react';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../../components/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/plus-24.svg';
import { ReactComponent as KanbanBoardImage } from '../../../../assets/img/kanban-board.svg';

const ColumnsEmptyState = ({ toggleShowColumnModal }) => {
  return (
    <div className="flex flex-col w-full h-full py-24 align-middle bg-gray-50">
      <div className="flex flex-col items-center justify-center h-full px-8 pb-24 text-center sm:px-24 md:px-32">
        <div className="relative mb-6">
          <KanbanBoardImage className="w-96 h-96" />
          <a
            href="https://storyset.com/work"
            target="_blank"
            className="absolute inset-x-0 bottom-0 mx-auto text-xs italic font-light text-gray-300 cursor-pointer hover:underline">
            Illustration by Freepik Storyset
          </a>
        </div>

        <h5 className="px-4 mb-1 text-lg font-semibold text-gray-800 leading-6">
          This board doesn't have any columns yet. Create a new one to get started.
        </h5>
        <p className="px-4 mb-6 text-sm font-normal text-gray-500 leading-5">
          Columns are collections of related tasks. For example: 'Not Started', 'In Progress', and 'Completed'
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
