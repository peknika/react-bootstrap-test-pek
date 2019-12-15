import React from 'react';
import { Button } from 'react-bootstrap';

import NotebookChoice from './NotebookChoice';

export default class Sidebar extends React.Component {
  state = {
    isOpened: true
  };

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
        <Button variant="secondary" className="small-toggle" inline onClick={this.toggleVisibility}>{'>>'}</Button>
      );
    }
    return (
      <div className="sidebar">
        <Button variant="secondary" block onClick={this.toggleVisibility}>{'<<'}</Button>
        <NotebookChoice />
      </div>
    );
  }
}
