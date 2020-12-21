import React, { useEffect, useState } from 'react';
import firebase, { firestore } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import Container from '../../common/Container';
import BoardsHeader from './BoardsHeader';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';

const Boards = ({ match }) => {
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

  return (
    <Container>
      <Switch>
        <Route exact path={match.url}>
          <BoardsHeader
            isShowCreateBoard={isShowCreateBoard}
            toggleShowCreateBoard={toggleShowCreateBoard}
            addBoard={addBoard}
          />
          <BoardList boards={boards} isLoading={isLoading} />
        </Route>
        <Route exact path={match.url + '/:boardId'}>
          <BoardDetail />
        </Route>
      </Switch>
    </Container>
  );
};

export default Boards;
