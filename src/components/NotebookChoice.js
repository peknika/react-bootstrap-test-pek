import React from 'react';
import {
  Accordion, Card, ListGroup, useAccordionToggle
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => console.log('totally custom!'));
  return (
    <ListGroup
      onClick={decoratedOnClick}
    >
      {children}
    </ListGroup>
  );
}

export default class NotebookChoice extends React.Component {
  render() {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={ListGroup.Item} block action variant="secondary" eventKey="0" className="active-header">
              <span id="inline-icon">
                <FontAwesomeIcon icon={faBook} />
              </span>
              SELECT fjfkjdfojsdofi
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <CustomToggle eventKey="0">
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </CustomToggle>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}
