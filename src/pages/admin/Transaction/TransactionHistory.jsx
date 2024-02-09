import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { Row, Col, Card, Button, Collapse } from "react-bootstrap";
import { TableResponsive } from "../../../components/common/TableResponsive";
import { item, client, transaction, vehicles, staff } from "../../../helper/api_url";
import { swal } from "../../../helper/swal";


function TransactionHistory() {
    const [tableData, setTableData] = useState([]);
    const [historyinfo, setHistoryinfo] = useState({});
    const [itemData, setItemData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [vehicleData, setvehicleData] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [openfilter, setOpenFilter] = useState(true);
    
    const [fromDate,setFromDate] = useState();
    const [toDate,setToDate] = useState();
    const handleDateChange = (event,type) => {
        if(type == 'from') setFromDate(event.target.value)
        if(type == 'to') setToDate(event.target.value)
    };
    const setTransactionHistory = () =>{
        let formData = new FormData(document.getElementById('filters_form'));
        if(fromDate) formData.append('from_date',fromDate);
        if(toDate) formData.append('to_date',toDate);
        transaction.history(formData).then(res => {
            setTableData(res.data.transactions)
            setHistoryinfo({
                total_transactions: res.data.total_transactions,
                total_purchase_quantity: res.data.total_purchase_quantity,
                total_purchase_price: res.data.total_purchase_price,
                total_sales_quantity: res.data.total_sales_quantity,
                total_sales_price: res.data.total_sales_price,
            })
            setFromDate(res.data.dates.from.split('T')[0]);
            setToDate(res.data.dates.to.split('T')[0]);
        }).catch(e => console.log(e)).finally(r=>console.log(r));
    }
    useEffect(() => {
        setTransactionHistory();
        item.list().then(r => setItemData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
        client.list().then(r => setClientData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
        vehicles.list().then(r => setvehicleData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
        staff.list().then(r => setUserData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
    }, []);
    const columns = useMemo(() => [
        { Header: "Item/Product", accessor: "item.name" },
        { Header: "Loading Point", accessor: "loading_point.name" },
        {
            Header: "Purchase Price",
            HeaderClass: 'text-center',
            DataClass: 'text-center',
            Cell: (cell) => {
                const row = cell.row.original;
                const purchase_price = row.purchase_rate * row.purchase_quantity;
                return `${row.purchase_rate} X ${row.purchase_quantity} = ${purchase_price}`;
            }
        },
        { Header: "UnLoading Point", accessor: "unloading_point.name" },
        {
            Header: "Sale Price",
            HeaderClass: 'text-center',
            DataClass: 'text-center',
            Cell: (cell) => {
                const row = cell.row.original;
                const sales_price = row.sales_rate * row.sales_quantity;
                if (row.status === 'sold')
                    return `${row.sales_rate} X ${row.sales_quantity} = ${sales_price}`;
                return "-";
            }
        },
        {
            Header: 'List',
            HeaderClass: 'd-none',
            DataClass: 'd-none',
            list: (row) => {
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
                                <button onClick={() => console.log(row)} className="btn btn-sm btn-soft-danger ms-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
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
                    <Card className="py-3">
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
                </Col>
                <Col md={12} lg={8} >
                    <Card>
                        <Card.Header>
                            <Card.Title>  
                                <Row>
                                    <Col xs={6} lg={6} className='text-start'>Filters</Col>
                                    <Col xs={6} lg={6} className='text-end'>
                                        <button className="btn btn-primary btn-sm btn-end"  onClick={() => setOpenFilter(!openfilter)}><i className="bx bx-dots-vertical-rounded"></i></button>
                                    </Col>
                                </Row>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={openfilter}>
                            <Card.Body>
                                <form id='filters_form'>
                                    <div className="row g-3">
                                        <div className='col-6'>
                                            <label htmlFor="item_id" className="form-label">Item<span className='text-danger'>*</span></label>
                                            <select onChange={setTransactionHistory} id="item_id" name='item_id' className='form-control' >
                                                <option value="" selected>All</option>
                                                {itemData.length ? itemData.map((item, idx) => (<option key={idx} value={item.id}>{item.name}</option>)) : (<option disabled >No Data Found</option>)}
                                            </select>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="transaction_status" className="form-label">Status</label>
                                            <select onChange={setTransactionHistory} id="transaction_status" name='status' className='form-control'>
                                                <option selected value=''>All</option>
                                                <option value='purchased'>Purchased</option>
                                                <option value='sold'>Sold</option>
                                            </select>
                                        </div>
                                        <div className="col-4 mb-2">
                                            <label htmlFor="loading_point" className="form-label">loading point</label>
                                            {/* client_type sender */}
                                            <select onChange={setTransactionHistory} id="loading_point" name="loading_point" className='form-control' >
                                                <option value="" selected>All</option>
                                                {clientData.length ? clientData.map((user, idx) => (user.client_type == "sender" ? <option key={idx} value={user.id}>{user.name}</option> : '')) : <option value="">No Data Found</option>}
                                            </select>
                                        </div>

                                        <div className="col-4 mb-2">
                                            <label htmlFor="vehicle_id" className="form-label">Vehicle (loading)</label>
                                            <select onChange={setTransactionHistory} id="vehicle_id" name='vehicle_id' className='form-control'  >
                                                <option value="" selected>All</option>
                                                {vehicleData.length ? vehicleData.map((item, idx) => (<option key={idx} value={item.id}>{item.type}</option>)) : (<option disabled >No data Found</option>)}
                                            </select>
                                        </div>
                                        <div className="col-4 mb-2">
                                            <label htmlFor="driver_id" className="form-label">Driver (loading)</label>
                                            <select onChange={setTransactionHistory} id="driver_id" name='driver_id' className='form-control' >
                                                <option value="" selected>All</option>
                                                {UserData.length ? UserData.map((user, idx) => (user.role_id === 2 ? <option key={idx} value={user.id}>{user.first_name} {user.last_name}</option> : '')) : (<option disabled >No data Found</option>)}
                                            </select>
                                        </div>

                                        <div className="col-4 mb-2">
                                            <label htmlFor="unloading_point" className="form-label">Unloading point</label>
                                            <select onChange={setTransactionHistory} id="unloading_point" name="unloading_point" className='form-control' >
                                                <option value="" selected>All</option>
                                                {clientData.length ? clientData.map((user, idx) => (user.client_type == "receiver" ? <option key={idx} value={user.id}>{user.name}</option> : '')) : <option value="">No Data Found</option>}
                                            </select>
                                        </div>
                                        <div className="col-4 mb-2">
                                            <label htmlFor="unloading_vehicle_id" className="form-label">Vehicle (unloading)</label>
                                            <select onChange={setTransactionHistory} id="unloading_vehicle_id" name='unloading_vehicle_id' className='form-control'  >
                                                <option value="" selected>All</option>
                                                {vehicleData.length ? vehicleData.map((item, idx) => (<option key={idx} value={item.id}>{item.type}</option>)) : (<option disabled >No data Found</option>)}
                                            </select>
                                        </div>
                                        <div className="col-4 mb-2">
                                            <label htmlFor="unloading_driver_id" className="form-label">Driver (unloading)</label>
                                            <select onChange={setTransactionHistory} id="unloading_driver_id" name='unloading_driver_id' className='form-control' >
                                                <option value="" selected>All</option>
                                                {UserData.length ? UserData.map((user, idx) => (user.role_id === 2 ? <option key={idx} value={user.id}>{user.first_name} {user.last_name}</option> : '')) : (<option disabled >No data Found</option>)}
                                            </select>
                                        </div>
                                        
                                        
                                    </div>
                                </form>
                            </Card.Body>
                        </Collapse>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title>Transaction History</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col xs={6}>
                                    <label>From</label>
                                    <input type="date" value={fromDate} onChange={e=>{
                                        handleDateChange(e,'from');
                                        setTransactionHistory();
                                    }} className="form-control" />
                                </Col>
                                <Col xs={6}>
                                    <label>To</label>
                                    <input type="date" value={toDate} onChange={e=>{
                                        handleDateChange(e,'to');
                                        setTransactionHistory();
                                    }} className="form-control" />
                                </Col>
                            </Row>
                            <hr />
                            <TableResponsive columns={columns} data={tableData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default TransactionHistory;
