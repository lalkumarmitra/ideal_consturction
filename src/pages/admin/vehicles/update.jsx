import React, { useState,useRef} from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch} from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import {vehicles } from '../../../helper/api_url';
import { swal } from '../../../helper/swal';

export function UpdateVehicleModal({data,listData,setListData}){
    const dispatch = useDispatch();
    const formRef=useRef(null);
    const [status,setStatus] = useState(false);
    const handleClose = () => setStatus(!status)
    const handleSubmit = e => {
        dispatch(setPreloader({loader:true,message:'Updating Vehicle please wait'}))
        e.preventDefault();
        const formData = new FormData(formRef.current);
        vehicles.update(formData).then(res=>{
            setListData(listData.map(td => td.id === res.data.vehicle.id ? res.data.vehicle : td))
            dispatch(setPreloader({loader:false,message:''}))
            handleClose();
            swal.success(res.data.message);
        }).catch(err=>{
            dispatch(setPreloader({loader:false,message:''}))
            swal.error(err.response ? err.response.data.message : err.message)
        })
    }

    return (
        <>
            <button onClick={handleClose} className='btn btn-sm btn-soft-success me-1'>
                <i className="ri-pencil-fill" />
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Update Vehicle</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form ref={formRef} onSubmit={e=>handleSubmit(e)}>
                        <div className="row g-3">
                            <div className="col-12">
                                <input type="hidden" name="vehicle_id" defaultValue={data.id} />
                                <div>
                                    <label htmlFor="vehicle_number" className="form-label">Vehicle Number</label>
                                    <input type="text" className="form-control" id='vehicle_number' name="number" defaultValue={data.number} placeholder="Enter Vehicle Number" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="vehicle_type" className="form-label">Vehicle Type</label>
                                    <input type="text" className="form-control" id='vehicle_type' name="type" defaultValue={data.type} placeholder="Enter Vehicle type" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" onClick={handleClose}>Close</button>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}