import React from 'react';
import { ReactComponent as PageNotFoundImage } from '../../assets/img/page-not-found.svg';

const PageNotFound404Error = () => {
  return (
    <div className="flex flex-col w-full h-full py-24 align-middle bg-gray-50">
      <div className="flex flex-col items-center justify-center h-full px-8 pb-24 text-center sm:px-24 md:px-32">
        <div className="relative mb-2">
          <PageNotFoundImage className="mb-2 w-128 h-128" />
          <a
            href="https://storyset.com/work"
            target="_blank"
            className="absolute inset-x-0 bottom-0 pb-6 mx-auto text-xs italic font-light text-gray-300 cursor-pointer hover:underline">
            Illustration by Freepik Storyset
          </a>
        </div>

        <h5 className="px-4 mb-1 text-2xl font-semibold text-gray-800 leading-6">
          Please accept our apologies. We couldn't find the page you're looking for.
        </h5>
      </div>
    </div>
  );
};

export default PageNotFound404Error;
