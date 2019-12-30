import { createAction } from 'redux-actions';

export const fetchLoginRequest = createAction('LOGIN_FETCH_REQUEST');
export const fetchLoginSuccess = createAction('LOGIN_FETCH_SUCCESS');
export const fetchLoginFailure = createAction('LOGIN_FETCH_FAIL');

export const addProfile = createAction(('ADD_PROFILE'));
export const removeProfile = createAction('REMOVE_PROFILE');
export const setDbProfile = createAction('SET_DB_PROFILE');
export const removeDbProfile = createAction('REMOVE_DB_PROFILE');


export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');

export const removeTaskRequest = createAction('TASK_REMOVE_REQUEST');
export const removeTaskSuccess = createAction('TASK_REMOVE_SUCCESS');
export const removeTaskFailure = createAction('TASK_REMOVE_FAILURE');

export const addTaskSuccess = createAction('TASK_ADD_SUCCESS');

export const toggleTaskStateSuccess = createAction('TASK_TOGGLE_STATE_SUCCESS');
export const toggleTaskStateFailure = createAction('TASK_TOGGLE_STATE_FAILURE');

export const fetchNotesRequest = createAction('NOTES_FETCH_REQUEST');
export const fetchNotesSuccess = createAction('NOTES_FETCH_SUCCESS');
export const fetchNotesFailure = createAction('NOTES_FETCH_FAILURE');
export const toggleActiveNoteState = createAction('TOGGLE_ACTIVE_NOTE');

export const removeNoteRequest = createAction('NOTE_REMOVE_REQUEST');
export const removeNoteSuccess = createAction('NOTE_REMOVE_SUCCESS');
export const removeNoteFailure = createAction('NOTE_REMOVE_FAILURE');
export const addNoteSuccess = createAction('NOTE_ADD_SUCCESS');
export const updateNoteSuccess = createAction(('NOTE_UPDATE_SUCCESS'));
