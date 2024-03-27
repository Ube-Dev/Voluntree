import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const EmailPage = () => (
  <Container id={PAGE_IDS.ABOUT} fluid className="p-0">
    <Row>
      <Col>
        <Card className="about-card">
          <Card.Body>
            <Card.Title className="about-title">Email Us</Card.Title>
            <Card.Text>
              <p>
                If you have any questions or concerns, please feel free to email us at
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default EmailPage;
