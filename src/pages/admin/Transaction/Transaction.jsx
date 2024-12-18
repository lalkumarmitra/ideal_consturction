import React, { useState,useMemo, useEffect } from 'react'
import { TableResponsive } from "../../../components/common/TableResponsive";
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import BreadCrumb from "../../../components/common/BreadCrumb";
import NewTransactionModal from './NewTransactionModal';
import { transaction } from '../../../helper/api_url';
import { swal } from '../../../helper/swal';
import AddSales from './AddSales';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import ViewTransaction from './ViewTransaction';
import { formatDate } from '../../../helper/formatDate';
import EditTransaction from './EditTransaction';

function Transaction() {
    const dispatch = useDispatch();
    const [listData,setListData] = useState([]);
    const [dataLoading,setDataLoading] = useState(true);
    useEffect(()=>{
        setDataLoading(true);
        transaction.list().then(res=>setListData(res.data.transaction))
        .catch(err=>swal.error(err.response?err.response.data.message:err.message))
        .finally(()=>setDataLoading(false));
    },[]);
    const handleDelete = itemRow => {
        Swal.fire({
            title: "Are you sure ?",
            text:" You want to delete this Transaction : " + itemRow.item.name,
            icon:'warning',
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `No`
        }).then((result)=>{
            if (result.isConfirmed) {
                dispatch(setPreloader({loader:true,message:'Deleting Item please wait'}))
                transaction.delete(itemRow.id)
                .then(res=>{
                    setListData([...listData.filter(i=>i.id!=itemRow.id)])
                    dispatch(setPreloader({loader:false,message:""}))
                    swal.success(res.data.message);
                })
                .catch(err=>{
                    dispatch(setPreloader({loader:false,message:""}))
                    swal.error(err.response ? err.response.data.message : err.message);
                })
            }
        })
    }
    const columns = useMemo(()=>[
        {Header: "Date",accessor: "sales_date",HeaderClass:'text-center',DataClass:'text-center',Cell:cell=>formatDate(cell.row.original.sales_date)},
        {Header: "Vehicle",accessor: "unloading_vehichle.number",HeaderClass:'text-center',DataClass:'text-center'},
        {Header: "Challan",accessor: "unloading_challan",HeaderClass:'text-center',DataClass:'text-center'},
        {Header: "Loading Point",accessor: "loading_point.name",HeaderClass:'text-center',DataClass:'text-center'},
        {Header: "UnLoading Point",accessor: "unloading_point.name",HeaderClass:'text-center',DataClass:'text-center'}, 
        {Header: "Item/Material",accessor: "item.name",HeaderClass:'text-center',DataClass:'text-center'},
        {Header: "Quantity",accessor: "sales_quantity",HeaderClass:'text-center',DataClass:'text-center',Cell:cell=>`${cell.row.original.sales_quantity}  ${cell.row.original.item.unit}`},
        {
            Header: "Action",
            accessor:'action',
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell:(cell)=>{
                const row = cell.row.original;
                return (
                    <div>
                        <EditTransaction rowData={row} setListData={setListData} />
                        <Button onClick={()=>handleDelete(row)} className="btn btn-sm btn-soft-danger ms-1" >
                            <i className="ri-delete-bin-fill" />  
                        </Button>
                    </div>
                ) 
            }
        },
        {
            Header:'List',
            accessor:'none',
            HeaderClass:'d-none',
            DataClass:'d-none',
            list:(row)=>{
                const purchase_price = row.purchase_rate * row.purchase_quantity;
                const sales_price = row.sales_rate * row.sales_quantity;
                return (
                <div className="d-flex">
                    <div className="flex-grow-1" data-id="1">
                        <h5 className="fs-13 mb-1">
                            <a href="#">{row.item.name} </a>
                        </h5>
                        <div className='mt-3'>
                            <p className='mb-2'>Purchage : {row.purchase_rate} X {row.purchase_quantity} = {purchase_price?.toFixed(2)}</p>
                            <p className='mb-2'>Sale : {row.sales_rate} X {row.sales_quantity} = {sales_price?.toFixed(2)}</p>
                            <p className="text-muted mb-0"><b>From :</b> {row.loading_point.name} <b>To :</b> {row.unloading_point?.name}</p>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <div>
                            {(row.status === 'sold')?"":(<AddSales data={row} listData={listData} setListData={setListData} />)}
                            <EditTransaction rowData={row} setListData={setListData} />
                            <button onClick={()=>handleDelete(row)} className="btn btn-sm btn-soft-danger ms-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                            {/* <button onClick={()=>handleDelete(row)} className="btn btn-sm btn-soft-info ms-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button> */}
                        </div>
                    </div>
                </div>
                )
            }
        }
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
                            <TableResponsive showColumnsFilter  isLoading={dataLoading}  columns={columns} data={listData}  />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Transaction