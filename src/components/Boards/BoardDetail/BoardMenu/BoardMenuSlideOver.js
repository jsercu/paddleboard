import React from 'react';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import SlideOver from '../../../../common/Modals/SlideOver';
import Name from './Fields/Name';
import Owner from './Fields/Owner';
import Participants from './Fields/Participants';
import Status from './Fields/Status';
import Description from './Fields/Description';
import { ReactComponent as CalendarIcon } from '../../../../assets/img/icons/calendar-24.svg';

const BoardMenuSlideOver = ({ toggleShowBoardMenuSlideOver, board, boardId }) => {
  const { name, participants, status, description } = board;

  dayjs.extend(calendar);
  const createdAt = dayjs().calendar(dayjs(board.createdAt.toDate()));

  const owner = board.participants.filter((participant) => participant.isOwner === true)[0];
  const toggleShowBackdrop = () => setShowBackdrop(!showBackdrop);

  return (
    <SlideOver toggleShowSlideOver={toggleShowBoardMenuSlideOver}>
      <div className="relative flex flex-col h-full overflow-y-scroll shadow-xl bg-gray-50">
        <div className="z-20 flex items-center justify-center bg-gray-100">
          <h5 className="py-3 text-base font-medium tracking-normal text-gray-800">Board Menu</h5>
        </div>
        <div className="content-start flex-shrink-0 text-center h-28 bg-gradient-to-tr from-indigo-800 to-indigo-600 sm:px-6"></div>
        <div className="flex flex-col items-start w-full py-12">
          <div className="absolute px-8 top-24">
            <div className="bg-gray-200 border-4 rounded-lg w-28 h-28 border-gray-50"></div>
          </div>
          <div className="w-full mt-1">
            <Name name={name} boardId={boardId} toggleShowBackdrop={toggleShowBackdrop} />
            <Owner owner={owner} participants={participants} boardId={boardId} />
            <div className="flex items-center px-8 my-3">
              <CalendarIcon className="flex-none w-5 h-5 text-gray-500" />
              <span className="inline-block ml-2 text-sm text-gray-600">{`Created ${createdAt}`}</span>
            </div>
            <Participants participants={participants} boardId={boardId} />
            <Status status={status} boardId={boardId} />
            <Description description={description} boardId={boardId} />
          </div>
          <div className="px-8 mt-4 space-y-4"></div>
        </div>
      </div>
    </SlideOver>
  );
};

export default BoardMenuSlideOver;
