import React, { useState,useMemo, useEffect } from 'react'
import { TableResponsive } from "../../../components/common/TableResponsive";
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import BreadCrumb from "../../../components/common/BreadCrumb";
import NewTransactionModal from './NewTransactionModal';
import { transaction } from '../../../helper/api_url';
import { swal } from '../../../helper/swal';
import AddSales from './AddSales';

function Transaction() {
    const [listData,setListData] = useState([]);
    useEffect(()=>{
        transaction.list().then(res=>setListData(res.data.transaction)).catch(err=>swal.error(err.response?err.response.data.message:err.message));
    },[]);
    const columns = useMemo(()=>[
        {Header: "Product Name",accessor: "item.name",HeaderClass:'text-center', DataClass:'text-center'},
        {Header: "Drive Name",accessor: "loading_point.name",HeaderClass:'text-center', DataClass:'text-center'},
        {Header: "Date",accessor: "purchase_date",HeaderClass:'text-center', DataClass:'text-center'},
        {
            Header: "Sales",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell:(cell)=>{
                const row = cell.row.original;
                // return row.fees.length 
                // ? row.transct.map(price=>(<span className='badge bg-success p-1'>{price.amount} <i className='bx bx-rupee ps-1' /></span>))
                // : (
                    // )
                return <AddSales data={row} listData={listData} setListData={setListData} />
            }
        },
        // {Header: "Action",accessor: "",HeaderClass:'text-center', DataClass:'text-center'},
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