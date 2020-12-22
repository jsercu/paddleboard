import React from 'react';
import Button from '../../../common/Buttons/Button';
import Container from '../../../common/Container';
import IconButton from '../../../common/Buttons/IconButton';
import { ReactComponent as PlusIcon } from '../../../assets/img/icons/plus.svg';
import { ReactComponent as ChevronDownIcon } from '../../../assets/img/icons/chevron-down.svg';
import { ReactComponent as CogIcon } from '../../../assets/img/icons/cog.svg';

const BoardDetailHeader = () => {
  return (
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
                  Board Name
                </span>
                <span className={`px-2 text-xs font-semibold text-gray-800 bg-green-400 rounded-full ml-2 mt-1`}>
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
          <div className="flex lg:ml-4">
            <span className="hidden sm:block space-x-2">
              <IconButton backgroundType="darkGray" size="medium">
                <CogIcon
                  className="w-5 h-5 mx-auto text-white transition ease-in-out duration-150"
                  title="settings-icon"
                />
              </IconButton>
              <Button text="Create Column" type="button" color="transparent" size="medium" hasIcon>
                <PlusIcon
                  className={`h-5 w-5 mx-auto text-white transition ease-in-out duration-150`}
                  title="plus-icon"
                />
              </Button>
              <Button text="Create Task" type="button" color="transparent" size="medium" hasIcon>
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
                  className={`h-5 w-5 mr-2 text-gray-400 transition ease-in-out duration-150`}
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

export default BoardDetailHeader;
