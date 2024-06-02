import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


const ContactUsPage = () => {
  return (
    <div className="contact-us-page">
      <Row className="justify-content-center my-5">
        <Col xs={12} md={8} lg={6} className="text-center">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Please fill out the form below to get in touch.</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="contact-form">
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter the subject" required />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Enter your message" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="contact-info mt-5">
        <Col xs={12} md={4} className="icon">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <p>123 Main Street, City, Country</p>
        </Col>
        <Col xs={12} md={4} className="icon">
          <FontAwesomeIcon icon={faPhone} />
          <p>(123) 456-7890</p>
        </Col>
        <Col xs={12} md={4} className="icon">
          <FontAwesomeIcon icon={faEnvelope} />
          <p>contact@yourcompany.com</p>
        </Col>
      </Row>

    </div>
  );
};

export default ContactUsPage;
