import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from "../../../components/common/BreadCrumb";
import { TableResponsive } from "../../../components/common/TableResponsive";
import { Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { item } from '../../../helper/api_url';
import { NewItemModal } from '../../../components/common/modal';
function Items() {
    const [itemData,setItemData] = useState([]);
    useEffect(()=>{
        item.list().then(res=>setItemData(res.data.items))
    },[])
    const columns = useMemo(()=>[
        {
            Header: "Name",
            accessor: "name",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Rate",
            accessor: "rate",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Unit",
            accessor: "unit",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Description",
            accessor: "description",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Action",
            HeaderClass:'',
            DataClass:'',
            Cell:()=>{
                return 'action';
            }
        },
    ])
    return (
        <>
            <BreadCrumb title="Items" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Item List</h5>
                            <NewItemModal itemData={itemData} setItemData={setItemData} />
                        </CardHeader>
                        <CardBody className="">
                            <TableResponsive customPageSize={8} columns={columns} data={itemData}  />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Items