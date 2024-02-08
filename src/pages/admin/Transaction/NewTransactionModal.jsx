import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { swal } from '../../../helper/swal';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { item, staff, transaction, vehicles } from '../../../helper/api_url';
function NewTransactionModal({listData,setListData}) {
    const dispatch = useDispatch();
    const [status,setStatus] = useState(false);
    const handleClose = ()=>setStatus(!status);
    const [itemData,setItemData]=useState([]);
    const [vehicleData,setvehicleData]=useState([]);
    const [UserData,setUserData]=useState([]);
    useEffect(()=>{
        if(status){
        item.list().then(r=>setItemData(r.data[Object.keys(r.data)[0]])).catch(err=>swal.error(err.response?err.response.data.message:err.message))
        vehicles.list().then(r=>setvehicleData(r.data[Object.keys(r.data)[0]])).catch(err=>swal.error(err.response?err.response.data.message:err.message))
        staff.list().then(r=>setUserData(r.data[Object.keys(r.data)[0]])).catch(err=>swal.error(err.response?err.response.data.message:err.message))
        }
      },[status]);
    const handlegetId = (e) =>{ itemData.map((item) => {if(item.id == e.target.value) document.getElementById('product_rate').value = item.rate;});};
    const handleSubmit = e => {
        dispatch(setPreloader({loader:true,message:'Creating new Transtion please wait'}))
        e.preventDefault();
        const formData = new FormData(e.target);
        transaction.add(formData).then(res=>{
            setListData([res.data.transaction,...listData])
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
                            <input type="hidden" name="purchase_paid_amount" defaultValue="0"/>
                            <input type="hidden" name="sales_received_amount" defaultValue="0"/>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="purchase_date" className="form-label">Purchase Date</label>
                                    <input type="date" className="form-control" name='purchase_date' id='purchase_date' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="item_id" className="form-label">Product / Item</label>
                                    <select id="item_id" name='item_id' className='form-control' onChange={handlegetId}>
                                        <option value="">--Select Item--</option>
                                        {itemData.length ? itemData.map((item, idx) => (<option key={idx} value={item.id}>{item.name}</option>)) : (<option disabled >No Data Found</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="product_rate" className="form-label">Rate</label>
                                    <input type="number" className="form-control" id='product_rate' name="purchase_rate" defaultValue="" />
                                </div>
                            </div>
                            <div className="col-3">
                                <div>
                                    <label htmlFor="quantity" className="form-label">Qurantity</label>
                                    <input type="number" className="form-control" id='quantity' name="purchase_quantity" />
                                </div>
                            </div>
                            <div className="col-3">
                                <div>
                                    <label htmlFor="do_number" className="form-label">Do Number</label>
                                    <input type="number" className="form-control" id='do_number' name="do_number" />
                                </div>
                            </div>

                            <div className="col-10">
                                <div>
                                    <label htmlFor="vehicle_id" className="form-label">Vehicle</label>
                                    <select id="vehicle_id" name='vehicle_id' className='form-control' onChange={handlegetId}>
                                        <option value="">--Select Vehicle--</option>
                                        {vehicleData.length ? vehicleData.map((item, idx) => (<option key={idx} value={item.id}>{item.type}</option>)) : (<option disabled >No data Found</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className='col-2'>
                                <div>
                                    <label htmlFor="add_new_location_point">Add</label>
                                    <button type='button' className='form-control btn btn-light'>+</button>
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="driver_id" className="form-label">Driver</label>
                                    <select id="driver_id" name='driver_id' className='form-control' onChange={handlegetId}>
                                        <option value="">--Select Driver--</option>
                                        {UserData.length ? UserData.map((user, idx) => (<option key={idx} value={user.id}>{user.first_name} {user.last_name}</option>)) : (<option disabled >No data Found</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className='col-2'>
                                <div>
                                    <label htmlFor="add_new_location_point">Add</label>
                                    <button type='button' className='form-control btn btn-light'>+</button>
                                </div>
                            </div>
                            <div className="col-4 mb-2">
                                <div>
                                    <label htmlFor="loading_challan" className="form-label">Loading Challan</label>
                                    <input type="number" className="form-control" name='loading_challan' id='loading_challan' />
                                </div>
                            </div>
                            
                            <div className="col-5">
                                <div>
                                    <label htmlFor="loading_point" className="form-label">Loading Point</label>
                                    <select id="loading_point" name="loading_point"  className='form-control'>
                                        <option value="">--select--</option>
                                        <option value="1">Loading</option>
                                        <option value="0">UnLoading</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-2'>
                                <div>
                                    <label htmlFor="add_new_location_point" className="form-label">Add</label>
                                    <button type='button' id='add_new_location_point' className='form-control btn btn-light'>+</button>
                                </div>
                            </div>
                            <div className="col-5">
                                <div>
                                    <label htmlFor="status_transction" className="form-label">Status</label>
                                    <select name="status" id="status_transction"   className='form-control'>
                                        <option value="">--select status--</option>
                                        <option value="pending">pending</option>
                                        <option value="active">active</option>
                                        <option value="deactive">deactive</option>
                                        <option value="closed">closed</option>
                                        <option value="sold">sold</option>
                                        <option value="purchased">purchased</option>
                                        <option value="deleted">deleted</option>
                                    </select>
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