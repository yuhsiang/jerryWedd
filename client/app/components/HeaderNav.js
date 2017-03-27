import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Button from 'react-bootstrap/lib/Button';
import { hashHistory } from 'react-router';

export default class HeaderNav extends React.Component {
  handleSelect(eventKey) {
    event.preventDefault();

    hashHistory.push('/form');
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/#/">Happy Wedding</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight bsStyle="pills" onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="form">參加歡宴</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
// <NavItem eventKey={1} href="/">NavItem 1</NavItem>
