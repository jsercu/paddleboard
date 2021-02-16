import React from 'react';
import SlideOver from '../../../../components/Modals/SlideOver';
import { BoardSlideOverForm } from './BoardSlideOverForm';

const BoardSlideOver = ({ toggleShowBoardSlideOver, addBoard }) => {
  return (
    <SlideOver toggleShowSlideOver={toggleShowBoardSlideOver}>
      <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl space-y-6">
        <header className="px-4 py-6 bg-indigo-800 sm:px-6">
          <h2 className="mb-1 text-xl font-medium leading-6 text-purple-50">Create New Board</h2>
          <h5 className="text-sm font-light leading-snug text-purple-200">
            Get started by filling in the information below to create your new board.
          </h5>
        </header>
        <div className="relative flex-1">
          <BoardSlideOverForm addBoard={addBoard} toggleShowBoardSlideOver={toggleShowBoardSlideOver} />
        </div>
      </div>
    </SlideOver>
  );
};

export default BoardSlideOver;
