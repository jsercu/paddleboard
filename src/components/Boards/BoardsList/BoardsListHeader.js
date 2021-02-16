import React from 'react';
import Container, { ContainerWidthTheme } from '../../../common/Container';
import Button, { ButtonColorTheme, ButtonRoundedTheme, ButtonSizeTheme } from '../../../common/Buttons/Button';
import IconButton, {
  IconButtonColorTheme,
  IconButtonRoundedTheme,
  IconButtonSizeTheme,
} from '../../../common/Buttons/IconButton';
import { ReactComponent as PlusIcon } from '../../../assets/img/icons/plus-24.svg';
import { ReactComponent as ChevronDownIcon } from '../../../assets/img/icons/chevron-down-24.svg';
import { ReactComponent as FilterIcon } from '../../../assets/img/icons/filter-20.svg';

const BoardsHeader = ({ toggleShowBoardSlideOver }) => {
  return (
    <div className="pt-24 pb-40 bg-gradient-to-tr from-gray-900 to-gray-800">
      <Container width={ContainerWidthTheme.large}>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="py-2 text-3xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightblue-100 to-gray-100">
                Boards List
              </span>
            </div>
          </div>
          <div className="flex lg:ml-4">
            <span className="hidden sm:block space-x-2">
              <IconButton
                color={IconButtonColorTheme.darkGray}
                size={IconButtonSizeTheme.large}
                rounded={IconButtonRoundedTheme.medium}>
                <FilterIcon
                  className="w-5 h-5 mx-auto text-white transition ease-in-out duration-150"
                  title="settings-icon"
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
                <PlusIcon
                  className={`h-5 w-5 mx-auto text-white transition ease-in-out duration-150`}
                  title="plus-icon"
                />
              </Button>
            </span>

            {/* <!-- Dropdown --> */}
            <span className={`relative ml-3 sm:hidden`}>
              <Button
                type="button"
                text="More"
                size="medium"
                color="transparent"
                id="mobile-menu"
                aria-haspopup="true"
                hasIcon>
                <ChevronDownIcon
                  className={`h-5 w-5 mr-2 text-white transition ease-in-out duration-150`}
                  title="chevron-down-icon"
                />
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
      </Container>
    </div>
  );
};

export default BoardsHeader;
