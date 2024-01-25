import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { ASSET_URL, staff, } from '../../../helper/api_url';
import { swal } from '../../../helper/swal'
import Modal_profile_image from '../../../components/common/modalProfile';

export function UpdateStaffModal({data,userData,setUserData}) {
    const dispatch = useDispatch();
    const formRef=useRef(null);
    const [status,setStatus] = useState(false);
    const [staffRoles,setStaffRoles] = useState([])
    const handleClick = () => setStatus(!status);
    const [userProfile, setUserProfile] = useState(null);
    const token = useSelector(state=>state.auth._token);
    const handleSubmit = e =>{
        dispatch(setPreloader({loader:true,message:'Updating user please wait'}))
        e.preventDefault();
        const formData = new FormData(formRef.current);
        staff.update(formData)
        .then(res=>{
            dispatch(setPreloader({loader:false,message:''}))
            setUserData(userData.map(td =>td.id === res.data.user.id?{...res.data.user,role:td.role}:td))
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
    const viewimage=ASSET_URL+data.avatar;
    useEffect(()=>{
        setUserProfile(viewimage);
        axios({
            url: "https://idealconstruction.online/application/api/roles", 
            method: "GET",
            headers: { Accept: "application/json", Authorization: 'Bearer '+token },
        })
        .then(res=>setStaffRoles([...res.data.data.roles.map(role=>{return {value:role.id,label:role.name}})]))
        .catch(err=>console.log(err.response?err.response.data.message:err.message))
    },[]);

    const setprofile = file => {
        const dataURL = window.URL.createObjectURL(file);
        setUserProfile(dataURL)    
    }
    
    return (
        <>
            <button onClick={handleClick} className='btn btn-sm btn-soft-success me-1'>
                <i className="ri-pencil-fill" />
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClick}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Update Staff</h5></Modal.Title>
                </Modal.Header>
                <form ref={formRef} onSubmit={e=>handleSubmit(e)}>
                <Modal.Body>
                        <div className="row g-3">
                            
                        {userProfile && 
                        <div className='row'>
                        <Modal_profile_image viewimage={userProfile} />
                        <div className='col-5 mx-auto'>
                        <input type="file" name="avatar" id="avatarInput" onChange={(e) => setprofile(e.target.files[0])} className='form-control' />
                        </div>
                        </div>
                        }
                            <div className="col-6">
                                <input type="hidden" name="user_id" defaultValue={data.id} />
                                <div>
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id='firstName' name="first_name" defaultValue={data.first_name} placeholder="Enter firstname" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id='lastName' name="last_name" defaultValue={data.last_name} placeholder="Enter lastname" />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <label htmlFor="genderInput" className="form-label">Gender</label>
                                <select id="genderInput" name='gender' defaultValue={data.gender} className='form-control'>
                                    {genders.length?genders.map((gender,idx)=>(
                                        <option key={idx} value={gender.value}>{gender.label}</option>
                                    )):(<option disabled >No Staff Gender Found</option>)}
                                </select>
                            </div>
                            <div className='col-lg-6'>
                                <label htmlFor="dob" className="form-label">Date Of Birth</label>
                                <input type="date" id="dob" name='dob' defaultValue={data.dob} className='form-control' />
                            </div>

                            <div className='col-lg-6'>
                                <label htmlFor="role" className="form-label">Staff Type</label>
                                
                                <select id="role" name='role_id' defaultValue={data.role_id} className='form-control'>
                                    {staffRoles.length?staffRoles.map((staff,idx)=>(
                                        <option key={idx} value={staff.value}>{staff.label}</option>
                                    )):(<option disabled >No Staff Roles Found</option>)}
                                </select>
                            </div>
                            {/* <div className="col-6">
                                <div>
                                    <label htmlFor="emailInput" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="emailInput" name='email' defaultValue={data.email} placeholder="Enter your email"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="phoneNumber" className="form-label">Phone</label>
                                    <input type="tel" className="form-control" name='phone' defaultValue={data.phone} id="phoneNumber" />
                                </div>
                            </div> */}
                            <div className="col-12">
                                <div>
                                    <label htmlFor="passwordInput" className="form-label">Password</label>
                                    <input type="password" className="form-control" name='password' id="passwordInput" />
                                </div>
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-lg-12">
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={handleClick}>Close</button>
                            <button type="submit" className="btn btn-primary">update</button>
                        </div>
                    </div>
                </Modal.Footer>
            </form>
            </Modal>
        </>
    )
}