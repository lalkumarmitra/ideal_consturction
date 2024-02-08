import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { swal } from '../../../helper/swal';

function NewTransactionModal({listData,setListData}) {

    const [status,setStatus] = useState(false);
    const handleClose = ()=>setStatus(!status);
    const handleSubmit = e => {
        console.log(e.target);
    }
    return (
        <>
            <button onClick={handleClose} className='btn btn-soft-success add-btn waves-effect'>
                <i className="ri-add-line align-bottom me-1"></i> 
                <span>New Transaction</span>
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>New Transaction</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div className="row g-3">
                            <div className='col-12'>
                                <h6 className='text-center'>Purchase</h6>
                            </div>
                            <hr />
                            <div className="col-6">
                                <div>
                                    <label htmlFor="purchase_date" className="form-label">Purchase Date</label>
                                    <input type="date" className="form-control" id='purchase_date' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="product_item" className="form-label">Product / Item</label>
                                    <input type="text" className="form-control" id='product_item' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="product_rate" className="form-label">Rate</label>
                                    <input type="number" className="form-control" id='product_rate' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="quantity" className="form-label">Qurantity</label>
                                    <input type="number" className="form-control" id='quantity' />
                                </div>
                            </div>

                            <div className="col-10">
                                <div>
                                    <label htmlFor="loading_point" className="form-label">Loading Point</label>
                                    <input type="text" className="form-control" id='loading_point' name="type" />
                                </div>
                            </div>
                            <div className='col-2'>
                                <div>
                                    <label htmlFor="add_new_location_point">Add</label>
                                    <button className=' form-control btn btn-light'>+</button>
                                </div>
                            </div>
                            <div className="col-10">
                                <div>
                                    <label htmlFor="vehicle_id" className="form-label">Vehicle</label>
                                    <input type="text" className="form-control" id='vehicle_id' name="vehicle_id" />
                                </div>
                            </div>
                            <div className='col-2'>
                                <div>
                                    <label htmlFor="add_new_location_point">Add</label>
                                    <button className=' form-control btn btn-light'>+</button>
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="loading_challan_no" className="form-label">Driver</label>
                                    <input type="number" className="form-control" id='loading_challan' />
                                </div>
                            </div>
                            <div className='col-2'>
                                <div>
                                    <label htmlFor="add_new_location_point">Add</label>
                                    <button className=' form-control btn btn-light'>+</button>
                                </div>
                            </div>
                            <div className="col-4 mb-2">
                                <div>
                                    <label htmlFor="loading_challan_no" className="form-label">Loading Challan</label>
                                    <input type="number" className="form-control" id='loading_challan' />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" onClick={handleClose}>Close</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NewTransactionModal