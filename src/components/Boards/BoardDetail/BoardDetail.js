import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import firebase, { firestore } from '../../../firebase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import Container from '../../../common/Container';
import BoardDetailHeader from './BoardDetailHeader/BoardDetailHeader';
import BoardSettings from './BoardDetailHeader/BoardSettings';
import ColumnModal from './Column/ColumnModal/ColumnModal';
import DeleteBoardModal from './BoardDetailHeader/DeleteBoardModal';
import TaskSlideOver from './Task/TaskSlideOver/TaskSlideOver';
import Column from './Column/Column';
import ColumnsEmptyState from './Column/ColumnsEmptyState';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
  let { boardId } = useParams();
  let history = useHistory();
  let auth = useAuth();

  const [board, setBoard] = useState(false);
  const [columns, setColumns] = useState({});
  const [tasks, setTasks] = useState({});

  const [isShowBoardSettings, setIsShowBoardSettings] = useState(false);
  const [isShowCreateColumnModal, setIsShowCreateColumnModal] = useState(false);
  const [isShowDeleteBoardModal, setIsShowDeleteBoardModal] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    boardSettings: { display: false, initialValues: {} },
    columnModal: { display: false, editMode: false, initialValues: {} },
    deleteBoardModal: { display: false },
    taskSlideOver: { display: false, editMode: false, initialValues: {} },
  });

  const [isLoadingValues, setIsLoadingValues] = useState({
    isBoardLoading: true,
    isColumnsLoading: true,
    isTasksLoading: true,
  });
  const isInitialMount = useRef(true);
  const [sourceColIdToUpdate, setSourceColIdToUpdate] = useState(null);
  const [destinationColIdToUpdate, setDestinationColIdToUpdate] = useState(null);
  const [reorderedTaskId, setReorderedTaskId] = useState(null);
  const [movedTaskId, setMovedTaskId] = useState(null);

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
        const newTasksArr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const newTasks = {};
        newTasksArr.forEach((task) => {
          newTasks[task.id] = { ...task };
        });
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
    if (reorderedTaskId && sourceColIdToUpdate) {
      firestore
        .collection('boards')
        .doc(boardId)
        .collection('columns')
        .doc(sourceColIdToUpdate)
        .update({ taskIds: columns[sourceColIdToUpdate].taskIds });
      setSourceColIdToUpdate(false);
      setReorderedTaskId(false);
    }
  }, [reorderedTaskId, sourceColIdToUpdate]);

  useEffect(() => {
    if (movedTaskId && sourceColIdToUpdate && destinationColIdToUpdate) {
      firestore
        .collection('boards')
        .doc(boardId)
        .collection('columns')
        .doc(sourceColIdToUpdate)
        .update({ taskIds: columns[sourceColIdToUpdate].taskIds });
      setSourceColIdToUpdate(false);
      firestore
        .collection('boards')
        .doc(boardId)
        .collection('columns')
        .doc(destinationColIdToUpdate)
        .update({ taskIds: columns[destinationColIdToUpdate].taskIds });
      setDestinationColIdToUpdate(false);
      firestore.collection('tasks').doc(movedTaskId).update({ columnId: destinationColIdToUpdate });
      setMovedTaskId(false);
    }
  }, [movedTaskId, sourceColIdToUpdate]);

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

  const updateColumn = async (columnValues, columnId) => {
    const { name } = columnValues;
    try {
      await firestore.collection('boards').doc(boardId).collection('columns').doc(columnId).update({ name: name });
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  // TODO Handle setting deleteStatus flag of all tasks in column to true
  const deleteColumn = async (columnId) => {
    try {
      let batch = firestore.batch();
      let boardRef = firestore.collection('boards').doc(boardId);
      batch.delete(boardRef.collection('columns').doc(columnId));
      batch.set(boardRef, { columnOrder: firebase.firestore.FieldValue.arrayRemove(columnId) });
      await batch.commit();
      await firestore.collection('boards').doc(boardId).collection('columns').doc(columnId).delete();
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const addTask = async (taskFormValues) => {
    let taskId;
    let { columnId } = taskFormValues;
    let task = {
      ...taskFormValues,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      author: auth.user.displayName,
      authorId: auth.user.uid,
      deleteStatus: false,
      boardId,
    };
    try {
      await firestore
        .collection('tasks')
        .add(task)
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

  const updateTask = async (taskFormValues, taskId, prevColumnId) => {
    const { name, description, columnId } = taskFormValues;
    try {
      let batch = firestore.batch();
      let taskRef = firestore.collection('tasks').doc(taskId);
      batch.update(taskRef, {
        name: name,
        description: description,
        columnId: columnId,
      });
      if (prevColumnId !== columnId) {
        let prevColumnRef = firestore.collection('boards').doc(boardId).collection('columns').doc(prevColumnId);
        let newColumnRef = firestore.collection('boards').doc(boardId).collection('columns').doc(columnId);
        batch.update(prevColumnRef, { taskIds: firebase.firestore.FieldValue.arrayRemove(taskId) });
        batch.update(newColumnRef, { taskIds: firebase.firestore.FieldValue.arrayUnion(taskId) });
      }
      await batch.commit();
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
    const { source, destination, type, draggableId } = result;
    if (!destination) {
      return;
    }
    if (type === 'column') {
      const newColumnOrder = reorder(board.columnOrder, source.index, destination.index);
      setBoard((prevBoard) => ({ ...prevBoard, columnOrder: newColumnOrder }));
      return;
    }
    if (type === 'task') {
      if (source.droppableId === destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const newTaskIds = reorder(sourceColumn.taskIds, source.index, destination.index);
        const newColumn = { ...sourceColumn, taskIds: newTaskIds };
        setColumns((prevColumns) => ({ ...prevColumns, [newColumn.id]: newColumn }));
        setSourceColIdToUpdate(newColumn.id);
        setReorderedTaskId(draggableId);
      } else {
        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];
        const moveResult = move(sourceColumn.taskIds, destinationColumn.taskIds, source, destination);
        const newSourceColumnTaskIds = moveResult[source.droppableId];
        const newSourceColumn = { ...sourceColumn, taskIds: newSourceColumnTaskIds };
        const newDestinationColumnTaskIds = moveResult[destination.droppableId];
        const newDestinationColumn = { ...destinationColumn, taskIds: newDestinationColumnTaskIds };
        setColumns((prevColumns) => ({
          ...prevColumns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestinationColumn.id]: newDestinationColumn,
        }));
        const movedTask = tasks[result.draggableId];
        const newTask = { ...movedTask, columnId: destination.droppableId };
        setTasks((prevTasks) => ({ ...prevTasks, [newTask.id]: newTask }));
        setSourceColIdToUpdate(newSourceColumn.id);
        setDestinationColIdToUpdate(newDestinationColumn.id);
        setMovedTaskId(draggableId);
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
    if (_column.taskIds.length > 0 && tasks && Object.keys(tasks).length > 0) {
      _column.taskIds.forEach((taskId) => {
        _tasks.push(tasks[taskId]);
      });
    }
    return [_column, _tasks];
  };

  const toggleShowDeleteBoardModal = () => setIsShowDeleteBoardModal(!isShowDeleteBoardModal);
  const toggleShowBoardSettings = () => setIsShowBoardSettings(!isShowBoardSettings);
  const toggleShowColumnModal = (editMode, initialValues) => {
    const newColumnModal = {
      display: !modalConfig.columnModal.display,
      editMode: editMode,
      initialValues: !!initialValues ? { ...initialValues } : { name: '' },
    };
    setModalConfig((prevModalConfig) => ({ ...prevModalConfig, columnModal: newColumnModal }));
  };
  const toggleShowTaskSlideOver = (editMode, initialValues) => {
    const newTaskSlideOver = {
      display: !modalConfig.taskSlideOver.display,
      editMode: editMode,
      initialValues: !!initialValues ? { ...initialValues } : { name: '', description: '' },
    };
    setModalConfig((prevModalConfig) => ({ ...prevModalConfig, taskSlideOver: newTaskSlideOver }));
  };

  if (isLoadingValues.isBoardLoading || isLoadingValues.isColumnsLoading || isLoadingValues.isTasksLoading) {
    return <div></div>;
  }

  return (
    <>
      <div className="w-full h-full bg-gray-200">
        <BoardDetailHeader
          id={boardId}
          toggleShowBoardSettings={toggleShowBoardSettings}
          toggleShowColumnModal={toggleShowColumnModal}
          toggleShowDeleteBoardModal={toggleShowDeleteBoardModal}
          toggleShowTaskSlideOver={toggleShowTaskSlideOver}
        />
        <Container>
          <DragDropContext onDragEnd={onDragEnd}>
            {!!board && board.columnOrder.length ? (
              <Droppable droppableId="columnList" direction="horizontal" type="column">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={getColumnListStyle(snapshot.isDraggingOver) + ` -mt-32 flex`}>
                    {board.columnOrder.map((colId, index) => {
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
                                deleteColumn={deleteColumn}
                                deleteTask={deleteTask}
                                tasks={currentTasks}
                                toggleShowColumnModal={toggleShowColumnModal}
                                toggleShowTaskSlideOver={toggleShowTaskSlideOver}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) : (
              <ColumnsEmptyState toggleShowColumnModal={toggleShowColumnModal} />
            )}
          </DragDropContext>
        </Container>
      </div>
      {!!modalConfig.columnModal.display && (
        <ColumnModal
          addColumn={addColumn}
          editMode={modalConfig.columnModal.editMode}
          initialValues={modalConfig.columnModal.initialValues}
          toggleShowColumnModal={toggleShowColumnModal}
          updateColumn={updateColumn}
        />
      )}
      {!!isShowDeleteBoardModal && (
        <DeleteBoardModal
          deleteBoard={deleteBoard}
          id={boardId}
          toggleShowDeleteBoardModal={toggleShowDeleteBoardModal}
        />
      )}
      {!!isShowBoardSettings && <BoardSettings toggleShowBoardSettings={toggleShowBoardSettings} />}
      {!!modalConfig.taskSlideOver.display && (
        <TaskSlideOver
          addTask={addTask}
          columns={columns}
          editMode={modalConfig.taskSlideOver.editMode}
          initialValues={modalConfig.taskSlideOver.initialValues}
          toggleShowColumnModal={toggleShowColumnModal}
          toggleShowTaskSlideOver={toggleShowTaskSlideOver}
          updateTask={updateTask}
        />
      )}
    </>
  );
};

export default BoardDetail;
