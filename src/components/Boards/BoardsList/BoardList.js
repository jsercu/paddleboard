import React, { useState, useEffect } from 'react';
import firebase, { firestore } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import BoardsListHeader from './BoardsListHeader';
import BoardsTable from './BoardsTable/BoardsTable';
import BoardListEmptyState from './BoardListEmptyState';
import BoardSlideOver from './BoardSlideOver/BoardSlideOver';

const BoardList = () => {
  const [isShowBoardSlideOver, setIsShowBoardSlideOver] = useState(false);
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const unsubscribe = firestore
      .collection('boards')
      .where('deleteStatus', '==', false)
      .onSnapshot((snapshot) => {
        const newBoards = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBoards(newBoards);
        setIsLoading(false);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleShowBoardSlideOver = () => {
    setIsShowBoardSlideOver(!isShowBoardSlideOver);
  };

  const addBoard = async (boardValues) => {
    const { name, description } = boardValues;
    try {
      await firestore.collection('boards').add({
        name: name,
        description: description,
        columnOrder: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        author: auth.user.displayName,
        authorId: auth.user.uid,
        deleteStatus: false,
      });
    } catch (exception) {
      console.error(exception.toString());
    }
    if (isShowBoardSlideOver) {
      toggleShowBoardSlideOver();
    }
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <BoardsListHeader toggleShowBoardSlideOver={toggleShowBoardSlideOver} addBoard={addBoard} />
      <div className="flex -mt-32">
        {boards && boards.length ? (
          <BoardsTable boards={boards} />
        ) : (
          <BoardListEmptyState toggleShowBoardSlideOver={toggleShowBoardSlideOver} addBoard={addBoard} />
        )}
      </div>
      {isShowBoardSlideOver && (
        <BoardSlideOver toggleShowBoardSlideOver={toggleShowBoardSlideOver} addBoard={addBoard} />
      )}
    </>
  );
};

export default BoardList;
