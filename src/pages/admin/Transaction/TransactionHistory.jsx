import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { Row,Col, Card, Button } from "react-bootstrap";
import { TableResponsive } from "../../../components/common/TableResponsive";
import { client, item, transaction, vehicles } from "../../../helper/api_url";


function TransactionHistory() {
    const [tableData,setTableData] = useState([]);
    const [historyinfo,setHistoryinfo]  = useState({});
    useEffect(()=>{
        transaction.history().then(res=>{
            setTableData(res.data.transactions)
            setHistoryinfo({
                total_transactions : res.data.total_transactions,
                total_purchase_quantity : res.data.total_purchase_quantity,
                total_purchase_price : res.data.total_purchase_price,
                total_sales_quantity : res.data.total_sales_quantity,
                total_sales_price : res.data.total_sales_price,
            })
        }).catch(e=>console.log(e));
    },[]);
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
                if(row.status === 'sold')
                return `${row.sales_rate} X ${row.sales_quantity} = ${sales_price}`;
                return "Purchased";
            }
        },
        {
            Header:'List',
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
                            <p className='mb-2'>Purchage : {row.purchase_rate} X {row.purchase_quantity} = {purchase_price}</p>
                            <p className='mb-2'>Sale : {row.purchase_rate} X {row.purchase_quantity} = {purchase_price}</p>
                            <p className="text-muted mb-0"><b>From :</b> {row.loading_point.name} <b>To :</b> {row.unloading_point?.name}</p>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <div>
                            <button onClick={()=>console.log(row)} className="btn btn-sm btn-soft-danger ms-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
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
        <BreadCrumb title="History" prevPage="Home" prevPath="/dashboard" />
        <Row>
            <Col md={12} lg={4}>
                <Card>
                    <Card.Header>
                        <Card.Title>Transaction Information</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <ul className="list-group">
                                    <li className='list-group-item'>
                                        <Row>
                                            <Col xs={8}><span className='fw-bold'>Total Transactions </span></Col>
                                            <Col xs={1}><span className='fw-bold'>:</span></Col>
                                            <Col className='text-start' xs={3}>
                                                <span className='text-wrap'> {historyinfo.total_transactions} </span>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li className='list-group-item'>
                                        <Row>
                                            <Col xs={8}><span className='fw-bold'>Total Purchase Quantity </span></Col>
                                            <Col xs={1}><span className='fw-bold'>:</span></Col>
                                            <Col className='text-start' xs={3}>
                                                <span className='text-wrap'> {historyinfo.total_purchase_quantity} </span>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li className='list-group-item'>
                                        <Row>
                                            <Col xs={8}><span className='fw-bold'>Total Purchase Price </span></Col>
                                            <Col xs={1}><span className='fw-bold'>:</span></Col>
                                            <Col className='text-start' xs={3}>
                                                <span className='text-wrap'> {historyinfo.total_purchase_price} </span>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li className='list-group-item'>
                                        <Row>
                                            <Col xs={8}><span className='fw-bold'>Total Sold Quantity </span></Col>
                                            <Col xs={1}><span className='fw-bold'>:</span></Col>
                                            <Col className='text-start' xs={3}>
                                                <span className='text-wrap'> {historyinfo.total_sales_quantity} </span>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li className='list-group-item'>
                                        <Row>
                                            <Col xs={8}><span className='fw-bold'>Total Sold Price </span></Col>
                                            <Col xs={1}><span className='fw-bold'>:</span></Col>
                                            <Col className='text-start' xs={3}>
                                                <span className='text-wrap'> {historyinfo.total_sales_price} </span>
                                            </Col>
                                        </Row>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <Card.Title>Filters</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={e=>console.log(e)}>
                            <div className="row g-3">
                                <div className='col-12'>
                                    <label htmlFor="role" className="form-label">Item<span className='text-danger'>*</span></label>                                    
                                    <select id="role" name='role_id' defaultValue='driver' className='form-control'>
                                        <option>something</option>
                                        {/* {filterData?.items?.length? filterData.items.map((data,idx)=>(
                                            <option key={idx} value={data.id}>{data.name}</option>
                                        )):(<option disabled >No Item Found</option>)} */}
                                    </select>
                                </div>
                                <div className="col-lg-12 col-6">
                                    <div className="mb-2">
                                        <label htmlFor="genderInput" className="form-label">loading point</label>
                                        <select id="genderInput" name='gender' defaultValue='male' className='form-control'>
                                            <option>select</option>
                                            {/* {genders.length?genders.map((gender,idx)=>(
                                                <option key={idx} value={gender.value}>{gender.label}</option>
                                            )):(<option disabled >No Gender Found</option>)} */}
                                        </select>
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="genderInput" className="form-label">Vehicle (loading)</label>
                                        <select id="genderInput" name='gender' defaultValue='male' className='form-control'>
                                            <option>select</option>
                                            {/* {genders.length?genders.map((gender,idx)=>(
                                                <option key={idx} value={gender.value}>{gender.label}</option>
                                            )):(<option disabled >No Gender Found</option>)} */}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="genderInput" className="form-label">Driver (loading)</label>
                                        <select id="genderInput" name='gender' defaultValue='male' className='form-control'>
                                            <option>select</option>
                                            {/* {genders.length?genders.map((gender,idx)=>(
                                                <option key={idx} value={gender.value}>{gender.label}</option>
                                            )):(<option disabled >No Gender Found</option>)} */}
                                        </select>
                                    </div>
                                    
                                </div>
                                <div className="col-lg-12 col-6">
                                    <div className="mb-2">
                                        <label htmlFor="genderInput" className="form-label">Unloading point</label>
                                        <select id="genderInput" name='gender' defaultValue='male' className='form-control'>
                                            <option>select</option>
                                            {/* {genders.length?genders.map((gender,idx)=>(
                                                <option key={idx} value={gender.value}>{gender.label}</option>
                                            )):(<option disabled >No Gender Found</option>)} */}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="genderInput" className="form-label">Vehicle (unloading)</label>
                                        <select id="genderInput" name='gender' defaultValue='male' className='form-control'>
                                            <option>select</option>
                                            {/* {genders.length?genders.map((gender,idx)=>(
                                                <option key={idx} value={gender.value}>{gender.label}</option>
                                            )):(<option disabled >No Gender Found</option>)} */}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="genderInput" className="form-label">Driver (unloading)</label>
                                        <select id="genderInput" name='gender' defaultValue='male' className='form-control'>
                                            <option>select</option>
                                            {/* {genders.length?genders.map((gender,idx)=>(
                                                <option key={idx} value={gender.value}>{gender.label}</option>
                                            )):(<option disabled >No Gender Found</option>)} */}
                                        </select>
                                    </div>
                                </div>
                                <div className="">
                                    <label htmlFor="genderInput" className="form-label">Status</label>
                                    <select id="genderInput" name='gender' defaultValue='male' className='form-control'>
                                        <option selected value=''>All</option>
                                        <option value='purchased'>Purchased</option>
                                        <option value='sold'>Sold</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={12} lg={8} >
                <Card>
                    <Card.Header>
                        <Card.Title>Transaction History</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <TableResponsive columns={columns} data={tableData} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
  );
}

export default TransactionHistory;
