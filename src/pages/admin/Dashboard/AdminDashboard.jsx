import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from '../../../components/common/BreadCrumb';
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import { dashboard } from '../../../helper/api_url';
// import { Pie } from 'react-chartjs-2';

function AdminDashboard() {
    const [headerData,setHeaderData] = useState([]);
    useEffect(()=>{
        dashboard.header().then(res=>setHeaderData(res.data)).catch(e=>console.log(e));
    },[]);
  return (
    <>
        <BreadCrumb title="Dashboard" prevPage="Home" prevPath="/dashboard" />
        <Row className="row mb-3 pb-1">
            <div className="col-12">
                <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                    <div className="flex-grow-1">
                        <h4 className="fs-16 mb-1">Good Morning, Admin!</h4>
                        <p className="text-muted mb-0">Here's what's happening with your store today.</p>
                    </div>
                    <div className="mt-3 mt-lg-0">
                        <form action="javascript:void(0);">
                            <div className="row g-3 mb-0 align-items-center">
                                <div className="col-sm-auto">
                                    <div className="input-group">
                                        <input type="text" className="form-control border-0 shadow"   placeholder='Enter a date range' />
                                        <div className="input-group-text bg-primary border-primary text-white">
                                            <i className="ri-calendar-2-line"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-auto">
                                    <button type="button" className="btn btn-soft-success"><i className="ri-add-circle-line align-middle me-1"></i> New Transaction</button>
                                </div>
                                
                                <div className="col-auto">
                                    <button type="button" className="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn"><i className="ri-pulse-line"></i></button>
                                </div>
                                
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </Row>
        <Row>
            <Col>
                <div className="card crm-widget">
                    <div className="card-body p-0">
                        <div className="row row-cols-xxl-4 row-cols-md-2 row-cols-1 g-0">
                            <div className="col">
                                <div className="py-4 px-3">
                                    <h5 className="text-muted text-uppercase fs-13">Total Transactions <i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle"></i></h5>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <i className="ri-space-ship-line display-6 text-muted"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h2 className="mb-0"><span className="counter-value">{headerData.total_transactions}</span></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mt-3 mt-md-0 py-4 px-3">
                                    <h5 className="text-muted text-uppercase fs-13">Total Sale <i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle"></i></h5>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <i className="ri-exchange-dollar-line display-6 text-muted"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h2 className="mb-0"><span className="counter-value" >{headerData.total_sold_transactions}</span></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mt-3 mt-md-0 py-4 px-3 border-right">
                                    <h5 className="text-muted text-uppercase fs-13">Pending Transactions <i className="ri-arrow-down-circle-line text-danger fs-18 float-end align-middle"></i></h5>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <i className="ri-pulse-line display-6 text-muted"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h2 className="mb-0"><span className="counter-value">{headerData.total_pending_transactions}</span></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mt-3 mt-lg-0 py-4 px-2">
                                    <h5 className="text-muted text-uppercase fs-13">Total Profit<i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle"></i></h5>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <i className="ri-trophy-line display-6 text-muted"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h2 className="mb-0"><span className="counter-value">{Math.round(headerData.total_profit_percentage,2)}</span>%</h2>
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
            <Col>
                <Card>
                    <Card.Body>
                        {/* <Pie options="" data="" /> */}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default AdminDashboard