import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './redux/store';
import { getAllTasks } from './redux/actions/dispatchTaskActions';

if (module.hot) {
  module.hot.accept();
}

store.dispatch(getAllTasks());
console.log(process.env.NODE_ENV);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
