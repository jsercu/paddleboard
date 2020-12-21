import React from 'react';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
  let { boardId } = useParams();

  return <div className="pt-24">Showing BoardDetail for Board with id: {boardId}</div>;
};

export default BoardDetail;
