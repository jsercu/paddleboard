import React, { useState } from 'react';
import Container from '../../common/Container';
import BoardsHeader from './BoardsHeader';
import BoardList from './BoardList';

const Boards = () => {
  const [isShowCreateBoard, setIsShowCreateBoard] = useState(false);

  const toggleShowCreateBoard = () => {
    setIsShowCreateBoard(!isShowCreateBoard);
  };

  const addBoard = async (boardValues) => {
    const { name, description } = boardValues;
    await FirestoreService.createBoard(name, description);
    setBoards(boards);
    if (isShowCreateBoard) {
      toggleShowCreateBoard();
    }
  };

  return (
    <Container>
      <BoardsHeader
        isShowCreateBoard={isShowCreateBoard}
        toggleShowCreateBoard={toggleShowCreateBoard}
        addBoard={addBoard}
      />
      <BoardList />
    </Container>
  );
};

export default Boards;
