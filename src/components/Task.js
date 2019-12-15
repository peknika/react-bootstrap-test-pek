import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { removeTask as removeTaskById } from '../redux/actions/dispatchTaskActions';


class Task extends React.Component {
  handleRemoveTask = (id) => () => {
    const { removeTask } = this.props;
    removeTask({ id });
  };

  render() {
    const { text, id } = this.props;
    return (
      <ListGroup.Item variant="light" block>
        {text}
        <Button className="close" variant="outline-secondary" onClick={this.handleRemoveTask(id)}>&times;</Button>
      </ListGroup.Item>
    );
  }
}

Task.propTypes = {
  text: PropTypes.string.isRequired
};

export default connect((state) => ({ state }), { removeTask: removeTaskById })(Task);
