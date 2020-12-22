import React from 'react';
import Container from '../../../common/Container';
import BoardDetailHeader from './BoardDetailHeader';
import Column from './Column/Column';
import { useParams } from 'react-router-dom';
import { ReactComponent as PlusIcon } from '../../../assets/img/icons/plus.svg';

const BoardDetail = () => {
  let { boardId } = useParams();

  const columns = [
    {
      name: 'Backlog',
      id: 1,
      tasks: [
        {
          id: 1,
          name: 'Add discount code to checkout page',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          id: 2,
          name: 'Provide documentation on integrations',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          id: 3,
          name: 'Design shopping cart dropdown',
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
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          id: 2,
          name: 'Provide documentation on integrations',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          id: 3,
          name: 'Design shopping cart dropdown',
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
          name: 'Add discount code to checkout page',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          id: 2,
          name: 'Provide documentation on integrations',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          id: 3,
          name: 'Design shopping cart dropdown',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full bg-gray-200">
      <BoardDetailHeader />
      <Container>
        <div className="-mt-32 grid grid-cols-3 gap-8">
          {columns && columns.map(({ name, id, tasks }) => <Column key={id} name={name} tasks={tasks} />)}
        </div>
      </Container>
    </div>
  );
};

export default BoardDetail;
