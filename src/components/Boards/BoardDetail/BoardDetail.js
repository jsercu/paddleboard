import React, { useState } from 'react';
import Container from '../../../common/Container';
import BoardDetailHeader from './BoardDetailHeader';
import Column from './Column/Column';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
  let { boardId: id } = useParams();

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

  return (
    <div className="w-full h-full bg-gray-200">
      <BoardDetailHeader id={id} />
      <Container>
        <div className="-mt-32 grid grid-cols-3 gap-8">
          {columns && columns.map(({ name, id, tasks }) => <Column key={id} name={name} tasks={tasks} />)}
        </div>
      </Container>
    </div>
  );
};

export default BoardDetail;
