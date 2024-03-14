import React, { useState } from 'react'
import { Button, Modal,Row,Col } from 'react-bootstrap'
import { useModalHandler } from '../../../helper/custom_hook'

function ViewTransaction({transaction}) {
    const {toggleModal,status} = useModalHandler();
    // const toggleModal = ()=>setStatus(!status);
    return (
        <>
            <Button onClick={toggleModal} className="btn btn-sm btn-soft-success me-1" >
                <i className="ri-eye-fill" />  
            </Button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Transaction Details <small>(TXN ID : {transaction.id})</small></h5> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <Row>
                                <Col>Item/Product</Col>
                                <Col>{transaction?.item?.name}</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Loading Point</Col>
                                <Col>{transaction?.loading_point?.name}</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Purchase Rate</Col>
                                <Col><i className="bx bx-rupee"></i> {transaction?.purchase_rate?.toFixed(2)}</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Purchase Quantity</Col>
                                <Col>{transaction?.purchase_quantity?.toFixed(2)}</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Purchase Price</Col>
                                <Col><i className="bx bx-rupee"></i> {transaction?.purchase_price?.toFixed(2)}</Col>
                            </Row>
                        </li>

                        <li class="list-group-item">
                            <Row>
                                <Col>Driver <span className='badge bg-primary' >Loading</span></Col>
                                <Col>{transaction?.loading_driver?.first_name} {transaction?.loading_driver?.first_name} ({transaction?.loading_vehicle?.number?.toUpperCase()})</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Do Number</Col>
                                <Col>{transaction?.do_number}</Col>
                            </Row>
                        </li>
                    </ul>
                    <ul class="list-group mt-1">
                        <li class="list-group-item">
                            <Row>
                                <Col>Unoading Point</Col>
                                <Col>{transaction?.unloading_point?.name}</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Sales Rate</Col>
                                <Col><i className="bx bx-rupee"></i> {transaction?.sales_rate?.toFixed(2)}</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Sales Quantity</Col>
                                <Col>{transaction?.sales_quantity?.toFixed(2)}</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Sales Price</Col>
                                <Col><i className="bx bx-rupee"></i> {transaction?.sales_price?.toFixed(2)}</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Driver <span className='badge bg-success' >Unloading</span></Col>
                                <Col>{transaction?.unloading_driver?.first_name} {transaction?.unloading_driver?.first_name} ({transaction?.unloading_vehichle?.number?.toUpperCase()})</Col>
                            </Row>
                        </li>
                        <li class="list-group-item">
                            <Row>
                                <Col>Challan Number</Col>
                                <Col>{transaction?.unloading_challan}</Col>
                            </Row>
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewTransaction