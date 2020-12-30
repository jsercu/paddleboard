import React, { useState } from 'react';
import { firestore } from '../../../firebase';
import { useHistory } from 'react-router-dom';
import Container from '../../../common/Container';
import BoardDetailHeader from './BoardDetailHeader/BoardDetailHeader';
import BoardSettings from './BoardDetailHeader/BoardSettings';
import CreateColumnModal from './Column/CreateColumnModal';
import DeleteBoardModal from './BoardDetailHeader/DeleteBoardModal';
import CreateTaskSlideOver from './Task/CreateTaskSlideOver';
import Column from './Column/Column';
import { useParams } from 'react-router-dom';

const columns = [
  {
    name: 'Backlog',
    id: 1,
    tasks: [
      {
        id: 1,
        name: 'Add discount code to checkout page',
        category: 'Feature Request',
        created: 'Dec 12 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 2,
        name: 'Provide documentation on integrations',
        category: 'Product Documentation',
        created: 'Nov 28 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 3,
        name: 'Design shopping cart dropdown',
        category: 'Design',
        created: 'Oct 03 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ],
  },
  {
    name: 'In Progress',
    id: 2,
    tasks: [
      {
        id: 1,
        name: 'Add discount code to checkout page',
        category: 'Feature Request',
        created: 'Dec 12 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 3,
        name: 'Design shopping cart dropdown',
        category: 'Design',
        created: 'Oct 03 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 2,
        name: 'Provide documentation on integrations',
        category: 'Product Documentation',
        created: 'Nov 28 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ],
  },
  {
    name: 'Completed',
    id: 3,
    tasks: [
      {
        id: 1,
        name: 'Provide documentation on integrations',
        category: 'Product Documentation',
        created: 'Nov 28 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 2,
        name: 'Design shopping cart dropdown',
        category: 'Design',
        created: 'Oct 03 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 3,
        name: 'Add discount code to checkout page',
        category: 'Feature Request',
        created: 'Dec 12 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 4,
        name: 'Implement End-to-End Encryption',
        category: 'Backend',
        created: 'Oct 03 2020',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ],
  },
];

const BoardDetail = () => {
  let { boardId } = useParams();
  let history = useHistory();
  const [isShowBoardSettings, setIsShowBoardSettings] = useState(false);
  const [isShowCreateColumnModal, setIsShowCreateColumnModal] = useState(false);
  const [isShowDeleteBoardModal, setIsShowDeleteBoardModal] = useState(false);
  const [isShowCreateTaskSlideOver, setIsShowCreateTaskSlideOver] = useState(false);

  const deleteBoard = async (boardId) => {
    try {
      await firestore
        .collection('boards')
        .doc(boardId)
        .delete()
        .then(() => {
          toggleShowDeleteBoardModal();
          history.push('/boards');
        });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const toggleShowBoardSettings = () => {
    setIsShowBoardSettings(!isShowBoardSettings);
  };

  const toggleShowCreateColumnModal = () => {
    setIsShowCreateColumnModal(!isShowCreateColumnModal);
  };

  const toggleShowDeleteBoardModal = () => {
    setIsShowDeleteBoardModal(!isShowDeleteBoardModal);
  };

  const toggleShowCreateTaskSlideOver = () => {
    setIsShowCreateTaskSlideOver(!isShowCreateTaskSlideOver);
  };

  return (
    <>
      <div className="w-full h-full bg-gray-200">
        <BoardDetailHeader
          id={boardId}
          isShowBoardSettings={isShowBoardSettings}
          toggleShowBoardSettings={toggleShowBoardSettings}
          isShowCreateColumnModal={isShowCreateColumnModal}
          toggleShowCreateColumnModal={toggleShowCreateColumnModal}
          isShowDeleteBoardModal={isShowDeleteBoardModal}
          toggleShowDeleteBoardModal={toggleShowDeleteBoardModal}
          isShowCreateTaskSlideOver={isShowCreateTaskSlideOver}
          toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver}
        />
        <Container>
          <div className="-mt-32 grid grid-cols-3 gap-8">
            {columns && columns.map(({ name, id, tasks }) => <Column key={id} name={name} tasks={tasks} />)}
          </div>
        </Container>
      </div>
      {!!isShowCreateColumnModal && <CreateColumnModal toggleShowCreateColumnModal={toggleShowCreateColumnModal} />}
      {!!isShowDeleteBoardModal && (
        <DeleteBoardModal
          toggleShowDeleteBoardModal={toggleShowDeleteBoardModal}
          deleteBoard={deleteBoard}
          id={boardId}
        />
      )}
      {!!isShowBoardSettings && <BoardSettings toggleShowBoardSettings={toggleShowBoardSettings} />}
      {!!isShowCreateTaskSlideOver && (
        <CreateTaskSlideOver toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver} />
      )}
    </>
  );
};

export default BoardDetail;
