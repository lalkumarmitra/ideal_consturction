import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from "../../../components/common/BreadCrumb";
import { Button, Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { client, item, staff, transaction, vehicles } from '../../../helper/api_url';
import { swal } from '../../../helper/swal';
import CustomSelect from '../../../components/CustomSelect';
import { TableResponsive } from '../../../components/common/TableResponsive';
import { formatDate, formatDateYMD } from '../../../helper/formatDate';
import ViewTransaction from './ViewTransaction';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function PurchaseHistory() {
    const today = new Date();
    const [tableData,setTableData] = useState([]);
    const [dataLoading,setDataLoading] = useState(true);
    const [subTotal,setSubTotal] = useState(0)
    const [toDate,setToDate] = useState(formatDateYMD(today));
    const [fromDate,setFromDate] = useState(formatDateYMD(today.setMonth(today.getMonth() - 2)));
    const [filters,setFilters] = useState({
        item_id: "",
        status: "",
        loading_point: "",
        vehicle_id: "",
        driver_id: "",
        unloading_point: "",
        unloading_vehicle_id: "",
        unloading_driver_id: "",
    })
    const [itemData, setItemData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [vehicleData, setvehicleData] = useState([]);
    useEffect(() => {
        item.list().then(r => setItemData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
        client.list().then(r => setClientData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
        vehicles.list().then(r => setvehicleData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
    }, []);
    const handleButtonClickUnderConstruction = () => swal.warning('Under construction','This Feature is comming Soon');
    const getTransactionHistory = () =>{
        setTableData([]);
        setDataLoading(true);
        const formData = new FormData();
        const data = {'from_date': toDate,'to_date': fromDate,...filters};
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        transaction.history(formData).then(r=>{
            setTableData(r.data.transactions)
            setSubTotal(r.data.total_purchase_price)
        }).catch(e=>console.error(e)).finally(()=>setDataLoading(false));
    }
    useEffect(()=>{getTransactionHistory();},[filters,fromDate,toDate]);
    const columns = useMemo(()=>[
        {Header: "Date",accessor: "sales_date",HeaderClass:'text-center',DataClass:'text-center',Cell:cell=>formatDate(cell.row.original.purchase_date)},
        {Header: "Vehicle",accessor: "loading_vehicle.number",HeaderClass:'text-center',DataClass: filters.vehicle_id? 'text-center bg-soft-warning' :'text-center'},
        {Header: "Challan",accessor: "unloading_challan",HeaderClass:'text-center',DataClass:'text-center'},
        {Header: "Loading Point",accessor: "loading_point.name",HeaderClass:'text-center',DataClass: filters.loading_point? 'text-center bg-soft-warning' :'text-center'},
        {Header: "UnLoading Point",accessor: "unloading_point.name",HeaderClass:'text-center',DataClass: filters.unloading_point? 'text-center bg-soft-warning' :'text-center'}, 
        {Header: "Item/Material",accessor: "item.name",HeaderClass:'text-center',DataClass: filters.item_id? 'text-center bg-soft-warning' :'text-center'},
        {Header: "Quantity",accessor: "purchase_quantity",HeaderClass:'text-center',DataClass:'text-center',Cell:cell=>`${cell.row.original.sales_quantity}  ${cell.row.original.item.unit}`},
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
                            <p className='mb-2'>Purchase : {row.purchase_rate} X {row.purchase_quantity} ({row.item.unit}) = {purchase_price?.toFixed(2)}</p>
                            <p className="text-muted mb-0"><b>From :</b> {row.loading_point.name} <b>To :</b> {row.unloading_point?.name}</p>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <div>
                            <button onClick={()=>{}} className="btn btn-sm btn-soft-danger ms-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                        </div>
                    </div>
                </div>
                )
            }
        }
    ]);
    const generatePdf = () =>{
        const doc = new jsPDF('p','mm','a4');
        let count = 1;
        let tableHeadings=[
            {content:'SL',styles:{halign:'center'}},
            {content:'Date',styles:{halign:'center'}},
            {content:'Vehicle',styles:{halign:'center'}},
            {content:'D.O. Number',styles:{halign:'center'}},
            {content:'Loading point',styles:{halign:'center'}},
            {content:'Unloading Point',styles:{halign:'center'}},
            {content:'Material',styles:{halign:'center'}},
            {content:'Quantity',styles:{halign:'center'}},
        ];
        doc.autoTable({
            head: [
                [{ content: "IDEAL Construction : Transaction Purchase information", colSpan: tableHeadings.length, styles: { halign: 'center' } }],
                [{ content: `${formatDate(fromDate)}   To  ${formatDate(toDate)}`, colSpan: tableHeadings.length, styles: { halign: 'center' } }]
            ],
            startY: 10,
            theme: 'plain',
        });
        if (filters.item_id){
            tableHeadings = tableHeadings.filter(heading => heading.content !== 'Material');
            doc.autoTable({
                head: [
                    [{ content: itemData.filter(i=>i.id===filters.item_id)[0].name, colSpan: tableHeadings.length, styles: { halign: 'center' } }]
                ],
                startY: 40,
                theme: 'grid',
            });
        }
        if(filters.loading_point) {
            tableHeadings = tableHeadings.filter(heading => heading.content !== 'Loading Point');
            doc.autoTable({
                head: [
                    [{ content: clientData.filter(i=>i.id===filters.loading_point)[0].name, colSpan: tableHeadings.length, styles: { halign: 'center' } }]
                ],
                startY: 34,
                theme: 'grid',
            });
        }
        doc.autoTable({
            head:[tableHeadings],
            body:tableData.reverse().map(d=>{
                let row = [{ content:count++,styles: { halign: 'center' }},{ content:formatDate(d.sales_date),styles: { halign: 'center' }}];
                row.push({ content:d.loading_vehicle.number,styles: { halign: 'center' } })
                // row.push(d.unloading_challan?{ content:d.unloading_challan,styles: { halign: 'center' } }:{ content:'-',styles: { halign: 'center' } })
                row.push(d.do_no?{ content:d.do_no,styles: { halign: 'center' } }:{ content:'-',styles: { halign: 'center' } })
                row.push({ content:d.loading_point.name,styles: { halign: 'center' } });
                if (!filters.unloading_point) row.push({ content:d.unloading_point.name,styles: { halign: 'center' } })
                if (!filters.item_id) row.push({ content:d.item?.name,styles: { halign: 'center' } })
                row.push({ content:d.purchase_quantity + " (" + d.item.unit + ")" })
                return row
            }),
            startY:48,
            startX:10,
            theme: 'striped',
        });
        doc.save('Purchase_history.pdf');
    }
    return (
        <>
            <BreadCrumb title="Purchase History" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-lg-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Purchase History</h5>
                            <Row>
                                <Col xs={12} lg={4} className='mt-lg-0 mt-3'>
                                    <input className='form-control' type='date' value={fromDate} onChange={e=>setFromDate(e.target.value)} />
                                </Col>
                                <Col xs={12} lg={4} className='mt-lg-0 mt-3'>
                                    <input className='form-control' type='date' value={toDate} onChange={e=>setToDate(e.target.value)} />
                                </Col>
                                <Col xs={12} lg={4} className='mt-lg-0 mt-3 d-flex align-items-center justify-content-end '>
                                    <Button onClick={handleButtonClickUnderConstruction} className="btn btn-warning me-1"><i className="ri-file-excel-line" /></Button>
                                    <Button onClick={generatePdf} className="btn btn-success me-1"><i className=" bx bxs-file-pdf" /></Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="">
                            <Row className='mb-3'>
                                <Col lg={3} xs={6} className='mt-2'>
                                    <label htmlFor="item_id" className="form-label">Item/Product</label>
                                    <CustomSelect onChange={e=>setFilters(f=>({...f,item_id:e.value}))}
                                        name="item_id" isSearchable defaultValue={{value:'',label:'All'}}
                                        options={[{value:'',label:'All'},...itemData.map(i=>({value:i.id,label:i.name}))]} 
                                    />
                                </Col>
                                <Col lg={3} xs={6} className='mt-2'>
                                    <label htmlFor="loading_point" className="form-label">loading point</label>
                                    <CustomSelect onChange={e=>setFilters(f=>({...f,loading_point:e.value}))}
                                        isSearchable  name="loading_point"  defaultValue={{value:'',label:'All'}}
                                        options={[{value:'',label:'All'},...clientData.filter(c=>c.client_type=="sender").map(c=>({value:c.id,label:c.name}))]} 
                                    />
                                </Col>
                                <Col lg={3} xs={6} className='mt-2'>
                                    <label htmlFor="unloading_point" className="form-label">Unloading point</label>
                                    <CustomSelect onChange={e=>setFilters(f=>({...f,unloading_point:e.value}))}
                                        isSearchable  name="unloading_point"  defaultValue={{value:'',label:'All'}}
                                        options={[{value:'',label:'All'},...clientData.filter(c=>c.client_type=="receiver").map(c=>({value:c.id,label:c.name}))]} 
                                    />
                                </Col>
                                <Col lg={3} xs={6} className='mt-2'>
                                    <label htmlFor="vehicle_id" className="form-label">Vehicle (loading)</label>
                                    <CustomSelect onChange={e=>setFilters(f=>({...f,vehicle_id:e.value}))}
                                        isSearchable name="vehicle_id" defaultValue={{value:'',label:'All'}}
                                        options={[{value:'',label:'All'},...vehicleData.map(v=>({value:v.id,label:v.type}))]}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <TableResponsive showColumnsFilter isLoading={dataLoading}  columns={columns} data={tableData} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PurchaseHistory