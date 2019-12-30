import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { removeTask as removeTaskById, toggleTaskStatus as toggleTask } from '../redux/actions/dispatchTaskActions';


class Task extends React.Component {
  handleRemoveTask = (id) => () => {
    const { removeTask } = this.props;
    removeTask({ id });
  };

  toggleTaskState = (id, isActive) => () => {
    const state = isActive ? 'done' : 'active';
    const { toggleTaskStatus } = this.props;
    toggleTaskStatus({ id, state });
  }

  render() {
    const { text, id, taskState } = this.props;
    const isActive = taskState === 'active';
    return (
      <span id="todo-wrap">
        <ListGroup.Item id="item" onClick={this.toggleTaskState(id, isActive)}>
          {isActive ? text : <s>{text}</s>}
        </ListGroup.Item>
        <Button className="delete flex-row" variant="info" onClick={this.handleRemoveTask(id)}>&times;</Button>
      </span>

    );
  }
}

Task.propTypes = {
  text: PropTypes.string.isRequired
};

export default connect((state) => ({ state }), {
  removeTask: removeTaskById,
  toggleTaskStatus: toggleTask
})(Task);
