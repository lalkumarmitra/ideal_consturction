import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from '../../../components/common/BreadCrumb';
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";

function AdminDashboard() {
  return (
    <>
      <BreadCrumb title="Dashboard" prevPage="Home" prevPath="/dashboard" />
      <Row>
        <Col></Col>
      </Row>
    </>
  )
}

export default AdminDashboard