import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const BoardListItem = ({ name, description, id }) => {
  let { path, url } = useRouteMatch();

  return (
    <div className="flex items-center justify-between cursor-pointer group bg-gradient-to-r from-white to-white hover:from-gray-50 transition duration-150 ease-in-out">
      <div className="w-full px-6 py-3 whitespace-nowrap">
        <div className="flex-col items-center">
          <div className="mr-2 text-sm font-medium text-gray-800">{name}</div>
          <div className="text-sm font-normal text-gray-500">{description}</div>
        </div>
      </div>
      <div className="flex w-full">
        <div className={`flex flex-row-reverse justify-start mx-3`}>
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
      </div>
      <div className={`w-full px-6 py-3 text-sm text-gray-500 whitespace-nowrap`}></div>
      <div className={`w-full px-6 py-3 text-sm font-medium text-center whitespace-nowrap`}>
        <div className="flex justify-end">
          <div className="opacity-0 group-hover:opacity-100">
            <Link
              to={`${url}/${id}`}
              className="items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 group leading-6 focus:outline-none focus:ring transition duration-150 ease-in-out shadow-sm hover:bg-gray-50 focus:ring-blue-400 rounded-md">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardListItem;
