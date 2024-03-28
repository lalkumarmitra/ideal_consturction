import React from 'react'
import { useModalHandler } from '../../../helper/custom_hook';
import { Modal } from 'react-bootstrap';
import { support } from '../../../helper/api_url';
import { swal } from '../../../helper/swal';
export const CreateIssue = ({data,apiHandler}) => {
    const {toggleModal,status} = useModalHandler();
    return (
        <>
            <button type="button" onClick={toggleModal}  className="btn btn-primary btn-label rounded-pill"><i className="ri-add-fill label-icon align-middle rounded-pill fs-16 me-2"></i> Raise Issue</button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Describe your Issue</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e=>apiHandler.handleSubmit(e,support.addIssue,toggleModal)} >
                        <div className="row g-3">
                            <div className="col-12">
                                <input type="hidden" name="user_id" id='user_id' defaultValue={data&&data.id} />
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="doc" className="form-label">Upload</label>
                                    <input type='file' name='image' id='doc' className='form-control' />
                                </div>
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type='text' name='title' id='title' className='form-control' />
                                </div>
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <textarea name="description" id='desc' className='form-control' ></textarea>
                                </div>
                            </div>
                            
                            
                            <div className="col-lg-12 mt-4">
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" onClick={toggleModal}>Close</button>
                                    <button type="submit" className="btn btn-primary">Post</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}