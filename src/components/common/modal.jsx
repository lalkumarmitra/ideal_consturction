import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setPreloader } from '../../features/Ui/uiSlice';
import Select from 'react-select'
import { staff, item } from '../../helper/api_url';
import { swal } from '../../helper/swal';

export function NewStaffModal({userData,setUserData}) {
    const dispatch = useDispatch();
    const [status,setStatus] = useState(false);
    const [staffRoles,setStaffRoles] = useState([])
    const handleClick = () => setStatus(!status);
    const token = useSelector(state=>state.auth._token);
    const handleSubmit = e =>{
        dispatch(setPreloader({loader:true,message:'Creating new user please wait'}))
        e.preventDefault();
        const formData = new FormData(e.target);
        staff.add(formData)
        .then(res=>{
            setUserData([res.data.user,...userData])
            dispatch(setPreloader({loader:false,message:''}))
            handleClick();
            swal.success(res.data.message);
        })
        .catch(err=>{
            dispatch(setPreloader({loader:false,message:''}))
            swal.error(err.response ? err.response.data.message : err.message)
        })
    }
    const genders = [
        {value:'male',label:'Male'},
        {value:'female',label:'Female'},
        {value:'others',label:'Others'}
    ]
    useEffect(()=>{
        axios({
            url: "https://idealconstruction.online/application/api/roles", 
            method: "GET",
            headers: { Accept: "application/json", Authorization: 'Bearer '+token },
        })
        .then(res=>setStaffRoles([...res.data.data.roles.map(role=>{return {value:role.id,label:role.name}})]))
        .catch(err=>console.log(err.response?err.response.data.message:err.message))
    },[]);
    return (
        <>
            <button onClick={handleClick} className='btn btn-soft-success add-btn waves-effect'>
                <i className="ri-add-line align-bottom me-1"></i> 
                <span>New Staff</span>
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClick}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>New Staff</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div className="row g-3">
                            <div className="col-6">
                                <div>
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id='firstName' name="first_name" placeholder="Enter firstname" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id='lastName' name="last_name" placeholder="Enter lastname" />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <label htmlFor="genderInput" className="form-label">Gender</label>
                                <Select name='gender' options={genders} />
                            </div>
                            <div className='col-lg-6'>
                                <label htmlFor="dob" className="form-label">Date Of Birth</label>
                                <input type="date" id="dob" name='dob' className='form-control' />
                            </div>

                            <div className='col-lg-6'>
                                <label htmlFor="role" className="form-label">Staff Type</label>
                                <Select name="role_id" options={staffRoles} />
                                {/* <select id="role" name='role_id' defaultValue='driver' className='form-control'>
                                    {staffRoles.length?staffRoles.map((staff,idx)=>(
                                        <option key={idx} value={staff.id}>{staff.name}</option>
                                    )):(<option disabled >No Staff Roles Found</option>)}
                                </select> */}
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="emailInput" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="emailInput" name='email' placeholder="Enter your email"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="phoneNumber" className="form-label">Phone</label>
                                    <input type="tel" className="form-control" name='phone' id="phoneNumber" />
                                </div>
                            </div>
                            <div className='col-12'>
                                <label htmlFor="avatarInput" className="form-label">Profile Image</label>
                                <input type="file" name="avatar" id="avatarInput" className='form-control' />
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="passwordInput" className="form-label">Password</label>
                                    <input type="password" className="form-control" name='password' id="passwordInput" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" onClick={handleClick}>Close</button>
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

export function NewItemModal({itemData,setItemData}) {
    const dispatch = useDispatch();
    const [status,setStatus] = useState(false);
    const handleClose = () => setStatus(!status)
    const handleSubmit = e => {
        dispatch(setPreloader({loader:true,message:'Creating new Item please wait'}))
        e.preventDefault();
        const formData = new FormData(e.target);
        item.add(formData).then(res=>{
            console.log(res);
            setItemData([res.data.item,...itemData])
            dispatch(setPreloader({loader:false,message:''}))
            handleClose();
            swal.success(res.data.message);
        }).catch(err=>{
            console.log(err);
            dispatch(setPreloader({loader:false,message:''}))
            swal.error(err.response ? err.response.data.message : err.message)
        })
    }
    return (
        <>
            <button onClick={handleClose} className='btn btn-soft-success add-btn waves-effect'>
                <i className="ri-add-line align-bottom me-1"></i> 
                <span>New Item</span>
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>New Item</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div className="row g-3">
                            <div className="col-6">
                                <div>
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id='name' name="name" placeholder="Enter Name" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="rate" className="form-label">Rate</label>
                                    <input type="number" className="form-control" id='rate' name="rate" placeholder="Enter Rate" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <label htmlFor="unit" className="form-label">Unit</label>
                                    <input type="text" className="form-control" name='unit' id="unit" />
                                </div>
                            </div>
                            <div className='col-8'>
                                <label htmlFor="itemImage" className="form-label">Product Image</label>
                                <input type="file" name="image" id="itemImage" className='form-control' />
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea name="description" className='form-control' cols="30" rows="5" id="description" ></textarea>
                                </div>
                            </div>
                            <div className="col-lg-12">
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

