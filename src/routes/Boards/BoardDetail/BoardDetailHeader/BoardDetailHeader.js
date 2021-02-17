import React from 'react';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../../components/Buttons/Button';
import StatusBadge from '../../../../components/Status/StatusBadge.js';
import BoardDetailHeaderDropdown from './BoardDetailHeaderDropdown';
import ParticipantsList from './ParticipantsList/ParticipantsList';
import { ReactComponent as PlusIcon } from '../../../../assets/img/icons/plus-24.svg';
import { ReactComponent as UserCircleIcon } from '../../../../assets/img/icons/user-circle-20.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/img/icons/calendar-20.svg';
import { ReactComponent as UsersIcon } from '../../../../assets/img/icons/users-20.svg';

const BoardDetailHeader = ({
  board,
  toggleShowBoardMenuSlideOver,
  toggleShowColumnModal,
  toggleShowDeleteBoardModal,
  toggleShowTaskSlideOver,
}) => {
  const owner = board.participants.filter((participant) => participant.isOwner === true)[0];

  // Format the createdAt date of the board
  dayjs.extend(calendar);
  const createdAt = dayjs(board.createdAt.toDate()).calendar();

  const handleCreateTask = (event) => {
    if (event) {
      event.preventDefault();
    }
    toggleShowTaskSlideOver(false);
  };

  const handleCreateColumn = (event) => {
    if (event) {
      event.preventDefault();
    }
    toggleShowColumnModal(false);
  };

  return (
    <div className="px-4 pt-20 pb-4 lg:flex lg:items-center lg:justify-between bg-gradient-to-tr from-gray-900 to-gray-800">
      <div className="flex-1 min-w-0">
        <div className="flex flex-row items-center">
          <h2 className="text-xl font-bold text-gray-900 leading-7 sm:truncate">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
              {board.name}
            </span>
          </h2>
          <div className="hidden sm:block">
            <StatusBadge status={board.status} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-4">
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <UserCircleIcon className="flex-none w-4 h-4 text-gray-600" />
            <span className="inline-block ml-1 text-xs text-gray-400 mt-0.5">
              Owned by
              <span className="ml-1 font-medium text-indigo-400">{owner.displayName}</span>
            </span>
          </div>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <CalendarIcon className="flex-none w-4 h-4 text-gray-600" />
            <span className="inline-block ml-1 text-xs text-gray-400 mt-0.5">
              Created {createdAt} by
              <span className="ml-1 font-medium text-indigo-400">{board.author.displayName}</span>
            </span>
          </div>
          <div className="flex items-center mt-1 text-sm text-gray-500 lg:hidden">
            <UsersIcon className="flex-none w-4 h-4 text-gray-600" />
            <ul className="inline-flex ml-1 space-x-1">
              {board.participants.map((participant, index) => (
                <li key={participant.userId}>
                  <span className="text-xs font-medium text-indigo-400">{participant.displayName}</span>
                  {index !== board.participants.length - 1 && <span className="text-gray-400">,</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="items-center hidden mr-16 lg:flex">
        <div className="mt-1">
          <ParticipantsList participants={board.participants} />
        </div>
      </div>
      <div className="flex items-center mt-5 lg:mt-0 lg:ml-4">
        <div>
          <BoardDetailHeaderDropdown
            handleCreateColumn={handleCreateColumn}
            toggleShowBoardMenuSlideOver={toggleShowBoardMenuSlideOver}
            toggleShowDeleteBoardModal={toggleShowDeleteBoardModal}
            toggleShowTaskSlideOver={toggleShowTaskSlideOver}
          />
        </div>
        <div className="ml-3">
          <Button
            text="Create Task"
            type="button"
            color={ButtonColorTheme.primary}
            size={ButtonSizeTheme.medium}
            rounded={ButtonRoundedTheme.medium}
            hasIcon
            action={handleCreateTask}>
            <PlusIcon className="w-5 h-5 mx-auto text-white transition ease-in-out duration-150" title="plus-icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetailHeader;
