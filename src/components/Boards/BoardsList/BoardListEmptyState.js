import React from 'react';
import Container from '../../../common/Container';
import Button from '../../../common/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../../assets/img/icons/plus-24.svg';
import CreateBoardSlideOver from './CreateBoardSlideOver';

const BoardListEmptyState = ({ isShowCreateBoard, toggleShowCreateBoard, addBoard }) => {
  return (
    <Container>
      <div className="flex flex-col">
        <div className="inline-block min-w-full min-h-full py-2 align-middle">
          <div className="overflow-hidden rounded-sm shadow-xl">
            <div className="min-w-full bg-white border border-gray-200">
              <div className="flex flex-col items-center justify-center px-12 py-24 text-center">
                <h5 className="text-lg font-semibold text-gray-800">You haven't created any boards yet.</h5>
                <p className="mb-3 text-sm font-normal text-gray-500">
                  Boards help your team organize all the information about projects you're working on.
                </p>
                <Button
                  type="button"
                  text="Create Board"
                  color="primary"
                  size="medium"
                  hasIcon
                  action={toggleShowCreateBoard}>
                  <PlusIcon title="plus-icon"></PlusIcon>
                </Button>
                {isShowCreateBoard && (
                  <CreateBoardSlideOver toggleShowCreateBoard={toggleShowCreateBoard} addBoard={addBoard} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BoardListEmptyState;
