import React from 'react';
import BoardList from './BoardsList/BoardList';
import BoardDetail from './BoardDetail/BoardDetail';
import { Switch, Route } from 'react-router-dom';

const Boards = ({ match }) => {
  return (
    <div className="h-screen">
      <Switch>
        <Route exact path={match.url}>
          <BoardList />
        </Route>
        <Route exact path={`${match.url}/:boardId`}>
          <BoardDetail />
        </Route>
      </Switch>
    </div>
  );
};

export default Boards;
