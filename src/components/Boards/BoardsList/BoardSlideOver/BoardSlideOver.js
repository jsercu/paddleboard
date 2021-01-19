import React from 'react';
import SlideOver from '../../../../common/Modals/SlideOver';
import { BoardSlideOverForm } from './BoardSlideOverForm';

const BoardSlideOver = ({ toggleShowBoardSlideOver, addBoard }) => {
  return (
    <SlideOver
      panelTitle="Create New Board"
      panelSecondaryText="Get started by filling in the information below to create your new board."
      toggleShowSlideOver={toggleShowBoardSlideOver}>
      <BoardSlideOverForm addBoard={addBoard} toggleShowBoardSlideOver={toggleShowBoardSlideOver} />
    </SlideOver>
  );
};

export default BoardSlideOver;
