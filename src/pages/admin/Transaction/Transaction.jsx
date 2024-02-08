import React, { useState,useMemo } from 'react'
import { TableResponsive } from "../../../components/common/TableResponsive";
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import BreadCrumb from "../../../components/common/BreadCrumb";
import NewTransactionModal from './NewTransactionModal';

function Transaction() {
    const [listData,setListData] = useState([]);
    const columns = useMemo(()=>[
        {
            Header: "Name",
            Cell:()=>'name'
        },
    ]);
    return (
        <>
            <BreadCrumb title="Transactions" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Transaction List</h5>
                            <NewTransactionModal listData={listData} setListData={setListData} />
                        </CardHeader>
                        <CardBody className="">
                            <TableResponsive columns={columns} data={listData}  />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Transaction