import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';


import { toggleActiveNote as toggleNote, removeNote as RemoveNoteById } from '../redux/actions/dispatchNoteActions';

const mapStateToProps = (state) => {
  const { form: { NewNote }, notes: { byId } } = state;
  return { NewNote, byId };
};

class Note extends React.Component {
  handleActive = (id) => () => {
    const { toggleActiveNote } = this.props;
    toggleActiveNote(id);
  };

  handleRemoveNote = (id) => () => {
    const { removeNote } = this.props;
    removeNote({ id });
  };

  render() {
    const { text, id } = this.props;
    return (
      <span id="note-wrap">
        <ListGroup.Item
          inline
          onClick={this.handleActive(id)}
        >
          {text.replace(/<[^>]+>/g, '')}
        </ListGroup.Item>
        <Button variant="outline-secondary" onClick={this.handleRemoveNote(id)}>&times;</Button>
      </span>

    );
  }
}

Note.propTypes = {
  text: PropTypes.string.isRequired
};

export default connect(mapStateToProps, {
  toggleActiveNote: toggleNote,
  removeNote: RemoveNoteById
})(Note);
