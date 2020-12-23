import React, { useState, useEffect } from 'react';
import firebase, { firestore } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import BoardsHeader from './BoardsHeader';
import BoardListItem from './BoardListItem';
import BoardListEmptyState from './BoardListEmptyState';
import Container from '../../../common/Container';

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

  return boards && boards.length ? (
    <>
      <BoardsHeader
        isShowCreateBoard={isShowCreateBoard}
        toggleShowCreateBoard={toggleShowCreateBoard}
        addBoard={addBoard}
      />
      <div className="flex -mt-32">
        <Container>
          <div className="flex flex-col">
            <div className={`inline-block min-w-full min-h-full py-2 align-middle`}>
              <div className={`overflow-hidden rounded-sm shadow-xl`}>
                <div className={`min-w-full`}>
                  <div className="flex items-center justify-between py-2 border-b bg-gray-50">
                    <div className="w-full">
                      <span className="inline-block px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase align-middle">
                        Board
                      </span>
                    </div>
                    <div className="w-full">
                      <span className="inline-block px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase align-middle">
                        Participants
                      </span>
                    </div>
                    <div className="w-full">
                      <span className="inline-block px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase align-middle">
                        Created
                      </span>
                    </div>
                    <div className="flex justify-end w-full">
                      <span className="inline-block px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase align-middle sr-only">
                        Actions
                      </span>
                    </div>
                  </div>
                  <div className={`bg-white divide-y divide-gray-100`}>
                    {!!boards &&
                      boards.map((board) => (
                        <BoardListItem name={board.name} description={board.description} key={board.id} id={board.id} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  ) : (
    <BoardListEmptyState />
  );
};

export default BoardList;

// px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase
