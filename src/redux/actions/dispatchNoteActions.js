import axios from 'axios';

import {
  fetchNotesRequest,
  fetchNotesSuccess,
  fetchNotesFailure,
  addNoteSuccess,
  toggleActiveNoteState,
  removeNoteRequest,
  removeNoteFailure,
  removeNoteSuccess,
  updateNoteSuccess
} from './actions';
import routes from '../../../paths';

export const getAllNotes = () => (dispatch) => {
  dispatch(fetchNotesRequest());
  axios.get(routes.notesUrl())
    .then((response) => response.data)
    .then((notes) => {
      dispatch(fetchNotesSuccess({ notes }));
    })
    .catch((err) => {
      dispatch(fetchNotesFailure(err));
    });
};

export const addNote = ({ text }) => async (dispatch) => {
  const response = await axios.post(routes.noteUrl('add'), { text, userId: 0 });
  dispatch(addNoteSuccess({ note: response.data[0] }));
};

export const toggleActiveNote = (id) => (dispatch) => {
  dispatch(toggleActiveNoteState({ id }));
};

export const updateNote = ({ text, id }) => async (dispatch) => {
  const response = await axios.post(routes.noteUrl('update', id), { text });
  dispatch(updateNoteSuccess({ note: response.data[0] }));
};

export const removeNote = ({ id }) => async (dispatch) => {
  dispatch(removeNoteRequest());
  try {
    const url = routes.noteUrl('delete', id);
    await axios.delete(url);
    dispatch(removeNoteSuccess({ id }));
  } catch (error) {
    dispatch(removeNoteFailure());
    throw (error);
  }
};
