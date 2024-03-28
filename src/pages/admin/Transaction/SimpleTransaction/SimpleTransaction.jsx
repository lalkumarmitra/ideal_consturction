import React, { useMemo, useState } from 'react'
import BreadCrumb from '../../../../components/common/BreadCrumb'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import { TableResponsive } from '../../../../components/common/TableResponsive'

function SimpleTransaction() {
    const [listData,setListData] = useState([]);
    const [dataLoading,setDataLoading] = useState(false);
    const columns = useMemo(()=>[
        {Header: "Item/Product",accessor: "item.name"},
        {Header: "Loading Point",accessor: "loading_point.name"},
    ]);

    return (
        <>
            <BreadCrumb title="Transactions" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Transaction List</h5>
                            {/* <NewTransactionModal listData={listData} setListData={setListData} /> */}
                        </CardHeader>
                        <CardBody className="">
                            <TableResponsive isLoading={dataLoading}  columns={columns} data={listData}  />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SimpleTransaction