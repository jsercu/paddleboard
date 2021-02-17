import React from 'react';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import StatusBadge from '../../../../components/Status/StatusBadge';
import { Link, useRouteMatch } from 'react-router-dom';

const BoardsTableRow = ({ board }) => {
  let { url } = useRouteMatch();
  const { name, id, status, participants } = board;

  // Format the createdAt date of the board
  dayjs.extend(calendar);
  const createdDate = dayjs(board.createdAt?.toDate()).calendar();

  return (
    <tr className="cursor-pointer hover:bg-gray-50">
      <td className="px-6 py-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex items-center flex-shrink-0 w-10 h-10">
            <div className="w-8 h-8 bg-gray-200 rounded-sm"></div>
          </div>
          <div className="ml-1">
            <div className="text-sm font-medium text-gray-800">{name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        <div className="flex overflow-hidden -space-x-1">
          {participants.map((participant) => (
            <img
              key={participant.userId}
              className="inline-block w-8 h-8 rounded-full ring-2 ring-white"
              src={participant.photoURL}
              alt={participant.displayName}
            />
          ))}
        </div>
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        <StatusBadge status={board.status} />
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
