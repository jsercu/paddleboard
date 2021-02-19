import React, { useState, useEffect } from 'react';
import firebase, { firestore } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import BoardsListHeader from './BoardsListHeader';
import BoardsTable from './BoardsTable/BoardsTable';
import BoardListEmptyState from './BoardListEmptyState';
import BoardSlideOver from './BoardSlideOver/BoardSlideOver';
import { STATUSES } from '../../../components/Status/Status';

const BoardList = () => {
  const [isShowBoardSlideOver, setIsShowBoardSlideOver] = useState(false);
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const unsubscribe = firestore
      .collection('boards')
      .where('deleteStatus', '==', false)
      .where('participantIds', 'array-contains', auth.user.uid)
      .orderBy('createdAt', 'desc')
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
    const { name, description, participants } = boardValues;
    const participantIds = participants.map(({ userId }) => userId);
    try {
      await firestore.collection('boards').add({
        name: name,
        description: description,
        columnOrder: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        author: auth.user.uid,
        status: STATUSES.NOT_STARTED.key,
        deleteStatus: false,
        participants: participants,
        participantIds: participantIds,
      });
    } catch (exception) {
      console.error(exception.toString());
    }
    if (isShowBoardSlideOver) {
      toggleShowBoardSlideOver();
    }
  };

  if (isLoading) return null;

  return (
    <>
      <BoardsListHeader toggleShowBoardSlideOver={toggleShowBoardSlideOver} addBoard={addBoard} />
      <div className="flex -mt-32">
        <BoardsTable boards={boards} toggleShowBoardSlideOver={toggleShowBoardSlideOver} addBoard={addBoard} />
      </div>
      {isShowBoardSlideOver && (
        <BoardSlideOver toggleShowBoardSlideOver={toggleShowBoardSlideOver} addBoard={addBoard} />
      )}
    </>
  );
};

export default BoardList;
