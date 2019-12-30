import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';

import * as a from '../actions/actions';

const authFetchingState = handleActions({
  [a.fetchLoginRequest]() {
    return 'requested';
  },
  [a.fetchLoginFailure]() {
    return 'failed';
  },
  [a.fetchLoginSuccess]() {
    return 'finished';
  }
}, 'none');

const auth = handleActions({
  [a.fetchLoginSuccess](state, { payload: { isAuthed } }) {
    return {
      isAuthed: true
    };
  }
}, {
  isAuthed: false,
  dbProfile: null,
  profile: null

});

const tasksFetchingState = handleActions({
  [a.fetchTasksRequest]() {
    return 'requested';
  },
  [a.fetchTasksFailure]() {
    return 'failed';
  },
  [a.fetchTasksSuccess]() {
    return 'finished';
  }
}, 'none');

const tasks = handleActions({
  [a.fetchTasksSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.tasks, 'id'),
      allIds: payload.tasks.map((t) => t.id)
    };
  },
  [a.addTaskSuccess](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [task.id]: task },
      allIds: [task.id, ...allIds]
    };
  },
  [a.removeTaskSuccess](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id)
    };
  },
  [a.toggleTaskStateSuccess](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      allIds,
      byId: { ...byId, [task.id]: task }
    };
  }
}, { byId: {}, allIds: [] });

const notesFetchingState = handleActions({
  [a.fetchNotesRequest]() {
    return 'requested';
  },
  [a.fetchNotesFailure]() {
    return 'failed';
  },
  [a.fetchNotesSuccess]() {
    return 'finished';
  }
}, 'none');

const notes = handleActions({
  [a.fetchNotesSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.notes, 'id'),
      allIds: payload.notes.map((t) => t.id),
      active: payload.notes[0].id
    };
  },
  [a.addNoteSuccess](state, { payload: { note } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [note.id]: note },
      allIds: [note.id, ...allIds]
    };
  },
  [a.toggleActiveNoteState](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId,
      allIds,
      active: id
    };
  },
  [a.updateNoteSuccess](state, { payload: { note } }) {
    const { byId, allIds, active } = state;
    return {
      byId: { ...byId, [note.id]: note },
      allIds,
      active
    };
  },
  [a.removeNoteSuccess](state, { payload: { id } }) {
    const { byId, allIds, active } = state;
    const newAllIds = _.without(allIds, id);
    return {
      byId: _.omit(byId, id),
      allIds: newAllIds,
      active: active === id ? newAllIds[0] : active
    };
  }
}, { byId: {}, allIds: [] });

const reducer = combineReducers({
  notesFetchingState,
  tasksFetchingState,
  tasks,
  notes,
  form: formReducer
});

export default reducer;
