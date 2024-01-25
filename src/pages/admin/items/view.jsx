import React, {  useState } from 'react'
import { Link } from 'react-router-dom';
import { Modal,Row,Col } from 'react-bootstrap'
import { ASSET_URL, } from '../../../helper/api_url';
import Modal_profile_image from '../../../components/common/modalProfile';
export function ViewItemModal(data) {
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
                    <Row className='px-2 text-center mt-2'>
                        <Col xs={12} >
                <img src={viewimage} alt='Not image' className='mb-2' style={{ width: "280px", height: "200px",aspectRatio: '1/1',objectFit: 'cover', borderRadius: "5%" }} />
                            <ul className="list-group">
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Product Name </span></Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-wrap'> {data.data.name} </span>
                                            
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Rate</span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-nowrap'> {data.data.rate} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>unit</span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-nowrap'> {data.data.unit} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Description</span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5} style={{ overflowWrap: 'break-word' }}>
                                            <span className='text-nowrap'> {data.data.description} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Status</span> </Col>
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
