import React, { useState, useEffect } from 'react';
import BoardListItem from './BoardListItem';
import BoardListEmptyState from './BoardListEmptyState';

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBoards([{ id: '1', name: 'Board Name' }]);
    setIsLoading(false);
  }, []);

  const boardsListItems = boards.length ? (
    boards.map((board) => <BoardListItem name={board.name} key={board.id} />)
  ) : (
    <tr>
      <td>
        <span>You haven't added any boards yet.</span>
      </td>
    </tr>
  );

  if (isLoading) {
    return <></>;
  }

  return boards && boards.length ? (
    <div className={`flex flex-col`}>
      <div className={`-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8`}>
        <div className={`inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8`}>
          <div className={`overflow-hidden border border-gray-300 shadow-sm rounded-sm`}>
            <table className={`min-w-full divide-y divide-gray-200`}>
              <thead className={`bg-gray-100 divide-x divide-gray-200`}>
                <tr>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`}>
                    Name
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`}>
                    Team Members
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`}>
                    Created
                  </th>
                  <th scope="col" className={`relative px-6 py-3`}>
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className={`bg-white divide-y divide-gray-100`}>
                {boards.map((board) => (
                  <BoardListItem name={board.name} key={board.id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <BoardListEmptyState />
  );
};

export default BoardList;
