import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/main.css';
import authService from '../auth/service';
import MySidebar from './Sidebar';
import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';
import EditorComponent from './EditorForm';
import Header from './Header';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div id="outer-container">
          <MySidebar />
          <EditorComponent />
          <div id="todos-wrap">
            <NewTaskForm />
            <TaskList />
          </div>
        </div>
      </>
    );
  }
}

export default App;
