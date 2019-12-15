import { createAction } from 'redux-actions';

export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');

export const removeTaskRequest = createAction('TASK_REMOVE_REQUEST');
export const removeTaskSuccess = createAction('TASK_REMOVE_SUCCESS');
export const removeTaskFailure = createAction('TASK_REMOVE_FAILURE');

export const addTaskSuccess = createAction('TASK_ADD_SUCCESS');

export const fetchNotesRequest = createAction('NOTES_FETCH_REQUEST');
export const fetchNotesSuccess = createAction('NOTES_FETCH_SUCCESS');
export const fetchNotesFailure = createAction('NOTES_FETCH_FAILURE');

export const removNoteRequest = createAction('TASK_REMOVE_REQUEST');
export const removNoteSuccess = createAction('TASK_REMOVE_SUCCESS');
export const removNoteFailure = createAction('TASK_REMOVE_FAILURE');
