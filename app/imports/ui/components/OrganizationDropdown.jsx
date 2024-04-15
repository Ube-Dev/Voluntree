import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OrganizationOverview from './OrganizationOverview';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
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
      <Card className="org-background p-3">
        <Row>
          <Col>
            <Dropdown className="text-center mb-4">
              <Dropdown.Toggle variant="success" className="org-dropdown" id={COMPONENT_IDS.ORGANIZATION_DROPDOWN}>
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
