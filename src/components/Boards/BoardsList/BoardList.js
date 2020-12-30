import React, { useState, useEffect } from 'react';
import firebase, { firestore } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import BoardsListHeader from './BoardsListHeader';
import BoardsTable from './BoardsTable/BoardsTable';
import BoardListEmptyState from './BoardListEmptyState';

const BoardList = () => {
  const [isShowCreateBoard, setIsShowCreateBoard] = useState(false);
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const unsubscribe = firestore.collection('boards').onSnapshot((snapshot) => {
      const newBoards = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBoards(newBoards);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleShowCreateBoard = () => {
    setIsShowCreateBoard(!isShowCreateBoard);
  };

  const addBoard = async (boardValues) => {
    const { name, description } = boardValues;
    try {
      await firestore.collection('boards').add({
        name: name,
        description: description,
        columnOrder: [],
        created: firebase.firestore.FieldValue.serverTimestamp(),
        author: auth.user.displayName,
        author_id: auth.user.uid,
        deleteStatus: false,
      });
    } catch (exception) {
      console.error(exception.toString());
    }
    if (isShowCreateBoard) {
      toggleShowCreateBoard();
    }
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <BoardsListHeader
        isShowCreateBoard={isShowCreateBoard}
        toggleShowCreateBoard={toggleShowCreateBoard}
        addBoard={addBoard}
      />
      <div className="flex -mt-32">
        {boards && boards.length ? (
          <BoardsTable boards={boards} />
        ) : (
          <BoardListEmptyState
            isShowCreateBoard={isShowCreateBoard}
            toggleShowCreateBoard={toggleShowCreateBoard}
            addBoard={addBoard}
          />
        )}
      </div>
    </>
  );
};

export default BoardList;

// px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase
