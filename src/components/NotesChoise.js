import React from 'react';
import { connect } from 'react-redux';
import {
  Accordion, Card, ListGroup, Spinner
} from 'react-bootstrap';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Note from './Note';

const mapStateToProps = (state) => {
  const { notesFetchingState, notes: { byId, allIds, active } } = state;
  const notes = allIds.map((id) => byId[id]);
  return { notes, active, notesFetchingState };
};

class NotesChoise extends React.Component {
  render() {
    const { notes, active, notesFetchingState } = this.props;

    if (notesFetchingState === 'requested') {
      return (
        <Spinner animation="border" role="status" variant="secondary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (notesFetchingState === 'failed') {
      return (
        <span>Please, reload page!</span>
      );
    }
    if (notes.length === 0) {
      return null;
    }

    const activeBody = active
      ? notes.find((note) => note.id === active).body.replace(/<[^>]+>/g, '')
      : notes[0].body.replace(/<[^>]+>/g, '');

    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={ListGroup.Item} block action variant="secondary" className="active-header" eventKey="1">
              <span id="inline-icon">
                <FontAwesomeIcon icon={faFileSignature} />
              </span>
              {activeBody}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {notes.map(({ id, body }) => (
                <Note
                  key={id}
                  text={body}
                  id={id}
                />
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default connect(mapStateToProps)(NotesChoise);
