// src/components/Profits.js
import React from 'react';
import { Card } from 'react-bootstrap';

const Profits = ({ profits }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Profits</Card.Title>
        <ul>
          {profits.map((profit, index) => (
            <li key={index}>
              {profit.date}: ${profit.amount} ({profit.status})
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default Profits;
