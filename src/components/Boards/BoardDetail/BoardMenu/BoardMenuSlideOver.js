import React from 'react';
import moment from 'moment';
import SlideOver from '../../../../common/Modals/SlideOver';
import Participants from './Fields/Participants';
import Status from './Fields/Status';
import Description from './Fields/Description';
import { ReactComponent as UserCircleIcon } from '../../../../assets/img/icons/user-circle-24.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/img/icons/calendar-24.svg';
import { ReactComponent as UsersIcon } from '../../../../assets/img/icons/users-24.svg';

const BoardMenuSlideOver = ({ toggleShowBoardMenuSlideOver, board, boardId }) => {
  const createdAt = moment(board.createdAt.toDate()).calendar();
  const owner = board.participants.filter((participant) => participant.isOwner === true)[0];
  return (
    <SlideOver toggleShowSlideOver={toggleShowBoardMenuSlideOver}>
      <div className="relative flex flex-col h-full overflow-y-scroll shadow-xl bg-gray-50">
        <div className="flex items-center justify-center bg-gray-100">
          <h5 className="py-3 text-base font-medium tracking-normal text-gray-800">Board Menu</h5>
        </div>
        <div className="flex content-start h-32 text-center bg-gradient-to-tr from-indigo-800 to-indigo-600 sm:px-6"></div>
        <div className="flex-1">
          <div className="absolute flex flex-col items-start w-full top-28">
            <div className="px-8">
              <div className="bg-gray-200 border-4 rounded-lg w-28 h-28 border-gray-50"></div>
            </div>
            <div className="w-full mt-2">
              <div className="">
                <div className="flex items-center px-8">
                  <h4 className="text-2xl font-bold text-gray-800">{board.name}</h4>
                </div>
                <div className="flex items-center px-8 mt-3">
                  <UserCircleIcon className="flex-none w-5 h-5 text-gray-500" />
                  <span className="inline-block ml-2 text-sm text-gray-600">
                    Owned by
                    <span className="ml-1 font-medium text-indigo-600">{owner.displayName}</span>
                  </span>
                </div>
                <div className="flex items-center px-8 mt-3">
                  <CalendarIcon className="flex-none w-5 h-5 text-gray-500" />
                  <span className="inline-block ml-2 text-sm text-gray-600">{`Created ${createdAt}`}</span>
                </div>
                <Participants participants={board.participants} boardId={boardId} />
                {/* <div className="flex px-8 mt-3 items-top">
                  <UsersIcon className="flex-none w-5 h-5 mt-1 text-gray-500" />
                  <div className="flex flex-wrap">
                    {board.participants.map((participant) => (
                      <div
                        key={participant.userId}
                        className="flex items-center pr-4 mx-2 bg-indigo-100 rounded-full py">
                        <img src={participant.photoURL} className="w-8 h-8 rounded-full" />
                        <span className="inline-block ml-1 text-sm font-medium text-indigo-600">
                          {participant.displayName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div> */}
                <Status status={board.status} boardId={boardId} />
                <Description description={board.description} boardId={boardId} />
              </div>
            </div>
            <div className="px-8 mt-4 space-y-4"></div>
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default BoardMenuSlideOver;
