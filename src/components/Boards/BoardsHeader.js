import React from 'react';
import Button from '../../common/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../assets/img/icons/plus.svg';
import { ReactComponent as ChevronDownIcon } from '../../assets/img/icons/chevron-down.svg';

const BoardsHeader = () => {
  return (
    <div className={`flex items-center justify-between pt-24 pb-8`}>
      <div className={`flex-auto min-w-0`}>
        <h2 className={`text-3xl font-bold leading-7 text-gray-900 sm:truncate`}>Boards</h2>
      </div>
      <div className={`flex flex-auto justify-end lg:ml-4`}>
        <span className="hidden sm:block">
          <Button text="Create Board" type="button" color="primary" size="small">
            <PlusIcon className={`h-5 w-5 mr-2 text-white transition ease-in-out duration-150`} title="plus-icon" />
          </Button>
        </span>

        {/* <!-- Dropdown --> */}
        <span className={`relative ml-3 sm:hidden`}>
          <Button type="button" text="More" size="small" color="tertiary" id="mobile-menu" aria-haspopup="true">
            <ChevronDownIcon className={`h-5 w-5 mr-2 text-gray-500 transition ease-in-out duration-150`} />
          </Button>

          {/* <!--
              Dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
          <div
            className={`absolute right-0 w-48 py-1 mt-2 -mr-1 bg-white shadow-lg origin-top-right rounded-md ring-1 ring-black ring-opacity-5`}
            aria-labelledby="mobile-menu"
            role="menu">
            <a href="#" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`} role="menuitem">
              Edit
            </a>
            <a href="#" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`} role="menuitem">
              View
            </a>
          </div>
        </span>
      </div>
    </div>
  );
};

export default BoardsHeader;
