import React from 'react';
import Container from '../../common/Container';
import BoardsHeader from './BoardsHeader';
import BoardList from './BoardList';

class Boards extends React.Component {
  render() {
    return (
      <Container>
        <BoardsHeader />
        <BoardList />
      </Container>
    );
  }
}

export default Boards;
