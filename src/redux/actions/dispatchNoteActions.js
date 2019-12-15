import axios from 'axios';

import { fetchNotesRequest, fetchNotesSuccess, fetchNotesFailure } from './actions';

export const getAllNotes = () => (dispatch) => {
  dispatch(fetchNotesRequest());
  axios.get('http://localhost:5000/api/get/notes')
    .then((response) => response.data)
    .then((notes) => {
      dispatch(fetchNotesSuccess({ notes }));
    })
    .catch((err) => {
      dispatch(fetchNotesFailure(err));
    });
};

export const postNewNote = (note) => (dispatch) => {

};
