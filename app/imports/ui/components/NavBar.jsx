import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonCircle, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE, userPrivileges } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  // Default menu for users who are not logged in
  const defaultMenu = (
    <>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_ABOUT_PAGE} as={NavLink} to="/about" key="About">About</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_FAQ_PAGE} as={NavLink} to="/FAQ" key="FAQ">FAQ</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_EVENTS_PAGE} as={NavLink} to="/Events" key="Events">Find Events</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_SUBSCRIBE_PAGE} as={NavLink} to="/subscribe" key="Subscribe">Subscribe</Nav.Link>
    </>
  );

  // Menu for users who are logged in
  const loggedInUserMenu = (
    <>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_HOME_PAGE} as={NavLink} to="/home" key="Home">Home</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_EVENTS_PAGE} as={NavLink} to="/Events" key="Events">Find Events</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_SUBSCRIBE_PAGE} as={NavLink} to="/subscribe" key="Subscribe">Subscribe</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_MY_EVENTS_PAGE} as={NavLink} to="/my_event" key="myEvents">My Events</Nav.Link>
    </>
  );

  // Menu for users who are logged in and have an organization
  const organizationMenu = (
    <>
      {loggedInUserMenu}
      <Nav.Link id={COMPONENT_IDS.NAVBAR_ADD_EVENT_PAGE} as={NavLink} to="/add-event" key="AddEvent">Add Event</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_DASHBOARD_PAGE} as={NavLink} to="/Dashboard" key="Dashboard">Dashboard</Nav.Link>
    </>
  );

  // Menu for users who are logged in and have admin privileges
  const adminMenu = (
    <>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_HOME_PAGE} as={NavLink} to="/home" key="Home">Home</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_EVENTS_PAGE} as={NavLink} to="/Events" key="Events">Find Events</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_ADMIN_EVENT_MODERATION_PAGE} as={NavLink} to="/event-moderation" key="AdminEventModeration">Event Moderation</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_ADMIN_ORGANIZATION_MODERATION_PAGE} as={NavLink} to="/organization-moderation" key="AdminOrganizationModeration">Organization Moderation</Nav.Link>
      <Nav.Link id={COMPONENT_IDS.NAVBAR_ADMIN_USER_MODERATION_PAGE} as={NavLink} to="/user-moderation" key="AdminUserModeration">User Moderation</Nav.Link>
      <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
        <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database">
          <CloudDownload /> Database
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        {currentUser ? (
          <Navbar.Brand id={COMPONENT_IDS.NAVBAR_HOME_PAGE} as={NavLink} to="/home" key="Home">
            <Image src="/images/voluntreeText1.png" width="150px" />
          </Navbar.Brand>
        ) : (
          <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/">
            <Image src="/images/voluntreeText1.png" width="150px" />
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-start">
            {currentUser && Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) && adminMenu}

            {currentUser && !Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) && (
              Roles.userIsInRole(Meteor.userId(), userPrivileges.hasOrganization, ROLE.USER) ? organizationMenu : loggedInUserMenu
            )}

            {!currentUser && defaultMenu}
          </Nav>
          <Nav className="justify-content-end">
            {!currentUser ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"><PersonPlusFill />Sign up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_USER_PROFILE_PAGE} as={NavLink} to="/profile"><PersonCircle /> Profile</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT_PAGE} as={NavLink} to="/signout">
                  <BoxArrowRight /> Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
