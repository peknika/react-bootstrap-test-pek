import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';

import * as a from '../actions/actions';

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
  }
}, { byId: {}, allIds: [] });

// const tasks = (state = [], action) => {
//   switch (action.type) {
//     case GET_ALL_TASKS:
//       return action.tasks;
// case POST_TASK:
//   const updatedTasks = [action.task].concat(state.tasks);
//   return { ...state, tasks: updatedTasks};
// case CHANGE_TASK_STATUS:
//   const newArr = state.tasks.map((task) => {
//     return task;
//   });
//   return { ...state, tasks: newArr};
// case DELETE_TASK:
//   return { ...state, tasks: arr};
//     default:
//       return state;
//   }
// };

const notes = handleActions({
  [a.fetchNotesSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.notes, 'id'),
      allIds: payload.notes.map((t) => t.id)
    };
  }
}, { byId: {}, allIds: [] });

const reducer = combineReducers({
  tasksFetchingState,
  tasks,
  notes,
  form: formReducer
});

export default reducer;
