import React from 'react';
import Container, { ContainerWidthTheme } from '../../../components/Container';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../components/Buttons/Button';
import IconButton, {
  IconButtonColorTheme,
  IconButtonRoundedTheme,
  IconButtonSizeTheme,
} from '../../../components/Buttons/IconButton';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus-24.svg';
import { ReactComponent as FilterIcon } from '../../../assets/icons/filter-20.svg';

const BoardsListHeader = ({ toggleShowBoardSlideOver }) => {
  return (
    <div className="pt-24 pb-40 bg-gradient-to-tr from-gray-900 to-gray-800">
      <Container width={ContainerWidthTheme.large}>
        <div className="flex items-center justify-between">
          <div className="py-2 text-3xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-100">Boards List</span>
          </div>
          <div className="block space-x-2">
            <IconButton
              action={() => {}}
              ariaLabel="Filter Boards List"
              color={IconButtonColorTheme.darkGray}
              size={IconButtonSizeTheme.large}
              rounded={IconButtonRoundedTheme.medium}>
              <FilterIcon
                className="w-5 h-5 mx-auto text-white transition ease-in-out duration-150"
                title="filter-icon"
              />
            </IconButton>
            <Button
              text="Create Board"
              type="button"
              action={toggleShowBoardSlideOver}
              color={ButtonColorTheme.transparent}
              size={ButtonSizeTheme.medium}
              rounded={ButtonRoundedTheme.medium}
              hasIcon>
              <PlusIcon className="w-5 h-5 mx-auto text-white transition ease-in-out duration-150" title="plus-icon" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BoardsListHeader;
