import React, { useState, useEffect } from 'react';
import { Container, Row, Dropdown, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OrganizationOverview from './OrganizationOverview';

const OrganizationDropdown = ({ myOrganization }) => {
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    // Set the first organization as selected initially
    const organizationKeys = Object.keys(myOrganization);
    if (organizationKeys.length > 0 && !selectedOrganization) {
      setSelectedOrganization(myOrganization[organizationKeys[0]]);
    }
  }, [myOrganization, selectedOrganization]);

  // Handle organization selection. If selected, set the selected organization.
  const handleOrganizationSelect = (organization) => {
    setSelectedOrganization(organization);
  };

  // Render the dropdown menu items
  const renderMenuItems = () => (
    Object.keys(myOrganization).map(key => (
      <Dropdown.Item key={key} onClick={() => handleOrganizationSelect(myOrganization[key])}>
        {myOrganization[key].name}
      </Dropdown.Item>
    )));

  return (
    <Container>
      <Card>
        <Card.Header>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              My Organizations
            </Dropdown.Toggle>
            <Dropdown.Menu>{renderMenuItems()}</Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Row>
          {selectedOrganization && (
            <OrganizationOverview theOrganization={selectedOrganization} />
          )}
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
