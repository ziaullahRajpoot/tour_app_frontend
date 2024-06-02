import React from 'react';
import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DestinationPage.css';

import parisDesktop from '../../assets/paris_desktop.jpg';
import parisMobile from '../../assets/paris_mobile.jpg';
import tokyoDesktop from '../../assets/tokyo_desktop.jpg';
import tokyoMobile from '../../assets/tokyo_mobile.jpg';
import newYorkDesktop from '../../assets/ny_desktop.jpg';
import newYorkMobile from '../../assets/ny_mobile.jpg';
import sydneyDesktop from '../../assets/sydney_desktop.jpg';
import sydneyMobile from '../../assets/sydney_mobile.jpg';

const destinations = [
  {
    name: 'Paris, France',
    desktopImage: parisDesktop,
    mobileImage: parisMobile,
    description: 'The City of Light, known for its cafes, art, and the iconic Eiffel Tower.'
  },
  {
    name: 'Tokyo, Japan',
    desktopImage: tokyoDesktop,
    mobileImage: tokyoMobile,
    description: 'A bustling city that blends the ultra-modern with traditional temples.'
  },
  {
    name: 'New York, USA',
    desktopImage: newYorkDesktop,
    mobileImage: newYorkMobile,
    description: 'The Big Apple, famous for its skyline, Broadway shows, and vibrant life.'
  },
  {
    name: 'Sydney, Australia',
    desktopImage: sydneyDesktop,
    mobileImage: sydneyMobile,
    description: 'Known for its Sydney Opera House, harbourfront, and beaches.'
  }
];

const DestinationPage = () => {
  return (
    <div className="destination-page">
      <Carousel className="destination-carousel">
        {destinations.map((destination, index) => (
          <Carousel.Item key={index}>
            <picture>
              <source media="(min-width: 768px)" srcSet={destination.desktopImage} />
              <source media="(max-width: 767px)" srcSet={destination.mobileImage} />
              <img
                className="d-block w-100 carousel-image"
                src={destination.desktopImage}
                alt={destination.name}
              />
            </picture>
            <Carousel.Caption>
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="mt-5 col-12">
        <Row>
          {destinations.map((destination, index) => (
            <Col xs={12} sm={6} lg={4} key={index} className="mb-4">
              <Card className="destination-card h-100">
                <picture>
                  <source media="(min-width: 768px)" srcSet={destination.desktopImage} />
                  <source media="(max-width: 767px)" srcSet={destination.mobileImage} />
                  <Card.Img variant="top" src={destination.desktopImage} />
                </picture>
                <Card.Body>
                  <Card.Title>{destination.name}</Card.Title>
                  <Card.Text>{destination.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default DestinationPage;
