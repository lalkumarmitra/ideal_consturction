import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { Card, CardBody, Row, Col, CardHeader, CardTitle, CardImg, CardText, CardFooter, Modal } from "react-bootstrap";
// import faqIllustration from '../../../helper/image_helper'
import faqIllustration from "../../../assets/images/faq-img.png";
import imgdummy from "../../../assets/images/auth-one-bg.jpg"
import imgdummy2 from "../../../assets/images/about.jpg"
import { CreateIssue } from "./CreateIssue";
import { useModalHandler, usePageInitialtor } from "../../../helper/custom_hook";
import { ASSET_URL, support } from "../../../helper/api_url";
import { swal } from "../../../helper/swal";
import ImageViewer from "../../../components/ImageViewer";
import DataLoading from "../../../components/DataLoading";
import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from "react-redux";
import { setPreloader } from "../../../features/Ui/uiSlice";
import { formatDate } from "../../../helper/formatDate";


function Issues() {
    const dispatch = useDispatch();
    const { toggleModal, status } = useModalHandler();
    const { tableData, setTableData, tableLoading, setTableLoading, apiHandler } = usePageInitialtor(support);
    const [postId, setPostId] = useState();
    const [postTitle, setPostTitle] = useState();
    const auth = useSelector(state => state.auth);
    const [commentData, setCommentData] = useState([]);
    const markIssueAsProgress = id => {
        support.markProgress(id)
            .then(res => setTableData(tableData => [...tableData.map(td => td.id == res.data.issue.id ? res.data.issue : td)]))
            .catch(err => swal.error(err.response ? err.response.data.message : err.message))
    }
    const markIssueAsResolved = id => {
        support.markResolved(id)
            .then(res => setTableData(tableData => [...tableData.map(td => td.id == res.data.issue.id ? res.data.issue : td)]))
            .catch(err => swal.error(err.response ? err.response.data.message : err.message))
    }
    const handleComment = (e) => {
        e.preventDefault();
        dispatch(setPreloader({ loader: true, message: 'please wait...' }))
        const formdata = new FormData(e.target);
        support.comment(formdata)
            .then((res) => { setCommentData((commentData) => [...commentData, res.data[Object.keys(res.data)[0]]]); e.target.reset(); dispatch(setPreloader({ loader: false, message: '' })) })
            .catch((err) => { swal.error(err.response ? err.response.data.message : err.message); dispatch(setPreloader({ loader: false, message: '' })) })
    }
    const handleCommentlist = (id) => {support.commentlist(id).then(res => setCommentData(res.data.comments)).catch(err => swal.error(err.response ? err.response.data.message : err.message))}
    const handleCommentDelete = (id) => {support.Commentdelete(id).then(res => { setCommentData([...commentData.filter(td => td.id != id)]) }).catch((err) => swal.error(err.response ? err.response.data.message : err.message))}
    return (
        <>
            {/* <BreadCrumb title={'Help And Support'} /> */}
            <Row>
                <Col xs={12}>
                    <div className="card rounded-0 bg-soft-info mx-n4 mt-n4 border-top">
                        <div className="px-4">
                            <div className="row">
                                <div className="col-xxl-5 align-self-center">
                                    <div className="py-4">
                                        <h4 className="display-6 coming-soon-text">Help And Support</h4>
                                        <p className="text-info fs-15 mt-3 my-lg-4">Take a Screenshot of the problem or bug you are facing. Mark the bug in the image and Raise the issue .
                                            Our team is continiously looking for any bug or issue, you are facing while using this app</p>
                                        <div className="hstack flex-wrap gap-2">
                                            <CreateIssue data={tableData} apiHandler={apiHandler} />
                                        </div>
                                    </div>

                                </div>
                                <div className="col-xxl-3 ms-auto">
                                    <div className="mb-n5 pb-1 faq-img d-none d-xxl-block">
                                        <img src={faqIllustration} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={3} xs={6}>
                    <div className="card">
                        <div className="card-body d-flex">
                            <div className="flex-grow-1">
                                <h4>{tableData?.length}</h4>
                                <h6 className="text-muted fs-13 mb-0">Raised Issues</h6>
                            </div>
                            <div className="flex-shrink-0 avatar-sm">
                                <div className="avatar-title bg-soft-dark text-dark fs-22 rounded">
                                    <i className="ri-bug-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={3} xs={6}>
                    <div className="card">
                        <div className="card-body d-flex">
                            <div className="flex-grow-1">
                                <h4>{tableData.filter(item => item.status === 'resolved').length}</h4>
                                <h6 className="text-muted fs-13 mb-0">Resolved Issues</h6>
                            </div>
                            <div className="flex-shrink-0 avatar-sm">
                                <div className="avatar-title bg-soft-success text-success fs-22 rounded">
                                    <i className="ri-check-double-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={3} xs={6}>
                    <div className="card">
                        <div className="card-body d-flex">
                            <div className="flex-grow-1">
                                <h4>{tableData.filter(item => item.status === 'active').length}</h4>
                                <h6 className="text-muted fs-13 mb-0">Pending Issues</h6>
                            </div>
                            <div className="flex-shrink-0 avatar-sm">
                                <div className="avatar-title bg-soft-warning text-warning fs-22 rounded">
                                    <i className="bx bx-time-five"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={3} xs={6}>
                    <div className="card">
                        <div className="card-body d-flex">
                            <div className="flex-grow-1">
                                <h4>{tableData.filter(item => item.status === 'seen').length}</h4>
                                <h6 className="text-muted fs-13 mb-0">In Progress</h6>
                            </div>
                            <div className="flex-shrink-0 avatar-sm">
                                <div className="avatar-title bg-soft-danger text-danger fs-22 rounded">
                                    <i className="ri-code-s-slash-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                {tableData.length ? tableData.map((row, id) => (
                    <Col key={id} md={6} sm={12}>
                        <Card>
                            <CardHeader>
                                <div className="d-flex justify-content-between align-items-center">
                                    <CardTitle className="d-flex align-items-center">
                                        {row.title.length > 35 ? `${row.title.substring(0, 35)}...` : row.title}
                                    </CardTitle>
                                    <div>
                                        <button className="btn btn-soft-warning" type="button" onClick={() => { toggleModal(); setPostId(row.id); setPostTitle(row.title); handleCommentlist(row.id) }}>
                                            <i className="ri-chat-1-fill"></i>
                                        </button>
                                        <div className="dropdown btn btn-soft-success ms-2 btn-icon">
                                            <a className="p-3" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                <i className="ri-more-fill"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                <li><button onClick={() => markIssueAsProgress(row.id)} className="dropdown-item" ><i className="ri-code-s-slash-fill me-2 text-danger"></i>Mark In Progress</button></li>
                                                <li><button onClick={() => markIssueAsResolved(row.id)} className="dropdown-item" ><i className="bx bx-time-five me-2 align-middle text-success"></i>Mark resolved</button></li>
                                                <li className="dropdown-divider"></li>
                                                <li><button onClick={() => apiHandler.handleDelete(row)} className="dropdown-item" ><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="row">
                                <Col md={4}>
                                    <ImageViewer image={ASSET_URL + row.image}>
                                        <CardImg src={ASSET_URL + row.image} style={{ aspectRatio: '16/7', objectFit: 'cover', height: 'auto' }} alt="issue screenshot" />
                                    </ImageViewer>
                                </Col>
                                <Col md={8} className="d-flex align-items-center mt-4 mt-md-0">
                                    <CardText>{row.description}</CardText>
                                </Col>
                                <Col className="px-2">
                                    {/* <Card className={row.status == 'resolved'?" bg-soft-success":(row.status == 'seen'?"mb-0 mt-3 bg-soft-danger":"mb-0 mt-3 bg-soft-warning")}> */}
                                    <Card className="mb-0 mt-3">
                                        <CardBody className="py-3">
                                            <Col className="d-flex justify-content-between align-items-center">
                                                <span className={row.status == 'resolved' ? 'ms-2 badge badge-soft-success' : (row.status == 'seen' ? ' ms-2 badge badge-soft-danger' : 'ms-2 badge badge-soft-warning')}>
                                                    {row.status == 'seen' ? 'In Progress' : (row.status == 'active' ? 'pending' : row.status)}
                                                </span>
                                                <span className="text-dark"> Raised By : {row.user.first_name + " " + row.user.last_name}</span>
                                            </Col>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </CardBody>
                        </Card>
                        <Modal className="fade" centered={true} show={status} onHide={toggleModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{postTitle}</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={e => handleComment(e)}>
                                <Modal.Body>
                                    <div className="row align-items-center">
                                        <input type="hidden" name="help_and_support_id" id="help_and_support_id" defaultValue={postId} />
                                        <input type="hidden" name="user_id" id="user_id" defaultValue={auth._user.id} />
                                        <SimpleBar className='custom-scrollbar' id="scrollbar" style={{ maxHeight: "calc(70vh - 90px)" }} >
                                            {commentData?.map((item, idx) => (
                                                <div key={idx}>
                                                    <Card className="mb-0 mt-3">
                                                        <CardBody className="py-2">
                                                            <Row>
                                                                <Col xs={1} className="d-flex  justify-content-center">
                                                                    <img className="mx-2 rounded-circle header-profile-user" src={ASSET_URL + item.user.avatar} alt="User Avatar" />
                                                                </Col>
                                                                <Col xs={11} className="d-flex align-items-stretch justify-content-between h-100">
                                                                    <div>
                                                                        <span className="text-success"> {item.user.first_name} </span>
                                                                        <p className="m-0">{item.content}</p>
                                                                    </div>
                                                                    <div className="text-end d-flex flex-column align-items-end justify-content-between">
                                                                    {(auth._user.id === item.user_id || auth._roleType === "admin") ?
                                                                        <div className="dropdown btn btn-sm mb-2 px-1 py-0 btn-icon">
                                                                            <a className="p-3" id="drapdownHandleDel" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                <i className="ri-more-fill"></i>
                                                                            </a>
                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="drapdownHandleDel">
                                                                                <li><button type="button" onClick={() => handleCommentDelete(item.id)} className="dropdown-item" ><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</button></li>
                                                                            </ul>
                                                                        </div>: ''}
                                                                        <p className="m-0 text-muted text-nowrap badge badge-soft-secondary d-block"> {formatDate(item.created_at)}</p>
                                                                    </div>
                                                                </Col>
                                                                
                                                            </Row>
                                                        </CardBody>
                                                    </Card>


                                                </div>
                                            ))}
                                        </SimpleBar>
                                        <div className="form-floating pt-4">
                                            <Row>
                                                <Col xs={10}>
                                                    <input className="form-control" type="text" placeholder="Leave a comment here" name="content" />
                                                </Col>
                                                <button type="submit" className=" col-2 btn btn-soft-success px-1"><i className="bx bx-send align-middle" /></button>
                                            </Row>
                                        </div>
                                    </div>
                                </Modal.Body>

                            </form>
                        </Modal>
                    </Col>
                )) : (tableLoading ? <DataLoading /> : null)}
            </Row>
        </>
    )
}

export default Issues