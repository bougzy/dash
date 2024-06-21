import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContents';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col xs={15}>
          <DashboardContent />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
