import React, {  useState } from 'react'
import { Link } from 'react-router-dom';
import { Modal,Row,Col } from 'react-bootstrap'
import { ASSET_URL, } from '../../../helper/api_url';
import Modal_profile_image from '../../../components/common/modalProfile';
export function ViewStaffModal(data) {
    const [status, setStatus] = useState(false);
    const toggleModal = () => setStatus(!status);
    const viewimage = ASSET_URL + data.data.avatar;
    return (
        <>
            {data.children ? (<div onClick={toggleModal}>{data.children}</div>) : (
                <button onClick={toggleModal} className='btn btn-sm btn-soft-info me-1'>
                    <i className="ri-eye-fill" />
                </button>
            )}

            <Modal className="fade" centered={true} show={status} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>View {data.data.first_name} Details</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal_profile_image viewimage={viewimage} />
                    <Row className='px-2 text-center mt-2'>
                        <Col xs={12} >
                            <ul className="list-group">
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Staff Name </span></Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-wrap'> {data.data.first_name} {data.last_name} </span>
                                            {(data.data.role.name !== null) ? (<span className='badge badge-soft-success px-1 ms-1'>{data.data.role.name}</span>) : ''}
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Type </span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-nowrap'> {data.data.role.name} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Gender </span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-nowrap'> {data.data.gender} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Email </span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5} style={{ overflowWrap: 'break-word' }}>
                                            <span className='text-nowrap'> {data.data.email} </span>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='list-group-item'>
                                    <Row>
                                        <Col xs={5}><span className='fw-bold'>Phone </span> </Col>
                                        <Col xs={2}><span className='fw-bold'>:</span></Col>
                                        <Col className='text-start' xs={5}>
                                            <span className='text-wrap'> {data.data.phone} </span>
                                        </Col>
                                    </Row>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <div className='w-100 d-flex align-items-center justify-content-between px-2'>
                        <a href={`tel:${data.data.phone}`} className="btn btn-soft-info" >
                            <i className='bx bx-phone-outgoing' />
                        </a>
                        {/* <Link to='/' className="btn btn-sm btn-outline-success">View Detailed Profile</Link> */}
                        {/* <a href={`whatsapp://send?phone=+91${data.view.whatsapp}&text=Hello%20${data.view.name}%0A%0A`} className="btn ms-2 btn-soft-success" >
                            <i className='bx bxl-whatsapp' />
                        </a> */}
                    </div>
                </Modal.Footer>
            </Modal>
        </>

    );
}
