import React from 'react';
import moment from 'moment';
import { Link, useRouteMatch } from 'react-router-dom';

const BoardsTableRow = ({ board }) => {
  let { url } = useRouteMatch();
  const { name, id } = board;
  let createdDate = board.createdAt ? moment(board.createdAt.toDate()).calendar() : '';

  return (
    <tr className="cursor-pointer hover:bg-gray-50">
      <td className="px-6 py-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex items-center flex-shrink-0 w-10 h-10">
            <div className="w-8 h-8 bg-gray-200 rounded-sm"></div>
          </div>
          <div className="ml-2">
            <div className="text-sm font-medium text-gray-900">{name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        <div className="flex overflow-hidden -space-x-1">
          <img
            className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""
          />
          <img
            className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        <span className="inline-flex px-2 text-xs font-semibold text-green-900 bg-green-200 rounded-full leading-5">
          Active
        </span>
      </td>
      <td className="px-6 py-2 text-sm text-gray-500 whitespace-nowrap">{createdDate}</td>
      <td className="px-6 py-2 text-sm font-medium text-right whitespace-nowrap">
        <Link
          to={`${url}/${id}`}
          className="items-center justify-center px-3 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-md group leading-6 focus:outline-none focus:ring transition duration-150 ease-in-out shadow-sm hover:bg-gray-50 focus:ring-blue-400">
          View
        </Link>
      </td>
    </tr>
  );
};

export default BoardsTableRow;
