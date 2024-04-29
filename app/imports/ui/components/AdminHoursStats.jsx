import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

const AdminHoursStats = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
  );

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Hours Served',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132)',
      },
    ],
  };

  return (
    <Container>
      <Card className="rounded-4 p-3">
        <Row>
          <Col className="text-center">
            <h3>Hours Served By Month</h3>
            <Bar options={options} data={data} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AdminHoursStats;
