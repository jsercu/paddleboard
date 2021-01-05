import React, { useState, useEffect } from 'react';
import firebase, { firestore } from '../../../firebase';
import { useHistory } from 'react-router-dom';
import Container from '../../../common/Container';
import BoardDetailHeader from './BoardDetailHeader/BoardDetailHeader';
import BoardSettings from './BoardDetailHeader/BoardSettings';
import CreateColumnModal from './Column/CreateColumnModal';
import DeleteBoardModal from './BoardDetailHeader/DeleteBoardModal';
import CreateTaskSlideOver from './Task/CreateTaskSlideOver';
import Column from './Column/Column';
import ColumnEmptyState from './Column/ColumnEmptyState';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
  let { boardId } = useParams();
  let history = useHistory();
  const [board, setBoard] = useState(true);
  const [isShowBoardSettings, setIsShowBoardSettings] = useState(false);
  const [isShowCreateColumnModal, setIsShowCreateColumnModal] = useState(false);
  const [isShowDeleteBoardModal, setIsShowDeleteBoardModal] = useState(false);
  const [isShowCreateTaskSlideOver, setIsShowCreateTaskSlideOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('boards')
      .doc(boardId)
      .onSnapshot((doc) => {
        const newBoard = doc.data();
        setBoard(newBoard);
        setIsLoading(false);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // TODO -> This deleteBoard function does NOT yet handle deleting the columns subCollection
  const deleteBoard = async (boardId) => {
    try {
      await firestore
        .collection('boards')
        .doc(boardId)
        .update({ deleteStatus: true })
        .then(() => {
          toggleShowDeleteBoardModal();
          history.push('/boards');
        });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  // TODO -> batch api calls
  const addColumn = async (columnValues) => {
    const { name } = columnValues;
    let columnId;
    try {
      await firestore
        .collection(`boards/${boardId}/columns`)
        .add({ name, taskIds: [] })
        .then((doc) => {
          columnId = doc.id;
        });
      await firestore
        .collection('boards')
        .doc(boardId)
        .update({ columnOrder: firebase.firestore.FieldValue.arrayUnion(columnId) });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  // TODO -> batch api calls
  const deleteColumn = async (columnId) => {
    try {
      await firestore.collection('boards').doc(boardId).collection('columns').doc(columnId).delete();
      await firestore
        .collection('boards')
        .doc(boardId)
        .update({ columnOrder: firebase.firestore.FieldValue.arrayRemove(columnId) });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const addTask = async (taskValues) => {
    let taskId;
    let { columnId } = taskValues;
    try {
      await firestore
        .collection('tasks')
        .add({ ...taskValues, boardId })
        .then((doc) => {
          taskId = doc.id;
        });
      await firestore
        .collection(`boards/${boardId}/columns`)
        .doc(columnId)
        .update({ taskIds: firebase.firestore.FieldValue.arrayUnion(taskId) });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const deleteTask = async (taskId, columnId) => {
    try {
      await firestore
        .collection('boards')
        .doc(boardId)
        .collection('columns')
        .doc(columnId)
        .update({ taskIds: firebase.firestore.FieldValue.arrayRemove(taskId) });
      await firestore.collection('tasks').doc(taskId).delete();
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const toggleShowBoardSettings = () => setIsShowBoardSettings(!isShowBoardSettings);

  const toggleShowCreateColumnModal = () => setIsShowCreateColumnModal(!isShowCreateColumnModal);

  const toggleShowDeleteBoardModal = () => setIsShowDeleteBoardModal(!isShowDeleteBoardModal);

  const toggleShowCreateTaskSlideOver = () => setIsShowCreateTaskSlideOver(!isShowCreateTaskSlideOver);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <div className="w-full h-full bg-gray-200">
        <BoardDetailHeader
          id={boardId}
          toggleShowBoardSettings={toggleShowBoardSettings}
          toggleShowCreateColumnModal={toggleShowCreateColumnModal}
          toggleShowDeleteBoardModal={toggleShowDeleteBoardModal}
          toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver}
        />
        <Container>
          <div className="-mt-32 grid grid-cols-3 gap-8">
            {!!board && board.columnOrder.length ? (
              board.columnOrder.map((colId) => (
                <Column key={colId} id={colId} deleteColumn={deleteColumn} addTask={addTask} deleteTask={deleteTask} />
              ))
            ) : (
              <ColumnEmptyState />
            )}
          </div>
        </Container>
      </div>
      {!!isShowCreateColumnModal && (
        <CreateColumnModal toggleShowCreateColumnModal={toggleShowCreateColumnModal} addColumn={addColumn} />
      )}
      {!!isShowDeleteBoardModal && (
        <DeleteBoardModal
          toggleShowDeleteBoardModal={toggleShowDeleteBoardModal}
          deleteBoard={deleteBoard}
          id={boardId}
        />
      )}
      {!!isShowBoardSettings && <BoardSettings toggleShowBoardSettings={toggleShowBoardSettings} />}
      {!!isShowCreateTaskSlideOver && (
        <CreateTaskSlideOver toggleShowCreateTaskSlideOver={toggleShowCreateTaskSlideOver} addTask={addTask} />
      )}
    </>
  );
};

export default BoardDetail;
