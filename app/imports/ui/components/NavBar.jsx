import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { marginBottom: '10px' };
  return (
    <Navbar bg="light" expand="lg" style={menuStyle}>
      <Container>
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/"><h1>Voluntree</h1>
          <Image src="https://d1yjjnpx0p53s8.cloudfront.net" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-start">
            <Nav.Link id={COMPONENT_IDS.NAVBAR_ADD_STUFF} as={NavLink} to="/Home" key="Home">Home</Nav.Link>
            <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/About" key="About">About</Nav.Link>
            <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/Events" key="Events">Events</Nav.Link>
            <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/FAQ" key="FAQ">FAQ</Nav.Link>
            {currentUser ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/MyEvents" key="MyEvents">My Events</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/Dashboard" key="Dashboard">Dashboard</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database"><CloudDownload /> Database</NavDropdown.Item>
                </NavDropdown>]
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"><PersonPlusFill />Sign up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
