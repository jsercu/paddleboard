import React from 'react';
import Container, { ContainerWidthTheme } from '../../../components/Container';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../components/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus-24.svg';
import { ReactComponent as BrainstormingBoardImg } from '../../../assets/img/brainstorming-board.svg';

const BoardListEmptyState = ({ toggleShowBoardSlideOver }) => {
  return (
    <Container width={ContainerWidthTheme.large}>
      <div className="flex flex-col items-center justify-center min-w-full px-12 pt-8 pb-24 mt-2 text-center bg-white border border-gray-200 rounded-sm shadow-xl">
        <div className="relative mb-2">
          <BrainstormingBoardImg className="w-96 h-96" />
          <a
            href="https://storyset.com/work"
            target="_blank"
            className="absolute inset-x-0 bottom-0 pb-4 mx-auto text-xs italic font-light text-gray-300 cursor-pointer hover:underline">
            Illustration by Freepik Storyset
          </a>
        </div>
        <h5 className="text-lg font-semibold text-gray-800 leading-6">
          You're not participant on any boards yet. Create a new board to get started.
        </h5>
        <p className="mb-6 text-sm font-normal text-gray-500 leading-5">
          Boards help you categorize and track all the information about project while you are working on it.
        </p>
        <Button
          type="button"
          text="Create Board"
          color={ButtonColorTheme.primary}
          size={ButtonSizeTheme.medium}
          rounded={ButtonRoundedTheme.medium}
          hasIcon
          action={toggleShowBoardSlideOver}>
          <PlusIcon title="plus-icon"></PlusIcon>
        </Button>
      </div>
    </Container>
  );
};

export default BoardListEmptyState;
