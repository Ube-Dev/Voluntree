import React, { useState } from 'react';
import '../css/EventPage.css';
import { Button, Card, Modal, Row, Col, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { SubmitField } from 'uniforms-bootstrap5';
import Tag from './Tag';
import { Skills } from '../../api/skill/SkillCollection';
import LoadingSpinner from './LoadingSpinner';
import { UserHasSkills } from '../../api/userHasSkill/UserHasSkillCollection';

const SkillChooserModal = () => {
  const { availableSkills, mySkills, ready } = useTracker(() => {
    const skillSubscription = Skills.subscribeSkill();
    const userSkillSubscription = UserHasSkills.subscribeUserHasSkill();
    const mySkillList = UserHasSkills.find({}).fetch();
    const availableSkillList = Skills.find({}).fetch();
    const rdy = skillSubscription.ready() && userSkillSubscription.ready();
    return {
      mySkills: mySkillList,
      availableSkills: availableSkillList,
      ready: rdy,
    };
  });
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  if (true) {
    return (
      <>
        <div className="text-center">
          <Button variant="primary" onClick={handleShow}> Add Skills </Button>
        </div>
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Choose Your Skills</Modal.Title>
          </Modal.Header>

          <Modal.Body className="scrollModal">
            <Row>
              <Col className="col-md-6">
                <Card>
                  <Form.Select aria-label="Default select example">
                    {
                      availableSkills.map((skill) => (<option value="1"> {skill.skill} </option>))
                    }
                  </Form.Select>
                  <Button>Add</Button>
                </Card>
              </Col>
              <Col className="col-md-6">
                <Card>
                  {
                    mySkills.map((skill) => (<Tag value={skill.skillID} />))
                  }
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </>
    );
  }

  console.log(ready);

  return (

    <LoadingSpinner />
  );

};
export default SkillChooserModal;
