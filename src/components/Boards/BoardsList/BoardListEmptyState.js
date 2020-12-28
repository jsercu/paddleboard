import React from 'react';
import Button from '../../../common/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../../assets/img/icons/plus-24.svg';

const BoardListEmptyState = () => {
  return (
    <div className={`flex flex-col py-36`}>
      <div className={`m-auto mb-4`}>
        <h4 className={`text-md leading-4 font-base text-gray-500`}>You haven't created any boards yet.</h4>
      </div>
      <div className={`m-auto`}>
        <Button type="button" text="Create Board" color="secondary" size="small">
          <PlusIcon title="plus-icon"></PlusIcon>
        </Button>
      </div>
    </div>
  );
};

export default BoardListEmptyState;
