import React, {  useState } from 'react'
import { Modal,Row,Col } from 'react-bootstrap'
export function ViewVehicleModal(data) {
    const [status, setStatus] = useState(false);
    const toggleModal = () => setStatus(!status);
    return (
        <>
            {data.children ? (<div onClick={toggleModal}>{data.children}</div>) : (
                <button onClick={toggleModal} className='btn btn-sm btn-soft-info me-1'>
                    <i className="ri-eye-fill" />
                </button>
            )}

            <Modal className="fade" centered={true} show={status} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>View Vehicle Details</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='px-2 text-center mt-2'>
                        <Col xs={12} >
                            <ul className="list-group">
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>vehicle Number </span></Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-wrap'> {data.data.number} </span>
                                            
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Type</span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-nowrap'> {data.data.type} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Status</span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-nowrap'> {data.data.status} </span>
                                        </Col>
                                    </Row>
                                </li>
                                
                            </ul>
                        </Col>
                    </Row>
                </Modal.Body>
                
            </Modal>
        </>

    );
}
