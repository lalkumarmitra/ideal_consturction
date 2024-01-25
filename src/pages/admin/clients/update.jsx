import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { ASSET_URL, client, } from '../../../helper/api_url';
import { swal } from '../../../helper/swal'
import Modal_profile_image from '../../../components/common/modalProfile';

export function UpdateClientModal({data,clientData,setClientData}) {
    const dispatch = useDispatch();
    const formRef=useRef(null);
    const [userProfile, setUserProfile] = useState(null);
    const [status,setStatus] = useState(false);
    const handleClose = () => setStatus(!status)
    const handleSubmit = e => {
        dispatch(setPreloader({loader:true,message:'Updating new Client/Location please wait'}))
        e.preventDefault();
        const formData = new FormData(formRef.current);
        client.update(formData).then(res=>{
            setClientData(clientData.map(td => td.id === res.data.client.id ? res.data.client : td))
            dispatch(setPreloader({loader:false,message:''}))
            handleClose();
            swal.success(res.data.message);
        }).catch(err=>{
            dispatch(setPreloader({loader:false,message:''}))
            swal.error(err.response ? err.response.data.message : err.message)
        })
    }
    const viewimage=ASSET_URL+data.image;
    useEffect(()=>{ setUserProfile(viewimage);},[]);
    const setprofile = file => {
        const dataURL = window.URL.createObjectURL(file);
        setUserProfile(dataURL)    
    }
    return (
        <>
            <button onClick={handleClose} className='btn btn-sm btn-soft-success me-1'>
                <i className="ri-pencil-fill" />
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Update Client Or Location</h5></Modal.Title>
                </Modal.Header>
                    <form ref={formRef} onSubmit={e=>handleSubmit(e)}>
                        <input type="hidden" name="client_id" defaultValue={data.id} />
                <Modal.Body>
                        <div className="row g-3">
                        {userProfile && 
                        <div className='row'>
                        <Modal_profile_image viewimage={userProfile} />
                        <div className='col-5 mx-auto'>
                        <input type="file" name="image" id="image" onChange={(e) => setprofile(e.target.files[0])} className='form-control' />
                        </div>
                        </div>
                        }
                            <div className="col-12">
                                <div>
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id='name' name="name" defaultValue={data.name} placeholder="Enter Name" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea className='form-control' id='address' name='address' defaultValue={data.address} cols="30" rows="2"></textarea>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className="form-control" name='city' defaultValue={data.city} id="city" />
                                </div>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="district" className="form-label">District</label>
                                <input type="text" name="district" id="district" defaultValue={data.district} className='form-control' />
                            </div>
                            <div className="col-4">
                                <div>
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input name="state" className='form-control' defaultValue={data.state} id="state" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="pin" className="form-label">Pin</label>
                                    <input name="pin" className='form-control' defaultValue={data.pin} id="pin" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="client_type" className="form-label">Client/Location Type</label>
                                    <select name="client_type" className='form-control' defaultValue={data.client_type}  id="client_type" >
                                        <option value='sender'>Loading Point</option>
                                        <option value='receiver'>UnLoading Point</option>
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                </Modal.Body>
                    <Modal.Footer>
                        <div className="col-lg-12">
                            <div className="hstack gap-2 justify-content-end">
                                <button type="button" className="btn btn-light" onClick={handleClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </Modal.Footer>
            </form>
            </Modal>
        </>
    )
}