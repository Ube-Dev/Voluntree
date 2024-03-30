import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OrganizationOverview from './OrganizationOverview';
import '../css/OrgDashboard.css';

const OrganizationDropdown = ({ myOrganization }) => {
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    // Set the first organization as selected initially
    const organizationKeys = Object.keys(myOrganization);
    if (organizationKeys.length > 0 && !selectedOrganization) {
      setSelectedOrganization(myOrganization[organizationKeys[0]]);
    }
  }, [myOrganization, selectedOrganization]);

  const handleOrganizationSelect = (organization) => {
    setSelectedOrganization(organization);
  };

  const renderMenuItems = () => (
    Object.keys(myOrganization).map(key => (
      <Dropdown.Item key={key} onClick={() => handleOrganizationSelect(myOrganization[key])}>
        {myOrganization[key].name}
      </Dropdown.Item>
    )));

  return (
    <Container>
      <Card className="org-background p-3">
        <Row>
          <Col>
            <Dropdown className="text-center mb-4">
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="org-dropdown">
                My Organizations
              </Dropdown.Toggle>
              <Dropdown.Menu>{renderMenuItems()}</Dropdown.Menu>
            </Dropdown>
            {selectedOrganization && (
              <OrganizationOverview theOrganization={selectedOrganization} />
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

OrganizationDropdown.propTypes = {
  myOrganization: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
};

export default OrganizationDropdown;
