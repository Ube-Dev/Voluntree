import React, { useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OrganizationOverview from './OrganizationOverview';

const OrganizationDropdown = ({ myOrganization }) => {
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const handleOrganizationSelect = (organization) => {
    setSelectedOrganization(organization);
  };

  const renderMenuItems = () => (
    myOrganization.map((org) => (
      <Dropdown.Item key={org._id} onClick={() => handleOrganizationSelect(org)}>
        {org.name}
      </Dropdown.Item>
    )));

  return (
    <Row>
      <Col className="col-md-2">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dashboard
          </Dropdown.Toggle>
          <Dropdown.Menu>{renderMenuItems()}</Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col>
        {selectedOrganization && (
          <OrganizationOverview theOrganization={selectedOrganization} />
        )}
      </Col>
    </Row>
  );
};

OrganizationDropdown.propTypes = {
  myOrganization: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
};

export default OrganizationDropdown;
