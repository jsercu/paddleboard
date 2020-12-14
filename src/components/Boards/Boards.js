import React from 'react';
import Container from '../../common/Container';
import BoardsHeader from './BoardsHeader';
import BoardsList from './BoardsList';

class Boards extends React.Component {
  render() {
    return (
      <Container>
        <BoardsHeader />
        <BoardsList />
      </Container>
    );
  }
}

export default Boards;
