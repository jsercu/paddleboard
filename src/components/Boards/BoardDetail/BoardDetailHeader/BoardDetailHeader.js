import React from 'react';
import moment from 'moment';
import Button from '../../../../common/Buttons/Button';
import Container from '../../../../common/Container';
import BoardDetailHeaderDropdown from './BoardDetailHeaderDropdown';
import ParticipantsList from './ParticipantsList/ParticipantsList';
import { ReactComponent as PlusIcon } from '../../../../assets/img/icons/plus-24.svg';
import { ReactComponent as UserCircleIcon } from '../../../../assets/img/icons/user-circle-20.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/img/icons/calendar-20.svg';

const BoardDetailHeader = ({
  board,
  toggleShowBoardMenuSlideOver,
  toggleShowColumnModal,
  toggleShowDeleteBoardModal,
  toggleShowTaskSlideOver,
}) => {
  const owner = board.participants.filter((participant) => participant.isOwner === true)[0];
  const createdAt = moment(board.createdAt.toDate()).calendar();

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

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'text-orange-800 bg-orange-200 ';
      case 'Paused':
        return 'text-yellow-800 bg-yellow-200 ';
      case 'Completed':
        return 'text-green-800 bg-green-200 ';
      case 'Closed':
        return 'text-red-800 bg-red-200 ';
      case 'Not Started':
      default:
        return 'text-gray-800 bg-gray-200 ';
    }
  };

  return (
    <div className="pt-24 pb-40 bg-gradient-to-tr from-gray-900 to-gray-800">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-800 border border-gray-800 rounded-sm"></div>
            </div>
            <div className="flex-shrink ml-4">
              <div className="flex flex-row items-center text-2xl font-bold -mt-0.5">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
                  {board.name}
                </span>
                <span className={getStatusStyle(board.status) + 'px-2 mt-1 ml-3 text-xs font-semibold rounded-full'}>
                  {board.status}
                </span>
              </div>
              <div className="flex items-center mt-0.5 space-x-4">
                <div className="flex items-end">
                  <UserCircleIcon className="flex-none w-4 h-4 text-gray-600" />
                  <div className="inline-block ml-1 text-xs text-gray-400 mt-0.5">
                    Owned by
                    <span className="ml-1 font-medium text-indigo-400">{owner.displayName}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="flex-none w-4 h-4 text-gray-600" />
                  <div className="inline-block ml-1 text-xs text-gray-400 mt-0.5">
                    Created {createdAt} by
                    <span className="ml-1 font-medium text-indigo-400">{board.author.displayName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 lg:ml-4 space-x-2">
            <div className="px-4">
              <ParticipantsList participants={board.participants} />
            </div>
            <BoardDetailHeaderDropdown
              handleCreateColumn={handleCreateColumn}
              toggleShowBoardMenuSlideOver={toggleShowBoardMenuSlideOver}
              toggleShowDeleteBoardModal={toggleShowDeleteBoardModal}
              toggleShowTaskSlideOver={toggleShowTaskSlideOver}
            />
            <Button
              text="Create Task"
              type="button"
              color="transparent"
              size="medium"
              hasIcon
              action={handleCreateTask}>
              <PlusIcon className="w-5 h-5 mx-auto text-white transition ease-in-out duration-150" title="plus-icon" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BoardDetailHeader;
