import React from 'react';
import { connect } from 'react-redux';
import { Button, Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import auth from '../auth/service';
import { toggleActiveNoteState as toggleActive } from '../redux/actions/actions';

class Header extends React.Component {
  handleActive = () => {
    const { toggleActiveNoteState, active } = this.props;
    if (active) {
      toggleActiveNoteState(active);
    }
  };

  handeLogin = () => {
    auth.login();
  };

  render() {
    return (
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Button variant="link" onClick={this.handleActive}>
            <FontAwesomeIcon icon={faPlus} id="inline-icon" />
            Note
          </Button>
          <Button variant="link">
            <FontAwesomeIcon icon={faPlus} id="inline-icon" />
            Notebook
          </Button>
        </Container>
        <Button variant="link" className="flex-end" onClick={this.handeLogin}>
          <FontAwesomeIcon icon={faSignInAlt} id="inline-icon" />
        </Button>
      </Navbar>
    );
  }
}

export default connect(
  (state) => ({ active: state.notes.active }),
  { toggleActiveNoteState: toggleActive }
)(Header);
