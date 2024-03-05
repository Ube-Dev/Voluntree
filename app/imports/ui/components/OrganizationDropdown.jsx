import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

const OrganizationDropdown = ({ myOrganization, onSelectOrganization }) => {
  const handleSelect = (selectedOrgId) => {
    onSelectOrganization(selectedOrgId);
  };

  const renderMenuItems = () => (
    myOrganization.map((org) => (
      <Dropdown.Item key={org._id} eventKey={org._id}>
        {org.name}
      </Dropdown.Item>
    )));

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dashboard
      </Dropdown.Toggle>
      <Dropdown.Menu>{renderMenuItems()}</Dropdown.Menu>
    </Dropdown>
  );
};

OrganizationDropdown.propTypes = {
  myOrganization: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string,
    }),
  ).isRequired,
  onSelectOrganization: PropTypes.func.isRequired,
};

export default OrganizationDropdown;
