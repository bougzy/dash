// src/components/DashboardContent.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import AppNavbar from './AppNavbar'; // Import the Navbar component
import Sidebar from './Sidebar'; // Import the Sidebar component
import Charts from './Charts'; // Assuming you have a Charts component
import CalendarComponent from './Calendar'; // Import the Calendar component
import Profits from './Profits';
import Deposits from './Deposits';
import Withdrawals from './Withdrawals';
import AddUserForm from './AddUserForm'; // Import the AddUserForm component
import WorldMap from './WorldMap'; // Import the WorldMap component

const DashboardContent = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [siteVisits, setSiteVisits] = useState([
    { name: 'New York', lat: 40.7128, lng: -74.0060, visits: 150 },
    { name: 'London', lat: 51.5074, lng: -0.1278, visits: 100 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917, visits: 200 },
    // Add more site visit data as needed
  ]);

  useEffect(() => {
    // Load users from localStorage on component mount
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    // Save users to localStorage whenever users state changes
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
    setShowModal(false); // Close modal after adding user
  };

  const handleMakeDeposit = (userId, amount) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newDeposit = { date: new Date().toISOString(), amount, status: 'pending' };
        user.depositHistory.push(newDeposit);
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleApproveDeposit = (userId, index) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId && user.depositHistory[index]) {
        user.depositHistory[index].status = 'approved';
        // Move approved deposit to beginning of deposit history
        const approvedDeposit = user.depositHistory[index];
        user.depositHistory.splice(index, 1); // Remove from pending
        user.depositHistory.unshift(approvedDeposit); // Add to beginning of history
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleMakeWithdrawal = (userId, amount) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newWithdrawal = { date: new Date().toISOString(), amount, status: 'pending' };
        user.withdrawalHistory.push(newWithdrawal);
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleApproveWithdrawal = (userId, index) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId && user.withdrawalHistory[index]) {
        user.withdrawalHistory[index].status = 'approved';
        // Move approved withdrawal to beginning of withdrawal history
        const approvedWithdrawal = user.withdrawalHistory[index];
        user.withdrawalHistory.splice(index, 1); // Remove from pending
        user.withdrawalHistory.unshift(approvedWithdrawal); // Add to beginning of history
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleCloseDetails = () => setShowDetails(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <AppNavbar /> {/* Include the Navbar component */}
      <Button className="d-md-none" onClick={() => setShowSidebar(!showSidebar)}>
        Toggle Sidebar
      </Button>
      <div className="d-flex">
        <Sidebar show={showSidebar} />
        <Container className="mt-3">
          <Row>
            <Col xs={12} md={6}>
              <Card className="mb-3" id="charts">
                <Card.Body>
                  <Card.Title>Charts</Card.Title>
                  <Charts />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="mb-3" id="calendar">
                <Card.Body>
                  <Card.Title>Calendars</Card.Title>
                  <CalendarComponent />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Card className="mb-3" id="world-map">
                <Card.Body>
                  <Card.Title>World Map</Card.Title>
                  <WorldMap siteVisits={siteVisits} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Card className="mb-3" id="users">
                <Card.Body>
                  <Card.Title>Users</Card.Title>
                  <ul>
                    {users.map((user) => (
                      <li key={user.id}>
                        <Button variant="link" onClick={() => handleShowDetails(user)}>
                          {user.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <Button variant="primary" onClick={handleShowModal}>Add User</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Profits profits={selectedUser ? selectedUser.profitHistory : []} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Deposits 
                deposits={selectedUser ? selectedUser.depositHistory : []} 
                handleMakeDeposit={handleMakeDeposit} 
                handleApproveDeposit={handleApproveDeposit} 
              />
            </Col>
            <Col xs={12} md={6}>
              <Withdrawals 
                withdrawals={selectedUser ? selectedUser.withdrawalHistory : []} 
                handleMakeWithdrawal={handleMakeWithdrawal} 
                handleApproveWithdrawal={handleApproveWithdrawal} 
              />
            </Col>
          </Row>

          <Modal show={showDetails} onHide={handleCloseDetails}>
            <Modal.Header closeButton>
              <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedUser && (
                <div>
                  <p>Name: {selectedUser.name}</p>
                  <p>Email: {selectedUser.email}</p>
                  <h5>Profit History</h5>
                  <ul>
                    {selectedUser.profitHistory.map((profit, index) => (
                      <li key={index}>
                        {profit.date}: ${profit.amount} ({profit.status})
                      </li>
                    ))}
                  </ul>
                  <h5>Deposit History</h5>
                  <ul>
                    {selectedUser.depositHistory.map((deposit, index) => (
                      <li key={index}>
                        {deposit.date}: ${deposit.amount} ({deposit.status})
                      </li>
                    ))}
                  </ul>
                  <h5>Withdrawal History</h5>
                  <ul>
                    {selectedUser.withdrawalHistory.map((withdrawal, index) => (
                      <li key={index}>
                        {withdrawal.date}: ${withdrawal.amount} ({withdrawal.status})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetails}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <AddUserForm show={showModal} handleClose={handleCloseModal} handleAddUser={handleAddUser} />
        </Container>
      </div>
    </div>
  );
};

export default DashboardContent;
