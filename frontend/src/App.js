import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import EventCard from './components/EventCard';

axios.defaults.baseURL = "http://localhost:8000/"

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    // Initialize your form fields here
    eventTitle: '',
    description: '',
    location: '',
    eventPrice: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to your Node.js server for database insertion
      await axios.post('/submitFormData', formData);

      // Close the modal after successful submission
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="App">
      <Button variant="primary" onClick={handleShowModal}>
        Open Modal
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Card Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="eventTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="eventTitle"
                placeholder="Name"
                value={formData.eventTitle}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description </Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="eventPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="eventPrice"
                placeholder="Price"
                value={formData.eventPrice}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="eventRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number" 
                name="eventRating"
                placeholder="Rating"
                value={formData.eventRating}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>




     <EventCard/>
    </div>
  );
}

export default App;
