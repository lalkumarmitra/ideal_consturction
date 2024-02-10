import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { setPreloader } from '../../features/Ui/uiSlice';
import { staff, item, client, vehicles, role } from '../../helper/api_url';
import { swal } from '../../helper/swal';


export function NewStaffModal({userData,setUserData,add}) {
    const dispatch = useDispatch();
    const [status,setStatus] = useState(false);
    const [staffRoles,setStaffRoles] = useState([])
    const handleClick = () => setStatus(!status);
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
    const genders = [{value:'male',label:'Male'},{value:'female',label:'Female'},{value:'others',label:'Others'}]
    const currentDate = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const handleDateChange = (event) => setSelectedDate(event.target.value);
    useEffect(()=>{
        if(status)
        role.list().then(res=>setStaffRoles([...res.data.roles.map(role=>{return {value:role.id,label:role.name}})]))
        .catch(err=>console.log(err.response?err.response.data.message:err.message))
    },[status]);
    return (
        <>
            <button type='button' onClick={handleClick} className={add==true?'form-control btn btn-light':'btn btn-soft-success add-btn waves-effect'}>
                <i className="ri-add-line align-bottom me-1"></i> 
                {add==true?'':<span>New Staff</span>}
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
                                    <label htmlFor="firstName" className="form-label">First Name <span className='text-danger'>*</span></label>
                                    <input type="text" className="form-control" id='firstName' name="first_name" placeholder="Enter firstname" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id='lastName' name="last_name" placeholder="Enter lastname" />
                                </div>
                            </div>

                            
                            <div className="col-12">
                                <div>
                                    <label htmlFor="phoneNumber" className="form-label">Phone  <span className='text-danger'>*</span></label>
                                    <input type="tel" className="form-control" name='phone' id="phoneNumber" />
                                </div>
                            </div>
                            <div className='col-6'>
                                <label htmlFor="role" className="form-label">Staff Type  <span className='text-danger'>*</span></label>
                                
                                <select id="role" name='role_id' defaultValue='driver' className='form-control'>
                                    {staffRoles.length?staffRoles.map((staff,idx)=>(
                                        <option key={idx} value={staff.value}>{staff.label}</option>
                                    )):(<option disabled >No Staff Roles Found</option>)}
                                </select>
                            </div>
                            <div className="col-6">
                                <label htmlFor="genderInput" className="form-label">Gender</label>
                                <select id="genderInput" name='gender' defaultValue='male' className='form-control'>
                                    {genders.length?genders.map((gender,idx)=>(
                                        <option key={idx} value={gender.value}>{gender.label}</option>
                                    )):(<option disabled >No Gender Found</option>)}
                                </select>
                            </div>
                            <hr />
                            <div className='col-6'>
                                <label htmlFor="dob" className="form-label">Date Of Birth</label>
                                <input type="date" id="dob" name='dob' value={selectedDate} onChange={handleDateChange} className='form-control' />
                            </div>

                            <div className="col-6">
                                <div>
                                    <label htmlFor="emailInput" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="emailInput" name='email' placeholder="Enter your email"/>
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
                            <div className="col-12">
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
            setItemData([res.data.item,...itemData])
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

export function NewClientModal({clientData,setClientData,add}) {
    const dispatch = useDispatch();
    const [status,setStatus] = useState(false);
    const handleClose = () => setStatus(!status)
    const handleSubmit = e => {
        dispatch(setPreloader({loader:true,message:'Creating new Client/Location please wait'}))
        e.preventDefault();
        const formData = new FormData(e.target);
        client.add(formData).then(res=>{
            setClientData([res.data.client,...clientData])
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
            <button onClick={handleClose} type='button' className={add==true?'form-control btn btn-light':'btn btn-soft-success add-btn waves-effect'}>
                <i className="ri-add-line align-bottom me-1"></i> 
                {add==true?'':<span>New Client/Location</span>}
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>New Client / Location</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div className="row g-3">
                            <div className="col-12">
                                <div>
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id='name' name="name" placeholder="Enter Name" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea className='form-control' id='address' name='address' cols="30" rows="2"></textarea>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className="form-control" name='city' id="city" />
                                </div>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="district" className="form-label">District</label>
                                <input type="text" name="district" id="district" className='form-control' />
                            </div>
                            <div className="col-4">
                                <div>
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input name="state" className='form-control' id="state" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="pin" className="form-label">Pin</label>
                                    <input name="pin" className='form-control'  id="pin" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="client_type" className="form-label">Client/Location Type</label>
                                    <select name="client_type" className='form-control'  id="client_type" >
                                        <option value='sender'>Loading Point</option>
                                        <option value='receiver'>UnLoading Point</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-12'>
                                <label htmlFor="itemImage" className="form-label">Client/Location Image</label>
                                <input type="file" name="image" id="itemImage" className='form-control' />
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

export function NewVehicleModal({listData,setListData,add}){
    const dispatch = useDispatch();
    const [status,setStatus] = useState(false);
    const handleClose = () => setStatus(!status)
    const handleSubmit = e => {
        dispatch(setPreloader({loader:true,message:'Creating new Vehicle please wait'}))
        e.preventDefault();
        const formData = new FormData(e.target);
        vehicles.add(formData).then(res=>{
            setListData([res.data.vehicle,...listData])
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
            <button type='button' onClick={handleClose} className={add==true?'form-control btn btn-light':'btn btn-soft-success add-btn waves-effect'}>
                <i className="ri-add-line align-bottom me-1"></i> 
                {add==true?'':<span>New Vehicle</span>}
            </button>
            
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClose} style={{ zIndex: 9999 }}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>New Vehicle</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div className="row g-3">
                            <div className="col-12">
                                <div>
                                    <label htmlFor="vehicle_number" className="form-label">Vehicle Number</label>
                                    <input type="text" className="form-control" id='vehicle_number' name="number" placeholder="Enter Vehicle Number" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="vehicle_type" className="form-label">Vehicle Type</label>
                                    <input type="text" className="form-control" id='vehicle_type' name="type" placeholder="Enter Vehicle type" />
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

