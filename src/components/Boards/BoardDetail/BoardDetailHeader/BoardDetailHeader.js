import React, { useState } from 'react';
import Button from '../../../../common/Buttons/Button';
import Container from '../../../../common/Container';
import BoardDetailHeaderDropdown from './BoardDetailHeaderDropdown';
import { ReactComponent as PlusIcon } from '../../../../assets/img/icons/plus-24.svg';

const BoardDetailHeader = ({
  id,
  toggleShowBoardSettings,
  toggleShowCreateColumnModal,
  toggleShowDeleteBoardModal,
  toggleShowCreateTaskSlideOver,
}) => {
  return (
    <>
      <div className="pt-24 pb-40 bg-gradient-to-tr from-gray-900 to-gray-800">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-800 border border-gray-800 rounded-sm"></div>
              </div>
              <div className="ml-4">
                <div className="flex flex-row items-center text-2xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
                    Board {id}
                  </span>
                  <span className="px-2 mt-1 ml-2 text-xs font-semibold text-gray-800 bg-green-400 rounded-full">
                    Active
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">
                    Board description text goes here. We'll probably need a way of truncating this content...
                  </span>
                </div>
              </div>
            </div>
            <div className="flex lg:ml-4 space-x-2">
              <BoardDetailHeaderDropdown
                toggleShowBoardSettings={toggleShowBoardSettings}
                toggleShowCreateColumnModal={toggleShowCreateColumnModal}
                toggleShowDeleteBoardModal={toggleShowDeleteBoardModal}
                toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver}
              />
              <Button
                text="Create Task"
                type="button"
                color="transparent"
                size="medium"
                hasIcon
                action={toggleShowCreateTaskSlideOver}>
                <PlusIcon
                  className="w-5 h-5 mx-auto text-white transition ease-in-out duration-150"
                  title="plus-icon"
                />
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BoardDetailHeader;
