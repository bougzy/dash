// src/components/Withdrawals.js
import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const Withdrawals = ({ withdrawals, handleMakeWithdrawal, handleApproveWithdrawal }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMakeWithdrawal(amount);
    setAmount('');
  };

  const handleApprove = (index) => {
    handleApproveWithdrawal(index);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Withdrawals</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formWithdrawal">
            <Form.Label>Withdrawal Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Make Withdrawal
          </Button>
        </Form>
        <ul>
          {withdrawals.map((withdrawal, index) => (
            <li key={index}>
              {withdrawal.date}: ${withdrawal.amount} ({withdrawal.status}){' '}
              {withdrawal.status === 'pending' && (
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

export default Withdrawals;
