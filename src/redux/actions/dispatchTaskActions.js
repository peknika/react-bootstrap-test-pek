import axios from 'axios';

import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  removeTaskRequest,
  removeTaskFailure,
  removeTaskSuccess,
  addTaskSuccess
} from './actions';
import routes from '../../../paths';

export const getAllTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const response = await axios.get(routes.tasksUrl());
    dispatch(fetchTasksSuccess({ tasks: response.data }));
  } catch (e) {
    dispatch(fetchTasksFailure());
    throw (e);
  }
};


export const addTask = ({ task }) => async (dispatch) => {
  const response = await axios.post(routes.taskUrl(task.id), { task: { ...task, userId: 0 } });
  dispatch(addTaskSuccess({ task: response.data[0] }));
};

export const removeTask = ({ id }) => async (dispatch) => {
  dispatch(removeTaskRequest());
  try {
    const url = routes.taskUrl(id);
    await axios.delete(url);
    dispatch(removeTaskSuccess({ id }));
  } catch (e) {
    dispatch(removeTaskFailure());
    throw e;
  }
};
