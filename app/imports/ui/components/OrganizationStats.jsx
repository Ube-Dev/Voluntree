import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

const OrganizationStats = () => {

  // Function to generate random integers between min and max (inclusive)
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Generate random data for each month
  const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push(getRandomInt(50, 200)); // Change the range as needed
    }
    return data;
  };

  const config = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Hours Served',
        data: generateRandomData(), // Generate random data for hours served
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Hours Served',
          },
        },
        x: {
          type: 'category',
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Hours Served Each Month',
        },
      },
    },
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Hours Served Each Month</h3>
          <Bar data={config} />
        </Col>
      </Row>
    </Container>
  );
};

export default OrganizationStats;
