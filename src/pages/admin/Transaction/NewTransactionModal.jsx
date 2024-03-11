import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { swal } from '../../../helper/swal';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { client, item, staff, transaction, vehicles } from '../../../helper/api_url';
import { NewClientModal, NewStaffModal, NewVehicleModal } from '../../../components/common/modal';
import CustomSelect from '../../../components/CustomSelect';
function NewTransactionModal({ listData, setListData }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    const handleClose = () => setStatus(!status);
    const [itemData, setItemData] = useState([]);
    const [vehicleData, setvehicleData] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [unloadingPoints, setUnloadingPoints] = useState([]);
    const [loadingPoints, setLoadingPoints] = useState([]);
    const [loadingVehicleId,setLoadingVehicleId] = useState();
    const [unloadingVehicleId,setUnloadingVehicleId] = useState();
    const [loadingDriverId,setLoadingDriverId] = useState();
    const [unloadingDriverId,setUnloadingDriverId] = useState();
    useEffect(() => {
        if (status) {
            item.list().then(r => setItemData(r.data[Object.keys(r.data)[0]])).catch(err => console.log(err.response ? err.response.data.message : err.message))
            vehicles.list().then(r => setvehicleData(r.data[Object.keys(r.data)[0]])).catch(err => console.log(err.response ? err.response.data.message : err.message))
            staff.list().then(r => setUserData(r.data[Object.keys(r.data)[0]])).catch(err => console.log(err.response ? err.response.data.message : err.message))
            client.list().then(r => setClientData(r.data[Object.keys(r.data)[0]])).catch(err => console.log(err.response ? err.response.data.message : err.message))
        }
    }, [status]);
    useEffect(()=>{
        if(status){
            setUnloadingPoints(clientData.filter(c=>c.client_type === "receiver"));
            setLoadingPoints(clientData.filter(c=>c.client_type === "sender"));
        }
    },[clientData])
    const handlegetId = (e) => { 
        const currentItem = itemData.filter(i=>i.id===e.value)[0];
        document.getElementById('product_rate').value = currentItem.rate;
        document.getElementById('sales_rate').value = currentItem.rate;
    };
    const handleSubmit = e => {
        dispatch(setPreloader({ loader: true, message: 'Creating new Transtion please wait' }))
        e.preventDefault();
        const formData = new FormData(e.target);
        transaction.add(formData).then(res => {
            setListData([res.data.transaction, ...listData])
            dispatch(setPreloader({ loader: false, message: '' }))
            handleClose();
            swal.success(res.data.message);
        }).catch(err => {
            dispatch(setPreloader({ loader: false, message: '' }))
            swal.error(err.response ? err.response.data.message : err.message)
        })
    }
    const handlesave=(e)=>{
        e.preventDefault();
        document.querySelector("#save").className = "d-none";
        document.querySelector("#purchaseform").className = "d-none";
        document.querySelector("#saleform").className = "d-block";
        document.querySelector("#submit").className = "btn btn-primary d-block";
        document.querySelector("#prev").disabled = false;
        document.querySelector("#sales_date").value = document.querySelector("#purchase_date").value;
        document.querySelector("#sales_quantity").value = document.querySelector("#quantity").value;
    }
    const handleprev=(e)=>{
        e.preventDefault();
        document.querySelector("#prev").disabled = true;
        document.querySelector("#save").className = "btn btn-primary d-block";
        document.querySelector("#purchaseform").className = "d-block";
        document.querySelector("#saleform").className = "d-none";
        document.querySelector("#submit").className = "btn btn-primary d-none";

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
                    <form onSubmit={e => handleSubmit(e)}>
                        <div id='purchaseform' className='d-block'>
                            <div className="row g-3">
                                <div className='col-12'>
                                    <h6 className='text-center'>Purchase</h6>
                                </div>
                                <hr />
                                <input type="hidden" name="purchase_paid_amount" defaultValue="0" />
                                <input type="hidden" name="sales_received_amount" defaultValue="0" />
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="purchase_date" className="form-label">Purchase Date</label>
                                        <input type="date" className="form-control" name='purchase_date' id='purchase_date' />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="item_id" className="form-label">Product / Item</label>
                                        <CustomSelect isSearchable options={itemData?.map(i=>({value:i.id,label:i.name}))} elementId="item_id" name="item_id" onChange={handlegetId} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="product_rate" className="form-label">Rate</label>
                                        <input type="number" className="form-control" id='product_rate' name="purchase_rate" defaultValue="" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="quantity" className="form-label">Quantity</label>
                                        <input type="text" className="form-control" id='quantity' required defaultValue={0} name="purchase_quantity" />
                                    </div>
                                </div>

                                <div className="col-10">
                                    <div>
                                        <label htmlFor="vehicle_id" className="form-label">Vehicle</label>
                                        <CustomSelect 
                                            onChange={e=>{setLoadingVehicleId(e);setUnloadingVehicleId(e)}} 
                                            options={vehicleData?.map(item=>({value:item.id,label:item.type}))} 
                                            elementId="vehicle_id" name='vehicle_id' 
                                            isSearchable 
                                        />
                
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div>
                                        <label htmlFor="add_new_location_point">Add</label>
                                        <NewVehicleModal listData={vehicleData} setListData={setvehicleData}   add={true} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="driver_id" className="form-label">Driver</label>
                                        <CustomSelect 
                                            onChange={e=>{setLoadingDriverId(e);setUnloadingDriverId(e)}} 
                                            isSearchable 
                                            name='driver_id' 
                                            elementId="driver_id" 
                                            options={UserData?.map(u=>({value:u.id,label:`${u.first_name} ${u.last_name}`}))} 
                                        />
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div>
                                        <label htmlFor="add_new_location_point">Add</label>
                                        <NewStaffModal listData={UserData} setListData={setUserData} add={true}  />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div>
                                        <label htmlFor="do_number" className="form-label">Do Number</label>
                                        <input type="number" className="form-control" id='do_number' name="do_number" />
                                    </div>
                                </div>

                                <div className="col-10">
                                    <div>
                                        <label htmlFor="loading_point" className="form-label">Loading Point</label>
                                        <CustomSelect elementId="loading_point" isSearchable options={loadingPoints?.map(c=>({value:c.id,label:c.name}))} name="loading_point" />
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div>
                                        <label htmlFor="loading_point_label" className="form-label">Add</label>
                                        <NewClientModal listData={clientData} setListData={setClientData} add={true} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------------sales --------------------------*/}
                        <div id="saleform" className='d-none'>
                            <div className="row g-3">
                                <div className='col-12'>
                                    <h6 className='text-center'>Sales</h6>
                                </div>
                                <hr />
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="sales_date" className="form-label">Sales Date</label>
                                        <input type="date"  className="form-control" name='sales_date' id='sales_date' />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="sales_rate" className="form-label">Sales Rate</label>
                                        <input type="number" className="form-control" name='sales_rate' defaultValue="" id='sales_rate' />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="sales_quantity" className="form-label">Sales Quantitiy</label>
                                        <input type="text" className="form-control" name='sales_quantity' id='sales_quantity' />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="unloading_challan" className="form-label">Unloading Challan</label>
                                        <input type="number" className="form-control" name='unloading_challan' id='unloading_challan' />
                                    </div>
                                </div>
                                <div className="col-10">
                                    <div>
                                        <label htmlFor="unloading_vehicle_id" className="form-label">Vehicle</label>
                                        <CustomSelect 
                                            value={unloadingVehicleId} 
                                            onChange={e=>{setUnloadingVehicleId(e)}}
                                            options={vehicleData?.map(item=>({value:item.id,label:item.type}))} 
                                            elementId="unloading_vehicle_id" 
                                            name='unloading_vehicle_id' 
                                            isSearchable 
                                        />
                                        
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div>
                                        <label htmlFor="unloading_vehicle_id_label">Add</label>
                                        <NewVehicleModal add={true} />
                                    </div>
                                </div>
                                <div className="col-10">
                                    <div>
                                        <label htmlFor="unloading_driver_id" className="form-label">Driver</label>
                                        <CustomSelect 
                                            value={unloadingDriverId} 
                                            onChange={e=>{setUnloadingDriverId(e)}}
                                            isSearchable 
                                            name='unloading_driver_id' 
                                            elementId="unloading_driver_id" 
                                            options={UserData?.map(u=>({value:u.id,label:`${u.first_name} ${u.last_name}`}))} 
                                        />
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div>
                                        <label htmlFor="unloading_driver_id_label">Add</label>
                                        <NewStaffModal add={true}  />
                                    </div>
                                </div>

                                <div className="col-10">
                                    <div>
                                        <label htmlFor="unloading_point" className="form-label">UnLoading Point</label>
                                        <CustomSelect elementId="unloading_point" isSearchable options={unloadingPoints?.map(c=>({value:c.id,label:c.name}))} name="unloading_point" />
                                        {/* <select id="unloading_point" name="unloading_point" className='form-control'>
                                        <option value="">--Select user--</option>
                                        {
                                                clientData.length? clientData.map((user,idx)=>(
                                                   user.client_type=="receiver"?<option key={idx} value={user.id}>{user.name}</option>:''
                                                )):<option value="">No Data Found</option>
                                            }
                                        </select> */}
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div>
                                        <label htmlFor="unloading_point_label" className="form-label">Add</label>
                                        <NewClientModal add={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="hstack gap-2 justify-content-end">
                                {/* <button type="button" className="btn btn-light" onClick={handleClose}>Close</button> */}
                                <button type="button" id="prev" className="btn btn-primary" onClick={handleprev}>Back</button>
                                <button type="button" id="save" className="btn btn-primary d-block" onClick={handlesave}>Next</button>
                                <button type="submit" id="submit" className="btn btn-primary d-none">Save</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NewTransactionModal