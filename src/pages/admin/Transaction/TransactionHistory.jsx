import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { Row, Col, Card, Button, Collapse } from "react-bootstrap";
import { TableResponsive } from "../../../components/common/TableResponsive";
import { item, client, transaction, vehicles, staff } from "../../../helper/api_url";
import { swal } from "../../../helper/swal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDate } from "../../../helper/formatDate";
import CustomSelect from "../../../components/CustomSelect";
import ViewTransaction from "./ViewTransaction";


function TransactionHistory() {
    const [tableData, setTableData] = useState([]);
    const [dataLoading,setDataLoading] = useState(true);
    const [historyinfo, setHistoryinfo] = useState({});
    const [itemData, setItemData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [vehicleData, setvehicleData] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [openfilter, setOpenFilter] = useState(true);
    const [fromDate,setFromDate] = useState();
    const [toDate,setToDate] = useState();
    // const [viewModalStatus,setViewModalStatus] = useState(false);
    
    const handleButtonClickUnderConstruction = () => swal.warning('Under construction','This Feature is comming Soon');
    const setTransactionHistory = (target) =>{
        setDataLoading(true);
        let formData = new FormData(target);
        if(fromDate) formData.append('to_date',fromDate);
        if(toDate) formData.append('from_date',toDate);
        transaction.history(formData).then(res => {
            setTableData(res.data.transactions)
            setHistoryinfo({
                total_transactions: res.data.total_transactions,
                total_purchase_quantity: res.data.total_purchase_quantity,
                total_purchase_price: res.data.total_purchase_price,
                total_sales_quantity: res.data.total_sales_quantity,
                total_sales_price: res.data.total_sales_price,
            })
            if(!fromDate) setFromDate(res.data.dates.to.split('T')[0]);
            if(!toDate) setToDate(res.data.dates.from.split('T')[0]);
        }).catch(e => console.log(e))
        .finally(()=>setDataLoading(false));
    }
    useEffect(() => {
        item.list().then(r => setItemData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
        client.list().then(r => setClientData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
        vehicles.list().then(r => setvehicleData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
        staff.list().then(r => setUserData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
    }, []);
    useEffect(()=>{
        setTransactionHistory(document.getElementById('filters_form'));
    },[fromDate,toDate]);
    const columns = useMemo(() => [
        { Header: "Item/Product", accessor: "item.name" },
        { Header: "Loading Point", accessor: "loading_point.name" },
        { Header: "Rate (Purchase)", accessor: "purchase_rate",HeaderClass: 'text-center',DataClass: 'text-center', },
        { Header: "Quantity (Purchase)", accessor: "purchase_quantity",HeaderClass: 'text-center',DataClass: 'text-center', },
        {
            Header: "Purchase Price",HeaderClass: 'text-center',DataClass: 'text-center',
            Cell: (cell) => {
                const row = cell.row.original;
                const purchase_price = row.purchase_rate * row.purchase_quantity;
                return (<span><i className="bx bx-rupee"></i>{purchase_price.toFixed(2)}</span>);
            }
        },
        { Header: "UnLoading Point", accessor: "unloading_point.name" },
        { Header: "Rate (Sale)", accessor: "sales_rate",HeaderClass: 'text-center',DataClass: 'text-center', },
        { Header: "Quantity (Sale)", accessor: "sales_quantity",HeaderClass: 'text-center',DataClass: 'text-center', },
        {
            Header: "Sale Price",
            HeaderClass: 'text-center',
            DataClass: 'text-center',
            Cell: (cell) => {
                const row = cell.row.original;
                const sales_price = row.sales_rate * row.sales_quantity;
                if (row.status === 'sold')
                    return (<span><i className="bx bx-rupee"></i>{sales_price.toFixed(2)}</span>);
                return "-";
            }
        },
        { Header: "Challan No", accessor: "unloading_challan" },
        {
            Header: "Action",
            HeaderClass: 'text-center',
            DataClass: 'text-center',
            Cell: (cell) => {
                const row = cell.row.original;
                return (
                    <div className="">
                        <ViewTransaction transaction={row} />
                        <Button onClick={handleButtonClickUnderConstruction} className="btn btn-sm btn-soft-info me-1" >
                            <i className="ri-pencil-fill" />  
                        </Button>
                        <Button onClick={handleButtonClickUnderConstruction} className="btn btn-sm btn-soft-warning me-1" >
                            <i className=" ri-file-list-3-fill" />  
                        </Button>
                    </div>
                )
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
                                <p className='mb-2'>Purchage : {row.purchase_rate} X {row.purchase_quantity} = {purchase_price?.toFixed(2)}</p>
                                <p className='mb-2'>Sale : {row.sales_rate} X {row.sales_quantity} = {sales_price?.toFixed(2)}</p>
                                <p className="text-muted mb-0"><b>From :</b> {row.loading_point.name} <b>To :</b> {row.unloading_point?.name}</p>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <div>
                                <Button onClick={handleButtonClickUnderConstruction} className="btn btn-sm btn-soft-success me-1" >
                                    <i className="ri-eye-fill" />  
                                </Button>
                                <Button onClick={handleButtonClickUnderConstruction} className="btn btn-sm btn-soft-info me-1" >
                                    <i className="ri-pencil-fill" />  
                                </Button>
                                <Button onClick={handleButtonClickUnderConstruction} className="btn btn-sm btn-soft-warning me-1" >
                                    <i className=" ri-file-list-3-fill" />  
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    ]);
    const generatePdf = () =>{
        const doc = new jsPDF('p','mm','a4');
        doc.text("IDEAL Construction : Transaction Purchase History information", 15, 10);
        doc.text(`Date : ${formatDate(fromDate)} - ${formatDate(toDate)}`,15,20);
        doc.text(`Total Purchase Price : ${historyinfo.total_purchase_price?.toFixed(2)}`,15,30);
        doc.autoTable({
            head:[['Product','Quantity','Rate','Price','Loading point','Unloading Point','Purchase Date']],
            body:tableData.reverse().map(d=>([
                // d.id,
                d.item.name,
                d.purchase_quantity,
                d.purchase_rate,
                d.purchase_price?.toFixed(2),
                d.loading_point.name,
                d.unloading_point.name,
                formatDate(d.purchase_date),
                // formatDate(d.created_at)
            ])),
            startY:40,
            startX:10,
            theme: 'grid',
        });
        doc.save('Purchase_history.pdf');
    }
    const generateSalePdf = () =>{
        const doc = new jsPDF('p','mm','a4');
        doc.text("IDEAL Construction : Transaction Sale History information", 15, 10);
        doc.text(`Date : ${formatDate(fromDate)} - ${formatDate(toDate)}`,15,20);
        doc.text(`Total Sales Price : ${historyinfo.total_sales_price?.toFixed(2)}`,15,30)
        doc.autoTable({
            head:[['Product','Quantity','Rate','Price','Loading point','Unloading Point','Sales Date']],
            body:tableData.reverse().map(d=>([
                // d.id,
                d.item.name,
                d.sales_quantity,
                d.sales_rate,
                d.sales_price?.toFixed(2),
                d.loading_point.name,
                d.unloading_point.name,
                formatDate(d.sales_date)
                // formatDate(d.created_at)
            ])),
            startY:40,
            startX:10,
            theme: 'grid',
        });
        doc.save('Sales_History.pdf');
    }


    return (
        <>
            <BreadCrumb title="History" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col>
                    <div className="card crm-widget">
                        <div className="card-body p-0">
                            <div className="row row-cols-xxl-4 row-cols-md-2 row-cols-1 g-0">
                                <div className="col">
                                    <div className="py-4 px-3">
                                        <h5 className="text-muted text-uppercase fs-13">Total Transactions</h5>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 avatar-sm">
                                                <span className="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                                    <i className="ri-space-ship-line"></i>
                                                </span>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h2 className="mb-0"><span className="text-dark">{historyinfo.total_transactions} Transactions</span></h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mt-3 mt-md-0 py-4 px-3">
                                        <h5 className="text-muted text-uppercase fs-13">Total Purchase</h5>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 avatar-sm">
                                                <span className="avatar-title bg-soft-warning text-warning rounded-2 fs-2">
                                                    <i className="bx bx-shopping-bag"></i>
                                                </span>
                                            </div>
                                            <div className="flex-grow-1 ms-3 mt-1">
                                                <h4 className="mb-0"><span className="text-dark" ><i className="bx bx-rupee"></i> {historyinfo.total_purchase_price?.toFixed(2)}</span></h4>
                                                <p className="mb-0"><span className="text-muted" >Quantity : {historyinfo.total_purchase_quantity?.toFixed(2)}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mt-3 mt-md-0 py-4 px-3 border-right">
                                        <h5 className="text-muted text-uppercase fs-13">Total Sale</h5>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 avatar-sm">
                                                <span className="avatar-title bg-soft-info text-info rounded-2 fs-2">
                                                    <i className="ri-pulse-line"></i>
                                                </span>
                                            </div>
                                            <div className="flex-grow-1 ms-3 mt-1">
                                                <h4 className="mb-0"><span className="text-dark" ><i className="bx bx-rupee"></i> {historyinfo.total_sales_price?.toFixed(2)}</span></h4>
                                                <p className="mb-0"><span className="text-muted" >Quantity : {historyinfo.total_sales_quantity?.toFixed(2)}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mt-3 mt-lg-0 py-4 px-2">
                                        <h5 className="text-muted text-uppercase fs-13">Total Profit<i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle"></i></h5>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 avatar-sm">
                                                <span className="avatar-title bg-soft-success text-success rounded-2 fs-2">
                                                    <i className="bx bx-rupee"></i>
                                                </span>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h2 className="mb-0"><span className="text-dark">{
                                                    (((historyinfo.total_sales_price-historyinfo.total_purchase_price)/historyinfo.total_purchase_price)*100)?.toFixed(2)
                                                }</span>%</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Header className="p-2 border-0">
                            <Card.Title className="m-0">  
                                <Row className="px-2">
                                    <Col xs={6} lg={6} className='text-start d-flex align-items-center'>Filters</Col>
                                    <Col xs={6} lg={6} className='text-end'>
                                        <button className="btn btn-soft-secondary btn-sm btn-end"  onClick={() => setOpenFilter(!openfilter)}>
                                            {openfilter?<i className="ri-arrow-up-s-line"></i>:<i className="ri-arrow-down-s-line"></i>}
                                        </button>
                                    </Col>
                                </Row>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={openfilter}>
                            <form id='filters_form' onSubmit={e=>{e.preventDefault();setTransactionHistory(e.target)}}>
                                <hr />
                                <Card.Body>
                                    <div className="row g-3">
                                        <div className='col-6'>
                                            <label htmlFor="item_id" className="form-label">Item<span className='text-danger'>*</span></label>
                                            <CustomSelect 
                                                name="item_id" 
                                                isSearchable 
                                                defaultValue={{value:'',label:'All'}}
                                                options={[{value:'',label:'All'},...itemData.map(i=>({value:i.id,label:i.name}))]} 
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="transaction_status" className="form-label">Status</label>
                                            <CustomSelect 
                                                name='status'
                                                isSearchable
                                                defaultValue={{value:'',label:'All'}}
                                                options={[{value:'',label:'All'},{value:'purchased',label:'Purchased'},{value:'sold',label:'Sold'}]} 
                                            />
                                        </div>
                                        <div className="col-4 mb-2">
                                            <label htmlFor="loading_point" className="form-label">loading point</label>
                                            <CustomSelect 
                                                isSearchable 
                                                name="loading_point" 
                                                defaultValue={{value:'',label:'All'}}
                                                options={[{value:'',label:'All'},...clientData.filter(c=>c.client_type=="sender").map(c=>({value:c.id,label:c.name}))]} 
                                            />
                                        </div>

                                        <div className="col-4 mb-2">
                                            <label htmlFor="vehicle_id" className="form-label">Vehicle (loading)</label>
                                            <CustomSelect
                                                isSearchable
                                                name="vehicle_id"
                                                defaultValue={{value:'',label:'All'}}
                                                options={[{value:'',label:'All'},...vehicleData.map(v=>({value:v.id,label:v.type}))]}
                                            />
                                        </div>
                                        <div className="col-4 mb-2">
                                            <label htmlFor="driver_id" className="form-label">Driver (loading)</label>
                                            <CustomSelect 
                                                isSearchable
                                                name="driver_id"
                                                defaultValue={{value:'',label:'All'}}
                                                options={[{value:'',label:'All'},...UserData.filter(u=>u.role_id === 2).map(u=>({value:u.id,label:`${u.first_name} ${u.last_name}`}))]}
                                            />
                                        </div>

                                        <div className="col-4 mb-2">
                                            <label htmlFor="unloading_point" className="form-label">Unloading point</label>
                                            <CustomSelect 
                                                isSearchable 
                                                name="unloading_point" 
                                                defaultValue={{value:'',label:'All'}}
                                                options={[{value:'',label:'All'},...clientData.filter(c=>c.client_type=="receiver").map(c=>({value:c.id,label:c.name}))]} 
                                            />
                                        </div>
                                        <div className="col-4 mb-2">
                                            <label htmlFor="unloading_vehicle_id" className="form-label">Vehicle (unloading)</label>
                                            <CustomSelect
                                                isSearchable
                                                name="unloading_vehicle_id"
                                                defaultValue={{value:'',label:'All'}}
                                                options={[{value:'',label:'All'},...vehicleData.map(v=>({value:v.id,label:v.type}))]}
                                            />
                                        </div>
                                        <div className="col-4 mb-2">
                                            <label htmlFor="unloading_driver_id" className="form-label">Driver (unloading)</label>
                                            <CustomSelect 
                                                isSearchable
                                                name="unloading_driver_id"
                                                defaultValue={{value:'',label:'All'}}
                                                options={[{value:'',label:'All'},...UserData.filter(u=>u.role_id === 2).map(u=>({value:u.id,label:`${u.first_name} ${u.last_name}`}))]}
                                            />
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col className="mb-2 d-flex align-items-center justify-content-end">
                                            <Button type="submit" className="btn btn-info">
                                                <i className="ri-filter-2-fill me-2"/> Apply
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </form>
                        </Collapse>
                    </Card>
                </Col>
                <Col xs={12}>
                    <Card>
                        <Card.Header className="d-flex align-item-center justify-content-between">
                            <Card.Title className="d-flex align-items-center">Transaction History</Card.Title>
                            <div>
                                <Button onClick={generatePdf} className="btn btn-soft-success me-2">Purchase PDF</Button>
                                <Button onClick={generateSalePdf} className="btn btn-soft-warning">Sale PDF</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col xs={6}>
                                    <label>From</label>
                                    <input type="date" value={fromDate} onChange={e=>{
                                        setFromDate(e.target.value)
                                        
                                    }} className="form-control" />
                                </Col>
                                <Col xs={6}>
                                    <label>To</label>
                                    <input type="date" value={toDate} onChange={e=>{
                                        setToDate(e.target.value);
                                    
                                    }} className="form-control" />
                                </Col>
                            </Row>
                            <hr />
                            <TableResponsive isLoading={dataLoading} columns={columns} data={tableData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default TransactionHistory;
