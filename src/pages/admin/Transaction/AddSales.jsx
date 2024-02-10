import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { swal } from '../../../helper/swal';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { client, item, staff, transaction, vehicles } from '../../../helper/api_url';
import { NewClientModal, NewStaffModal, NewVehicleModal } from '../../../components/common/modal';
function NewTransactionModal({data,listData,setListData}) {
    const dispatch = useDispatch();
    const [status,setStatus] = useState(false);
    const handleClose = ()=>setStatus(!status);
    const [itemData,setItemData]=useState([]);
    const [vehicleData,setvehicleData]=useState([]);
    const [UserData,setUserData]=useState([]);
    const [clientData, setClientData] = useState([]);
    useEffect(()=>{
        if(status){
        item.list().then(r=>setItemData(r.data[Object.keys(r.data)[0]])).catch(err=>swal.error(err.response?err.response.data.message:err.message))
        vehicles.list().then(r=>setvehicleData(r.data[Object.keys(r.data)[0]])).catch(err=>swal.error(err.response?err.response.data.message:err.message))
        staff.list().then(r=>setUserData(r.data[Object.keys(r.data)[0]])).catch(err=>swal.error(err.response?err.response.data.message:err.message))
        client.list().then(r => setClientData(r.data[Object.keys(r.data)[0]])).catch(err => swal.error(err.response ? err.response.data.message : err.message))
        }
      },[status]);
    const handlegetId = (e) =>{ itemData.map((item) => {if(item.id == e.target.value) document.getElementById('product_rate').value = item.rate;});};
    const handleSubmit = e => {
        dispatch(setPreloader({loader:true,message:'please wait'}))
        e.preventDefault();
        const formData = new FormData(e.target);
        transaction.addsell(formData).then(res=>{
            setListData(listData.map(td => td.id === res.data.transaction.id ? res.data.transaction : td))
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
            <button onClick={handleClose} className='btn btn-sm btn-soft-info'>
                <span>Sell</span>
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Sale Transaction</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form  onSubmit={e=>handleSubmit(e)}>
                        <div className="row g-3">
                            <div className='col-12'>
                                <h6 className='text-center'>Sales</h6>
                            </div>
                            <hr />
                            <input type="hidden" name="purchase_paid_amount" defaultValue="0"/>
                            <input type="hidden" name="sales_received_amount" defaultValue="0"/>
                            <input type="hidden" name="transaction_id" defaultValue={data.id}/>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="sales_date" className="form-label">Sale Date</label>
                                    <input type="date" className="form-control" name='sales_date' id='sales_date' defaultValue={data.sales_date} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="item_id" className="form-label">Product / Item</label>
                                    <select id="item_id" name='item_id' className='form-control' defaultValue={data.item_id} onChange={handlegetId}>
                                        <option value="">--Select Item--</option>
                                        {itemData.length ? itemData.map((item, idx) => (<option key={idx} value={item.id}>{item.name}</option>)) : (<option disabled >No Data Found</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="product_rate" className="form-label">Rate</label>
                                    <input type="number" className="form-control" id='product_rate' name="sales_rate" defaultValue={data.purchase_rate} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="sales_quantity" className="form-label">Qurantity</label>
                                    <input type="number" className="form-control" id='sales_quantity' defaultValue={data.sales_quantity} name="sales_quantity" />
                                </div>
                            </div>
                            {/* <div className="col-3">
                                <div>
                                    <label htmlFor="do_number" className="form-label">Do Number</label>
                                    <input type="number" className="form-control" id='do_number' name="do_number" />
                                </div>
                            </div> */}

                            <div className="col-10">
                                <div>
                                    <label htmlFor="vehicle_id" className="form-label">Vehicle</label>
                                    <select id="vehicle_id" name='unloading_vehicle_id' className='form-control' defaultValue={data.unloading_vehicle_id} onChange={handlegetId}>
                                        <option value="">--Select Vehicle--</option>
                                        {vehicleData.length ? vehicleData.map((item, idx) => (<option key={idx} value={item.id}>{item.type}</option>)) : (<option disabled >No data Found</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className='col-2'>
                                <div>
                                    <label htmlFor="add_new_location_point">Add</label>
                                    <NewVehicleModal add={true} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="driver_id" className="form-label">Driver</label>
                                    <select id="driver_id" name='unloading_driver_id' className='form-control' defaultValue={data.unloading_driver_id} onChange={handlegetId}>
                                        <option value="">--Select Driver--</option>
                                        {UserData.length ? UserData.map((user, idx) => (<option key={idx} value={user.id}>{user.first_name} {user.last_name}</option>)) : (<option disabled >No data Found</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className='col-2'>
                                <div>
                                    <label htmlFor="add_new_location_point">Add</label>
                                    <NewStaffModal add={true}  />
                                </div>
                            </div>
                            <div className="col-4 mb-2">
                                <div>
                                    <label htmlFor="unloading_challan" className="form-label">UnLoading Challan</label>
                                    <input type="number" className="form-control" name='unloading_challan' defaultValue={data.unloading_challan} id='loading_challan' />
                                </div>
                            </div>
                            
                            <div className="col-10">
                                <div>
                                    <label htmlFor="unloading_point" className="form-label">UnLoading Point</label>
                                    <select id="unloading_point" name="unloading_point" defaultValue={data.unloading_point}  className='form-control'>
                                    <option value="">--Select user--</option>
                                        {
                                                clientData.length? clientData.map((user,idx)=>(
                                                   user.client_type=="receiver"?<option key={idx} value={user.id}>{user.name}</option>:''
                                                )):<option value="">No Data Found</option>
                                            }
                                    </select>

                                </div>
                            </div>
                            <div className='col-2'>
                                <div>
                                    <label htmlFor="add_new_location_point" className="form-label">Add</label>
                                    <NewClientModal add={true} />
                                </div>
                            </div>
                            
                           
                            <div className="col-12">
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" onClick={handleClose}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
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