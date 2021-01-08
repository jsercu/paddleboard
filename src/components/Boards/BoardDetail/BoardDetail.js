import React, { useState, useEffect, useRef } from 'react';
import firebase, { firestore } from '../../../firebase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

  const [board, setBoard] = useState(false);
  const [columns, setColumns] = useState({});
  const [tasks, setTasks] = useState([]);

  const [isShowBoardSettings, setIsShowBoardSettings] = useState(false);
  const [isShowCreateColumnModal, setIsShowCreateColumnModal] = useState(false);
  const [isShowDeleteBoardModal, setIsShowDeleteBoardModal] = useState(false);
  const [isShowCreateTaskSlideOver, setIsShowCreateTaskSlideOver] = useState(false);
  const [isLoadingValues, setIsLoadingValues] = useState({
    isBoardLoading: true,
    isColumnsLoading: true,
    isTasksLoading: true,
  });
  const isInitialMount = useRef(true);
  const [columnIdToUpdate, setColumnIdToUpdate] = useState(null);
  const [columnRequiresUpdate, setColumnRequiresUpdate] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('boards')
      .doc(boardId)
      .onSnapshot((doc) => {
        const newBoard = doc.data();
        setBoard(newBoard);
        setIsLoadingValues((prevState) => ({ ...prevState, isBoardLoading: false }));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('boards')
      .doc(boardId)
      .collection('columns')
      .onSnapshot((snapshot) => {
        const newColumnsArr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const newColumns = {};
        newColumnsArr.forEach((col) => {
          newColumns[col.id] = { ...col };
        });
        setColumns(newColumns);
        setIsLoadingValues((prevState) => ({ ...prevState, isColumnsLoading: false }));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('tasks')
      .where('boardId', '==', boardId)
      .onSnapshot((snapshot) => {
        const newTasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(newTasks);
        setIsLoadingValues((prevState) => ({ ...prevState, isTasksLoading: false }));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      firestore.collection('boards').doc(boardId).update({ columnOrder: board.columnOrder });
    }
  }, [board.columnOrder]);

  useEffect(() => {
    if (columnRequiresUpdate && columnIdToUpdate) {
      firestore
        .collection('boards')
        .doc(boardId)
        .collection('columns')
        .doc(columnIdToUpdate)
        .update({ taskIds: columns[columnIdToUpdate].taskIds });
      setColumnToUpdate(false);
    }
  }, [columnRequiresUpdate, columnIdToUpdate]);

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

  // React-Beautiful-DnD onDragEnd callback (required)
  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) {
      console.log('no destination for drop');
      return;
    }
    if (type === 'column') {
      const newColumnOrder = reorder(board.columnOrder, source.index, destination.index);
      setBoard((prevBoard) => ({ ...prevBoard, columnOrder: newColumnOrder }));
      return;
    }
    if (type === 'task') {
      if (source.droppableId === destination.droppableId) {
        console.log('task moved within same column.');
        const sourceColumn = columns[source.droppableId];
        const newTaskIds = reorder(sourceColumn.taskIds, source.index, destination.index);
        const newColumn = { ...sourceColumn, taskIds: newTaskIds };
        setColumns((prevColumns) => ({ ...prevColumns, [newColumn.id]: newColumn }));
        setColumnIdToUpdate(newColumn.id);
        setColumnRequiresUpdate(true);
      } else {
        console.log('task moved between columns');
        // 1) Remove task from source column's taskIds array
        // 2) Add task at appropriate position in destination column's taskIds array
        // 3) update task document's columnId with id of destination column
      }
    }
  };

  // onDragEnd helper methods:
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  const getColumnListStyle = (isDraggingOver) => {
    return isDraggingOver ? 'bg-gray-900 bg-opacity-10' : '';
  };

  const getCurrentColumnAndTasks = (columnId) => {
    const _column = columns[columnId];
    let _tasks = [];
    if (_column.taskIds.length > 0 && tasks && tasks.length > 0) {
      _column.taskIds.forEach((taskId) => {
        const foundTask = tasks.find((task) => task.id === taskId);
        _tasks.push(foundTask);
      });
    }
    return [_column, _tasks];
  };

  const toggleShowBoardSettings = () => setIsShowBoardSettings(!isShowBoardSettings);
  const toggleShowCreateColumnModal = () => setIsShowCreateColumnModal(!isShowCreateColumnModal);
  const toggleShowDeleteBoardModal = () => setIsShowDeleteBoardModal(!isShowDeleteBoardModal);
  const toggleShowCreateTaskSlideOver = () => setIsShowCreateTaskSlideOver(!isShowCreateTaskSlideOver);

  if (isLoadingValues.isBoardLoading || isLoadingValues.isColumnsLoading || isLoadingValues.isTasksLoading) {
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="columnList" direction="horizontal" type="column">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={getColumnListStyle(snapshot.isDraggingOver) + ` -mt-32 flex`}>
                  {!!board.columnOrder && board.columnOrder.length ? (
                    board.columnOrder.map((colId, index) => {
                      const [currentColumn, currentTasks] = getCurrentColumnAndTasks(colId);
                      return (
                        <Draggable key={colId} draggableId={colId} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mr-2 w-100 last:mr-0">
                              <Column
                                columnValues={currentColumn}
                                tasks={currentTasks}
                                deleteColumn={deleteColumn}
                                addTask={addTask}
                                deleteTask={deleteTask}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <ColumnEmptyState />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
