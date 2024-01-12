import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import Select from 'react-select'

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
        axios({
            url: "https://idealconstruction.online/application/api/user", 
            method: "POST",
            headers: { Accept: "application/json", Authorization: 'Bearer '+token },
            data:formData
        })
        
        .then(res=>{
           setUserData([...userData, res.data.data.user])
           dispatch(setPreloader({loader:false,message:''}))
           handleClick();
           Swal.fire({
                title: 'Success',
                icon:'success',
                text: res.data.data.message,
                confirmButtonClass: "btn btn-primary w-xs mt-2",
                showCloseButton: !0,
            })
        })
        .catch(err=>{
            dispatch(setPreloader({loader:false,message:''}))
            Swal.fire({
                title: 'Could not Create User',
                icon:'error',
                text: err.response ? err.response.data.message : err.message,
                confirmButtonClass: "btn btn-primary w-xs mt-2",
                showCloseButton: !0,
            })
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

