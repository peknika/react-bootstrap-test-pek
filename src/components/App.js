import React from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/main.css';
import Header from './Header';
import Sidebar from './Sidebar';
import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Row>
          <Col sm={9}>
            <Sidebar />
            (wider)
          </Col>
          <Col>
            <Jumbotron>
              <NewTaskForm />
              <TaskList />
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
