import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ListGroup,
  Spinner
} from 'react-bootstrap';

import Task from './Task';

const mapStateToProps = (state) => {
  const { tasksFetchingState, tasks: { byId, allIds } } = state;
  const tasks = allIds.map((id) => byId[id]);
  return { tasks, tasksFetchingState };
};

class TaskList extends React.Component {
  render() {
    const { tasks, tasksFetchingState } = this.props;

    if (tasksFetchingState === 'requested') {
      return (
        <Spinner animation="border" role="status" variant="secondary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (tasksFetchingState === 'failed') {
      return (
        <span>Please, reload page!</span>
      );
    }

    if (tasks.length === 0) {
      return null;
    }

    return (
      <ListGroup>
        {tasks.map(({ id, content }) => (
          <Task key={id} text={content} id={id} />
        ))}
      </ListGroup>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      state: PropTypes.oneOf(['active', 'finished']),
      user_id: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

export default connect(mapStateToProps)(TaskList);
