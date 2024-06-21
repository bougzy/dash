// src/components/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ show }) => {
  return (
    <div className={`d-flex flex-column p-3 bg-light ${show ? '' : 'd-none'} d-md-block`} style={{ width: '250px', height: '100vh' }}>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/charts">Charts</Nav.Link>
        <Nav.Link href="/calendars">Calendars</Nav.Link>
        <Nav.Link href="/users">Users</Nav.Link>
        <Nav.Link href="/profits">Profits</Nav.Link>
        <Nav.Link href="/deposits">Deposits</Nav.Link>
        <Nav.Link href="/withdrawals">Withdrawals</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
