// src/components/Deposits.js
import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const Deposits = ({ deposits, handleMakeDeposit, handleApproveDeposit }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMakeDeposit(amount);
    setAmount('');
  };

  const handleApprove = (index) => {
    handleApproveDeposit(index);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Deposits</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDeposit">
            <Form.Label>Deposit Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Make Deposit
          </Button>
        </Form>
        <ul>
          {deposits.map((deposit, index) => (
            <li key={index}>
              {deposit.date}: ${deposit.amount} ({deposit.status}){' '}
              {deposit.status === 'pending' && (
                <Button variant="success" onClick={() => handleApprove(index)}>
                  Approve
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default Deposits;
