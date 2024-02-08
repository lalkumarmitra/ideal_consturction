import React from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { Row,Col, Card } from "react-bootstrap";

function TransactionHistory() {
  return (
    <>
        <BreadCrumb title="History" prevPage="Home" prevPath="/dashboard" />
        <Row>
            <Col md={12} lg={3}>
                <Card>
                    <Card.Header>
                        <Card.Title>Filters</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        body
                    </Card.Body>
                    <Card.Footer>footer</Card.Footer>
                </Card>
            </Col>
            <Col md={12} lg={9} >
                <Card>
                    <Card.Header>
                        <Card.Title>Table</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        body
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
  );
}

export default TransactionHistory;
