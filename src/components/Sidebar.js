import React from 'react';
import { Button } from 'react-bootstrap';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NotesChoise from './NotesChoise';
import NotebookChoice from './NotebookChoice';

export default class Sidebar extends React.Component {
  state = {
    isOpened: true
  }

  toggleVisibility = (e) => {
    e.preventDefault();
    const { isOpened } = this.state;
    this.setState({
      isOpened: !isOpened
    });
  };

  render() {
    const { isOpened } = this.state;
    if (!isOpened) {
      return (
        <span className="sidebar" style={{ maxWidth: 40 }}>
          <Button class="close" variant="dark" onClick={this.toggleVisibility}>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </Button>
        </span>
      );
    }
    return (
      <div className="sidebar">
        <Button class="close" variant="dark" block onClick={this.toggleVisibility}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
        <NotesChoise />
        <NotebookChoice />
      </div>
    );
  }
}
