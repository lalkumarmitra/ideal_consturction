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
import { CSVLink } from "react-csv"
import EditTransaction from './EditTransaction';

function SalesHistory() {
    const today = new Date();
    const [tableData,setTableData] = useState([]);
    const [dataLoading,setDataLoading] = useState(true);
    const [subTotal,setSubTotal] = useState(0)
    const [toDate,setToDate] = useState(formatDateYMD(today));
    const [fromDate,setFromDate] = useState(formatDateYMD(today.setMonth(today.getMonth() - 2)));
    const [csvData,setCsvData] = useState([]);
    const [filters,setFilters] = useState({
        item_id: "",
        status: "sold",
        loading_point: "",
        vehicle_id: "",
        driver_id: "",
        unloading_point: "",
        unloading_vehicle_id: "",
        unloading_driver_id: "",
    });
    const [itemData, setItemData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [vehicleData, setvehicleData] = useState([]);
    const headers = [
        { label: "SL", key: "sl" },
        {label:'Date',key:"date"},
        {label:'Vehicle',key:"vehicle"},
        {label:'Challan',key:"challan"},
        {label:'Unloading Point',key:"unloading_point"},
        {label:'Material',key:"material"},
        {label:'Quantity',key:"quantity"},
        {label:'Rate',key:"rate"},
        {label:'Price',key:"price"},
      ];
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
            setSubTotal(r.data.total_sales_price)
            setCsvData(r?.data?.transactions?.map((i,index)=>({
                sl:index,
                date:formatDate(i.sales_date),
                vehicle:i.unloading_vehichle.number,
                challan:i.unloading_challan,
                unloading_point:i.unloading_point?.name,
                material:i.item.name,
                quantity:i.sales_quantity,
                rate:i.sales_rate,
                price:i.sales_price.toFixed(2),
            })));
        }).catch(e=>console.error(e)).finally(()=>setDataLoading(false));
    }
    useEffect(()=>{getTransactionHistory();},[filters,fromDate,toDate]);
    const columns = useMemo(()=>[

        {Header: "Date",accessor: "sales_date",HeaderClass:'text-center',DataClass:'text-center',Cell:cell=>formatDate(cell.row.original.sales_date)},
        {Header: "Vehicle",accessor: "unloading_vehichle.number",HeaderClass:'text-center',DataClass: filters.vehicle_id? 'text-center bg-soft-warning' :'text-center'},
        {Header: "Challan",accessor: "unloading_challan",HeaderClass:'text-center',DataClass:'text-center'},
        {Header: "Loading Point",accessor: "loading_point.name",HeaderClass:'text-center',DataClass: filters.loading_point? 'text-center bg-soft-warning' :'text-center'},
        {Header: "UnLoading Point",accessor: "unloading_point.name",HeaderClass:'text-center',DataClass: filters.unloading_point? 'text-center bg-soft-warning' :'text-center'}, 
        {Header: "Item/Material",accessor: "item.name",HeaderClass:'text-center',DataClass: filters.item_id? 'text-center bg-soft-warning' :'text-center'},
        {Header: "Sales Rate",accessor: "sales_rate",HeaderClass:'text-center',DataClass:'text-center'},
        {Header: "Quantity",accessor: "sales_quantity",HeaderClass:'text-center',DataClass:'text-center',Cell:cell=>`${cell.row.original.sales_quantity}  ${cell.row.original.item.unit}`},
        {Header: "Sales Price",accessor: "sales_price",HeaderClass:'text-center',DataClass:'text-center', Cell:cell=>cell.row.original.sales_price?.toFixed(2)},
        {
            Header: "Action",
            HeaderClass: 'text-center',
            DataClass: 'text-center',
            Cell: (cell) => {
                const row = cell.row.original;
                return (
                    <div className="">
                        <ViewTransaction transaction={row} />
                        <EditTransaction rowData={row} setListData={setTableData} />
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
                            <p className='mb-2'>Sale : {row.sales_rate} X {row.sales_quantity} ({row.item.unit})= {sales_price?.toFixed(2)}</p>
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
        let count = 1;
        let total_sales_price= 0;
        let item_name_in_filter = "";
        let unloading_point_in_filter = "";
        const doc = new jsPDF('p','mm','a4');
        let tableHeadings=[
            {content:'SL',styles:{halign:'center'}},
            {content:'Date',styles:{halign:'center'}},
            {content:'Vehicle',styles:{halign:'center'}},
            {content:'Challan',styles:{halign:'center'}},
            // {content:'Loading point',styles:{halign:'center'}},
            {content:'Unloading Point',styles:{halign:'center'}},
            {content:'Material',styles:{halign:'center'}},
            {content:'Quantity',styles:{halign:'center'}},
            {content:'Rate',styles:{halign:'center'}},
            {content:'Price',styles:{halign:'right'}},
        ];
        doc.autoTable({
            head: [
                [{ content: "IDEAL Construction : Transaction Sale information", colSpan: tableHeadings.length, styles: { halign: 'center' } }],
                [{ content: `${formatDate(fromDate)}   To  ${formatDate(toDate)}`, colSpan: tableHeadings.length, styles: { halign: 'center' } }]
            ],
            startY: 10,
            theme: 'plain',
        });
        if (filters.item_id){
            item_name_in_filter = itemData.filter(i=>i.id===filters.item_id)[0].name;
            tableHeadings = tableHeadings.filter(heading => heading.content !== 'Material');
            doc.autoTable({
                head: [
                    [{ content: item_name_in_filter, colSpan: tableHeadings.length, styles: { halign: 'center' } }]
                ],
                startY: 42,
                theme: 'grid',
            });
        }
        if(filters.unloading_point) {
            unloading_point_in_filter = clientData.filter(i=>i.id===filters.unloading_point)[0].name;
            tableHeadings = tableHeadings.filter(heading => heading.content !== 'Unloading Point');
            doc.autoTable({
                head: [
                    [{ content: unloading_point_in_filter, colSpan: tableHeadings.length, styles: { halign: 'center' } }]
                ],
                startY: 34,
                theme: 'grid',
            });
        }
        doc.autoTable({
            head:[tableHeadings],
            body:tableData.reverse().map(d=>{
                total_sales_price+=d.sales_price;
                let row = [{ content:count++,styles: { halign: 'center' }},{ content:formatDate(d.sales_date),styles: { halign: 'center' }}];
                row.push({ content:d.unloading_vehichle.number,styles: { halign: 'center' } })
                row.push(d.unloading_challan?{ content:d.unloading_challan,styles: { halign: 'center' } }:{ content:'-',styles: { halign: 'center' } })
                // row.push({ content:d.loading_point.name,styles: { halign: 'center' } });
                if (!filters.unloading_point) row.push({ content:d.unloading_point?.name,styles: { halign: 'center' } })
                if (!filters.item_id) row.push({ content:d.item.name,styles: { halign: 'center' } })
                row.push({ content:d.sales_quantity + " (" + d.item.unit + ")",styles: { halign: 'center' }  })
                row.push({ content:d.sales_rate + " (" + d.item.unit + ")",styles: { halign: 'center' }  })
                row.push({ content:d.sales_price.toFixed(2), styles: { halign: 'right' } })
                return row
            }),
           
            startY:50,
            startX:10,
            theme: 'striped',
        });
        doc.autoTable({
            foot:[
                [
                    {content:'Total',colSpan: tableHeadings.length-1, styles: { halign: 'right' }},
                    {content:total_sales_price.toFixed(2),styles: { halign: 'right' }}
                ]
            ],
            theme: 'grid',
        });
        doc.save(`Sales_history_${item_name_in_filter}_${unloading_point_in_filter}_(${fromDate})_(${toDate}).pdf`);
    }
    return (
        <>
            <BreadCrumb title="Purchase History" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Sales Transaction History</h5>
                            <Row>
                                <Col xs={12} lg={4}>
                                    <input className='form-control' type='date' value={fromDate} onChange={e=>setFromDate(e.target.value)} />
                                </Col>
                                <Col xs={12} lg={4}>
                                    <input className='form-control' type='date' value={toDate} onChange={e=>setToDate(e.target.value)} />
                                </Col>
                                <Col xs={12} lg={4} className='mt-lg-0 mt-3 d-flex align-items-center justify-content-end '>
                                    {csvData && (
                                    <CSVLink className="btn me-3 btn-warning"  data={csvData} headers={headers}>
                                          <i className=" ri-file-excel-2-line align-middle me-1"></i>
                                    </CSVLink>)}
                                    <Button onClick={generatePdf} className="btn btn-success me-1" ><i className=" bx bxs-file-pdf" /></Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="">
                            <Row className='mb-3'>
                                <Col lg={3} xs={6} className='mt-2'>
                                    <label htmlFor="item_id" className="form-label">Item/Product</label>
                                    <CustomSelect onChange={e=>setFilters(f=>({...f,item_id:e.value}))}
                                        isSearchable name="item_id"  defaultValue={{value:'',label:'All'}}
                                        options={[{value:'',label:'All'},...itemData.map(i=>({value:i.id,label:i.name}))]} 
                                    />
                                </Col>
                                <Col lg={3} xs={6} className='mt-2'>
                                    <label htmlFor="loading_point" className="form-label">Unloading point</label>
                                    <CustomSelect onChange={e=>setFilters(f=>({...f,unloading_point:e.value}))}
                                        isSearchable  name="loading_point"  defaultValue={{value:'',label:'All'}}
                                        options={[{value:'',label:'All'},...clientData.filter(c=>c.client_type=="receiver").map(c=>({value:c.id,label:c.name}))]} 
                                    />
                                </Col>
                                <Col lg={3} xs={6} className='mt-2'>
                                    <label htmlFor="vehicle_id" className="form-label">Vehicle (unloading)</label>
                                    <CustomSelect onChange={e=>setFilters(f=>({...f,unloading_vehicle_id:e.value}))}
                                        isSearchable name="vehicle_id" defaultValue={{value:'',label:'All'}}
                                        options={[{value:'',label:'All'},...vehicleData.map(v=>({value:v.id,label:v.type}))]}
                                    />
                                </Col>
                                <Col lg={3} xs={6} className='mt-2'>
                                    <label htmlFor="unloading_point" className="form-label">Loading point</label>
                                    <CustomSelect  onChange={e=>setFilters(f=>({...f,loading_point:e.value}))}
                                        isSearchable  name="unloading_point"  defaultValue={{value:'',label:'All'}}
                                        options={[{value:'',label:'All'},...clientData.filter(c=>c.client_type=="sender").map(c=>({value:c.id,label:c.name}))]} 
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

export default SalesHistory