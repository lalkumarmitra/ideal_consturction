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
    const handleDelete = row => {
        console.log(row);
    }
    const columns = useMemo(()=>[
        {Header: "Item/Product",accessor: "item.name"},
        {Header: "Loading Point",accessor: "loading_point.name"},
        {
            Header:"Purchase Price",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell:(cell)=>{
                const row = cell.row.original;
                const purchase_price = row.purchase_rate * row.purchase_quantity;
                return `${row.purchase_rate} X ${row.purchase_quantity} = ${purchase_price}`;
            }
        },
        {Header: "UnLoading Point",accessor: "unloading_point.name"}, 
        {
            Header:"Sale Price",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell:(cell)=>{
                const row = cell.row.original;
                const sales_price = row.sales_rate * row.sales_quantity;
                if(row.sales_rate && row.sales_quantity)
                return `${row.sales_rate} X ${row.sales_quantity} = ${sales_price}`;
                return "-";
            }
        },
        {
            Header: "Action",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell:(cell)=>{
                const row = cell.row.original;
                return (
                    <div>
                        {row.status === 'sold'? (<span className='badge badge-outline-success'>Sold</span>) :(<AddSales data={row} listData={listData} setListData={setListData} />)}
                        <Button onClick={()=>handleDelete(row)} className="btn btn-sm btn-soft-danger ms-1" >
                            <i className="ri-delete-bin-fill" />  
                        </Button>
                    </div>
                ) 
            }
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