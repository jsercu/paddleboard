import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const BoardListItem = ({ name, description, id }) => {
  let { path, url } = useRouteMatch();

  return (
    <tr>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex-col items-center">
          <div className={`flex flex-row items-center`}>
            <div className={`text-sm font-medium text-gray-800 mr-2`}>{name}</div>
            <span className={`px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full`}>Active</span>
          </div>
          <div className={`text-sm text-gray-500`}>{description}</div>
        </div>
      </td>
      <td className={`px-6 py-3 whitespace-nowrap`}>
        <div className={`flex flex-row-reverse justify-end mr-2`}>
          <img
            className={`inline-block w-8 h-8 rounded-full ring-2 ring-white`}
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            className={`inline-block w-8 h-8 rounded-full ring-2 ring-white`}
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""
          />
          <img
            className={`inline-block w-8 h-8 rounded-full ring-2 ring-white`}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </td>
      <td className={`px-6 py-3 text-sm text-gray-500 whitespace-nowrap`}></td>
      <td className={`px-6 py-3 text-sm font-medium text-center whitespace-nowrap`}>
        <Link to={`${url}/${id}`} className={`font-medium text-sm text-blue-600 hover:text-blue-500`}>
          View
        </Link>
      </td>
    </tr>
  );
};

export default BoardListItem;
