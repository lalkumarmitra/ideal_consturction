import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from '../../../components/common/BreadCrumb';
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
// import { Pie } from 'react-chartjs-2';

function AdminDashboard() {
  return (
    <>
        <BreadCrumb title="Dashboard" prevPage="Home" prevPath="/dashboard" />
        <Row>
        <div class="row mb-3 pb-1">
            <div class="col-12">
                <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                    <div class="flex-grow-1">
                        <h4 class="fs-16 mb-1">Good Morning, Anna!</h4>
                        <p class="text-muted mb-0">Here's what's happening with your store today.</p>
                    </div>
                    <div class="mt-3 mt-lg-0">
                        <form action="javascript:void(0);">
                            <div class="row g-3 mb-0 align-items-center">
                                <div class="col-sm-auto">
                                    <div class="input-group">
                                        <input type="text" class="form-control border-0 shadow"   placeholder='Enter a date range' />
                                        <div class="input-group-text bg-primary border-primary text-white">
                                            <i class="ri-calendar-2-line"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-auto">
                                    <button type="button" class="btn btn-soft-success"><i class="ri-add-circle-line align-middle me-1"></i> New Transaction</button>
                                </div>
                                
                                <div class="col-auto">
                                    <button type="button" class="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn"><i class="ri-pulse-line"></i></button>
                                </div>
                                
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </Row>
        <Row>
            <Col>
                <div className="card crm-widget">
                    <div className="card-body p-0">
                        <div className="row row-cols-xxl-5 row-cols-md-3 row-cols-1 g-0">
                            <div className="col">
                                <div className="py-4 px-3">
                                    <h5 className="text-muted text-uppercase fs-13">Total Purchage <i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle"></i></h5>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <i className="ri-space-ship-line display-6 text-muted"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h2 className="mb-0">$<span className="counter-value" data-target="489.4">489.4</span>k</h2>
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
                                            <h2 className="mb-0">$<span className="counter-value" data-target="489.4">489.4</span>k</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mt-3 mt-md-0 py-4 px-3">
                                    <h5 className="text-muted text-uppercase fs-13"> Total Profit <i className="ri-arrow-down-circle-line text-danger fs-18 float-end align-middle"></i></h5>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <i className="ri-pulse-line display-6 text-muted"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h2 className="mb-0"><span className="counter-value" data-target="32.89">32.89</span>%</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mt-3 mt-lg-0 py-4 px-3">
                                    <h5 className="text-muted text-uppercase fs-13">Daily Average Revenue <i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle"></i></h5>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <i className="ri-trophy-line display-6 text-muted"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h2 className="mb-0">$<span className="counter-value" data-target="1596.5">1,596.5</span></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mt-3 mt-lg-0 py-4 px-3">
                                    <h5 className="text-muted text-uppercase fs-13">Annual Deals <i className="ri-arrow-down-circle-line text-danger fs-18 float-end align-middle"></i></h5>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <i className="ri-service-line display-6 text-muted"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h2 className="mb-0"><span className="counter-value" data-target="2659">2,659</span></h2>
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