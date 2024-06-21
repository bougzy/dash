// src/components/AddUserForm.js
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const AddUserForm = ({ show, handleClose, handleAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs here if needed

    // Create new user object
    const newUser = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID (temporary)
      name,
      email,
      profitHistory: [], // Initialize empty arrays for other data
      depositHistory: [],
      withdrawalHistory: []
    };

    // Pass new user object to parent component
    handleAddUser(newUser);

    // Clear form inputs
    setName('');
    setEmail('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserForm;
