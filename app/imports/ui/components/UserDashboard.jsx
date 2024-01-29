import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const UserDashboard = () => {
  const defaultProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const [image, setImage] = useState(defaultProfileImage);

  const changeProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card style={{ width: '50rem', height: '30rem' }}>
      <Card.Body className="d-flex flex-column align-items-center">
        <h2 className="mb-3">User Overview</h2>
        <div className="d-flex flex-column align-items-center">
          {image && (<img src={image} alt="ProfileImage" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px' }} />)}
          <input type="file" accept="image/*" onChange={changeProfileImage} style={{ marginBottom: '10px' }} />
          <h4>Name: John Doe</h4>
          <h4>Hours Recorded: 20 hours</h4>
          <Button variant="success" className="mt-3">
            View Account
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserDashboard;
