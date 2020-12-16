import React from 'react';
import CreateBoardSlideOver from './CreateBoardSlideOver';
import Button from '../../common/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../assets/img/icons/plus.svg';
import { ReactComponent as ChevronDownIcon } from '../../assets/img/icons/chevron-down.svg';

const BoardsHeader = ({ isShowCreateBoard, toggleShowCreateBoard, addBoard }) => {
  return (
    <div className={`flex items-center justify-between pt-24 pb-8`}>
      <div className={`flex-auto min-w-0`}>
        <h2 className={`text-3xl font-bold leading-7 text-gray-900 sm:truncate`}>Boards</h2>
      </div>
      <div className={`flex flex-auto justify-end lg:ml-4`}>
        <span className="hidden sm:block">
          <Button
            text="Create Board"
            type="button"
            color="primary"
            size="medium"
            action={toggleShowCreateBoard}
            hasIcon>
            <PlusIcon className={`h-5 w-5 mr-2 text-white transition ease-in-out duration-150`} title="plus-icon" />
          </Button>
          {isShowCreateBoard && (
            <CreateBoardSlideOver
              toggleShowCreateBoard={toggleShowCreateBoard}
              addBoard={addBoard}></CreateBoardSlideOver>
          )}
        </span>

        {/* <!-- Dropdown --> */}
        <span className={`relative ml-3 sm:hidden`}>
          <Button
            type="button"
            text="More"
            size="medium"
            color="tertiary"
            id="mobile-menu"
            aria-haspopup="true"
            hasIcon>
            <ChevronDownIcon className={`h-5 w-5 mr-2 text-gray-500 transition ease-in-out duration-150`} />
          </Button>
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
