import React, {  useState } from 'react'
import { Link } from 'react-router-dom';
import { Modal,Row,Col } from 'react-bootstrap'
import { ASSET_URL, } from '../../../helper/api_url';
import Modal_profile_image from '../../../components/common/modalProfile';
export function ViewClientModal(data) {
    const [status, setStatus] = useState(false);
    const toggleModal = () => setStatus(!status);
    const viewimage = ASSET_URL + data.data.image;
    return (
        <>
            {data.children ? (<div onClick={toggleModal}>{data.children}</div>) : (
                <button onClick={toggleModal} className='btn btn-sm btn-soft-info me-1'>
                    <i className="ri-eye-fill" />
                </button>
            )}

            <Modal className="fade" centered={true} show={status} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>View {data.data.name} Details</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal_profile_image viewimage={viewimage} />
                    <Row className='px-2 text-center mt-2'>
                        <Col xs={12} >
                            <ul className="list-group">
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Client Name </span></Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-wrap'> {data.data.name} </span>
                                            
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Type </span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-wrap'> {data.data.client_type} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Address</span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-nowrap'> {data.data.address} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>City </span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-nowrap'> {data.data.city} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>State </span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5} style={{ overflowWrap: 'break-word' }}>
                                            <span className='text-nowrap'> {data.data.state} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Pin </span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-wrap'> {data.data.pin} </span>
                                        </Col>
                                    </Row>
                                </li>
                            
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Status </span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-wrap'> {data.data.status} </span>
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
