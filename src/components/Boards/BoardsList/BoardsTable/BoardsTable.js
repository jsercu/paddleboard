import React from 'react';
import Container from '../../../../common/Container';
import BoardsTableHeader from './BoardsTableHeader';
import BoardsTableRow from './BoardsTableRow';

const BoardsTable = ({ boards }) => {
  return (
    <Container>
      <div className="flex flex-col">
        <div className="inline-block min-w-full min-h-full py-2 align-middle">
          <div className="overflow-hidden rounded-sm shadow-xl">
            <div className="min-w-full">
              <BoardsTableHeader />
              <div className="bg-white divide-y divide-gray-100">
                {!!boards &&
                  boards.map((board) => (
                    <BoardsTableRow name={board.name} description={board.description} key={board.id} id={board.id} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BoardsTable;
