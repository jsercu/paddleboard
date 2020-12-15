import React from 'react';
import BoardListItem from './BoardListItem';

const BoardList = () => {
  return (
    <div className={`flex flex-col`}>
      <div className={`-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8`}>
        <div className={`inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8`}>
          <div className={`overflow-hidden border border-gray-300 shadow-sm sm:rounded-md`}>
            <table className={`min-w-full divide-y divide-gray-200`}>
              <thead className={`bg-gray-50 divide-x divide-gray-200`}>
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
                <BoardListItem />
                <BoardListItem />
                <BoardListItem />
                <BoardListItem />
                <BoardListItem />
                <BoardListItem />
                <BoardListItem />
                <BoardListItem />
                <BoardListItem />
                <BoardListItem />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
