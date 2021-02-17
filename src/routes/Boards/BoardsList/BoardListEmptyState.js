import React from 'react';
import Container, { ContainerWidthTheme } from '../../../components/Container';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../components/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../../assets/img/icons/plus-24.svg';

const BoardListEmptyState = ({ toggleShowBoardSlideOver }) => {
  return (
    <Container width={ContainerWidthTheme.large}>
      <div className="flex flex-col items-center justify-center min-w-full px-12 py-24 mt-2 text-center bg-white border border-gray-200 rounded-sm shadow-xl">
        <h5 className="text-lg font-semibold text-gray-800">You haven't created any boards yet.</h5>
        <p className="mb-3 text-sm font-normal text-gray-500">
          Boards help your team organize all the information about projects you're working on.
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
