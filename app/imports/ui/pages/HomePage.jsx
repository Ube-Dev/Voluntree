import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import UserDashboard from '../components/UserDashboard';
import AdminDashboard from './AdminDashboard'; // Assuming this exists
import UserCalendar from '../components/UserCalendar';
import UpcomingEventCard from '../components/UpcomingEventCard';
import QRCodeGenerator from '../components/QRCodeGenerator';

const HomePage = () => {
  const { isAdmin, adminProfile } = useTracker(() => {
    const user = Meteor.user();
    const adminStatus = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
    const adminProfileData = adminStatus ? AdminProfiles.findOne({ userID: user?._id }) : null;
    return {
      isAdmin: adminStatus,
      adminProfile: adminProfileData,
    };
  }, []);

  return (
    <Container fluid className="color3">
      <Container id={PAGE_IDS.HOME_PAGE} className="py-3">
        {isAdmin && adminProfile ? (
          // Admin-specific content
          <AdminDashboard adminProfile={adminProfile} />
        ) : (
          // Content for regular users
          <Row>
            <Col className="d-flex flex-column col-md-5 col-12">
              <UserDashboard />
              <Container className="d-flex flex-column h-100">
                <Row className="flex-grow-1">
                  <Col className="d-flex flex-column">
                     <QRCodeGenerator />
                    <UpcomingEventCard />
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col className="d-flex flex-column col-md-7 col-12 mt-3 mt-md-0">
              <UserCalendar />
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default HomePage;
