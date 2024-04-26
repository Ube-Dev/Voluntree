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
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  console.log('User ID:', Meteor.userId());
  console.log('User Privileges:', userPrivileges); // Check if userPrivileges.hasOrganization is correctly set

  const isInRole = Roles.userIsInRole(Meteor.userId(), userPrivileges.hasOrganization);
  console.log('Is in Role:', isInRole);

  if (isInRole) {
    console.log('User has organization privilege');
  } else {
    console.log('User does not have organization privilege');
  }
  return (
    <Navbar className="color1" bg="light" expand="lg">
      <Container>
        {/* Voluntree logo; if user is logged in, it will redirect to home page, otherwise redirects to landing page */}
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
        {/* Makes navbar collapsible for narrow windows or mobile browsers */}
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-start">
            {/* If user is logged in, set link to Home page as visible; hide it otherwise */}
            {currentUser ? (
              <Nav.Link id={COMPONENT_IDS.NAVBAR_HOME_PAGE} as={NavLink} to="/home" key="Home">Home</Nav.Link>
            ) : ''}
            {/* About page */}
            <Nav.Link id={COMPONENT_IDS.NAVBAR_ABOUT_PAGE} as={NavLink} to="/about" key="About">About</Nav.Link>
            {/* FAQ page */}
            <Nav.Link id={COMPONENT_IDS.NAVBAR_FAQ_PAGE} as={NavLink} to="/FAQ" key="FAQ">FAQ</Nav.Link>
            {/* Find Events page */}
            <Nav.Link id={COMPONENT_IDS.NAVBAR_EVENTS_PAGE} as={NavLink} to="/Events" key="Events">Find Events</Nav.Link>
            {/* Subscription Page */}
            <Nav.Link id={COMPONENT_IDS.NAVBAR_SUBSCRIBE_PAGE} as={NavLink} to="/subscribe" key="Subscribe">Subscribe</Nav.Link>
            {/* If user is logged in, set links to My Events page as visible; hide it otherwise */}
            {currentUser ? (
              <Nav.Link id={COMPONENT_IDS.NAVBAR_MY_EVENTS_PAGE} as={NavLink} to="/my_event" key="myEvents">My Events</Nav.Link>
            ) : ''}
            {/* If user is organization, set Dashboard page as visible; hide it otherwise */}
            {Roles.userIsInRole(Meteor.userId(), userPrivileges.hasOrganization) ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_ADD_EVENT_PAGE} as={NavLink} to="/add-event" key="AddEvent">Add Event</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_DASHBOARD_PAGE} as={NavLink} to="/Dashboard" key="Dashboard">Dashboard</Nav.Link>,
            ]) : ''}
            {/* If user is admin, set Manage Database dropdown as visible; hide it otherwise */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_ADMIN_EVENT_MODERATION_PAGE} as={NavLink} to="/event-moderation" key="AdminEventModeration">Event Moderation</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_ADMIN_ORGANIZATION_MODERATION_PAGE} as={NavLink} to="/organization-moderation" key="AdminOrganizationModeration">Organization Moderation</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_ADMIN_USER_MODERATION_PAGE} as={NavLink} to="/user-moderation" key="AdminUserModeration">User Moderation</Nav.Link>,
              <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database">
                  <CloudDownload /> Database
                </NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
          </Nav>
          {/* Sign-in/sign-out and profile */}
          <Nav className="justify-content-end">
            {/* If user is not logged in, show sign-in/sign-up; otherwise show profile/sign-out as dropdown items */}
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"><PersonPlusFill />Sign up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                {/* Profile page */}
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
