import React from 'react';
import { Container, Card } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const AdminHome = () => {

  const ready = true; // Placeholder for now

  return ready ? (
    <Container>
      <Card>
        <Card.Header>
          <h2>Admin Overview</h2>
        </Card.Header>
      </Card>
    </Container>
  ) : (
    <Container className="p-2">
      <LoadingSpinner />
    </Container>
  );
};

export default AdminHome;
