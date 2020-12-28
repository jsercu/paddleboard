import React, { useState } from 'react';
import BoardSettings from './BoardSettings/BoardSettings';
import Button from '../../../common/Buttons/Button';
import Container from '../../../common/Container';
import IconButton from '../../../common/Buttons/IconButton';
import Dropdown from '../../../common/Dropdown/Dropdown';
import DropdownItem from '../../../common/Dropdown/DropdownItem';
import { ReactComponent as AddColumnIcon } from '../../../assets/img/icons/view-grid-add-20.svg';
import { ReactComponent as UsersIcon } from '../../../assets/img/icons/users-20.svg';
import { ReactComponent as TrashIcon } from '../../../assets/img/icons/trash-20.svg';
import { ReactComponent as CogIcon } from '../../../assets/img/icons/cog-20.svg';
import { ReactComponent as PlusIcon } from '../../../assets/img/icons/plus-24.svg';
import { ReactComponent as ChevronDownIcon } from '../../../assets/img/icons/chevron-down-24.svg';
import { ReactComponent as ThreeDots } from '../../../assets/img/icons/three-dots-24.svg';

const BoardDetailHeader = ({ id }) => {
  const [isShowOptionsDropdown, setIsShowOptionsDropdown] = useState(false);
  const [isShowBoardSettings, setIsShowBoardSettings] = useState(false);

  const toggleShowOptionsDropdown = () => {
    setIsShowOptionsDropdown(!isShowOptionsDropdown);
  };

  const toggleShowBoardSettings = () => {
    setIsShowBoardSettings(!isShowBoardSettings);
  };

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
                  Board {id}
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
            <IconButton backgroundType="darkGray" size="medium" action={toggleShowOptionsDropdown}>
              <ThreeDots className="w-5 h-5 mx-auto text-white transition ease-in-out duration-150" title="menu-icon" />
              {!!isShowOptionsDropdown && (
                <Dropdown toggleShowDropdown={toggleShowOptionsDropdown}>
                  <span className="block md:hidden">
                    <DropdownItem text="Create Task" icon={<PlusIcon className="w-5 h-5 mr-2 text-gray-500" />} />
                  </span>
                  <DropdownItem text="Add Column" icon={<AddColumnIcon className="w-5 h-5 mr-2 text-gray-500" />} />
                  <DropdownItem text="Edit Participants" icon={<UsersIcon className="w-5 h-5 mr-2 text-gray-500" />} />
                  <DropdownItem
                    text="Board Settings"
                    icon={<CogIcon className="w-5 h-5 mr-2 text-gray-500" />}
                    action={toggleShowBoardSettings}
                  />
                  <DropdownItem text="Delete Board" icon={<TrashIcon className="w-5 h-5 mr-2 text-gray-500" />} />
                </Dropdown>
              )}
            </IconButton>
            <span className="hidden md:block md:ml-2">
              <Button text="Create Task" type="button" color="transparent" size="medium" hasIcon>
                <PlusIcon
                  className={`h-5 w-5 mx-auto text-white transition ease-in-out duration-150`}
                  title="plus-icon"
                />
              </Button>
            </span>
            {!!isShowBoardSettings && <BoardSettings toggleShowBoardSettings={toggleShowBoardSettings} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BoardDetailHeader;
