import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Faq from '../pages/Faq';
import SubscriptionPage from '../pages/SubscriptionPage';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import CreateOrganization from '../pages/CreateOrganization';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE, userPrivileges } from '../../api/role/Role';
import LoadingSpinner from '../components/LoadingSpinner';
import ManageDatabase from '../pages/ManageDatabase';
import Dashboard from '../pages/Dashboard';
import UserQRCode from '../pages/UserQRCode';
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import AllEventPage from '../pages/AllEventPage';
import UserProfile from '../pages/UserProfile';
import EditUserProfile from '../pages/EditUserProfile';
import UserViewOrgProfile from '../pages/UserViewOrgProfile';
import OrganizationProfile from '../pages/OrganizationProfile';
import EditOrganizationProfile from '../pages/EditOrganizationProfile';
import ViewEventPage from '../pages/ViewEventPage';
import AddEvent from '../pages/AddEvent';
import EditEvent from '../pages/EditEvent';
import OrgScanQR from '../pages/OrgScanQR';
import MyEventPage from '../pages/MyEventPage';
import VerifyEmailPage from '../pages/verifyEmailPage';
import ResetPasswordPage from '../pages/ResetPassword';
import AdminEventModeration from '../pages/AdminEventModeration';
import AdminOrganizationModeration from '../pages/AdminOrganizationModeration';
import AdminUserModeration from '../pages/AdminUserModeration';
import AdminReviewModeration from '../pages/AdminReviewModeration';
import OrgReviewForm from '../pages/OrgReviewForm';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/subscribe" element={<SubscriptionPage />} />
          <Route path="/Events" element={<AllEventPage />} />
          <Route path="/view_event/:_id" element={<ViewEventPage />} />
          <Route path="/org-profile/:_id" element={<UserViewOrgProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/review-organization/:_id" element={<ProtectedRoute><OrgReviewForm /></ProtectedRoute>} />
          <Route path="/edit-user-profile/:_id" element={<ProtectedRoute><EditUserProfile /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/qr-code/:_id" element={<ProtectedRoute><UserQRCode /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/my_event" element={<ProtectedRoute><MyEventPage /></ProtectedRoute>} />
          <Route path="/createOrganization" element={<ProtectedRoute><CreateOrganization /></ProtectedRoute>} />
          <Route path="/dashboard" element={<OrganizationProtectedRoute ready={ready}><Dashboard /></OrganizationProtectedRoute>} />
          <Route path="/add-event" element={<OrganizationProtectedRoute ready={ready}><AddEvent /></OrganizationProtectedRoute>} />
          <Route path="/org-profile/org-view/:_id" element={<OrganizationProtectedRoute ready={ready}><OrganizationProfile /></OrganizationProtectedRoute>} />
          <Route path="/edit-event/:_id" element={<OrganizationProtectedRoute ready={ready}><EditEvent /></OrganizationProtectedRoute>} />
          <Route path="/scan-qr-code/:_id" element={<OrganizationProtectedRoute ready={ready}><OrgScanQR /></OrganizationProtectedRoute>} />
          <Route path="/edit-organization-profile/:_id" element={<OrganizationProtectedRoute ready={ready}><EditOrganizationProfile /></OrganizationProtectedRoute>} />
          <Route path="/manage-database" element={<AdminProtectedRoute ready={ready}><ManageDatabase /></AdminProtectedRoute>} />
          <Route path="/event-moderation" element={<AdminProtectedRoute ready={ready}><AdminEventModeration /></AdminProtectedRoute>} />
          <Route path="/organization-moderation" element={<AdminProtectedRoute ready={ready}><AdminOrganizationModeration /></AdminProtectedRoute>} />
          <Route path="/admin-edit-event/:_id" element={<AdminProtectedRoute ready={ready}><EditEvent /></AdminProtectedRoute>} />
          <Route path="/admin-edit-organization/:_id" element={<AdminProtectedRoute ready={ready}><EditOrganizationProfile /></AdminProtectedRoute>} />
          <Route path="/user-moderation" element={<AdminProtectedRoute ready={ready}><AdminUserModeration /></AdminProtectedRoute>} />
          <Route path="/admin-edit-user/:_id" element={<AdminProtectedRoute ready={ready}><EditUserProfile /></AdminProtectedRoute>} />
          <Route path="/review-moderation" element={<AdminProtectedRoute ready={ready}><AdminReviewModeration /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * OrganizationProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const OrganizationProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isOrganization = Roles.userIsInRole(Meteor.userId(), userPrivileges.hasOrganization, ROLE.USER);
  console.log('OrganizationProtectedRoute', isLogged, isOrganization);
  return (isLogged && isOrganization) ? children : <Navigate to="/notauthorized" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each OrganizationProtectedRoute.
OrganizationProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

OrganizationProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
