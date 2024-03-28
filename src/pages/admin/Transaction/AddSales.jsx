import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { swal } from '../../../helper/swal';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { client, item, staff, transaction, vehicles } from '../../../helper/api_url';
import CustomSelect from '../../../components/CustomSelect';
function NewTransactionModal({data,listData,setListData}) {
    const dispatch = useDispatch();
    const [status,setStatus] = useState(false);
    const handleClose = ()=>setStatus(!status);
    const [itemData,setItemData]=useState([]);
    const [vehicleData,setvehicleData]=useState([]);
    const [UserData,setUserData]=useState([]);
    const [unloadingPoints,setUnloadingPoints] = useState([]);
    const [selectedVehicle,setSelectedVehicle] = useState(null);
    const [selectedDriver,setSelectedDriver] = useState(null);
    const [selectedUnloadingPoint,setSelectedUnloadingPoint] = useState(null);
    useEffect(()=>{
        if(status){
            item.list().then(r=>setItemData(r.data[Object.keys(r?.data)[0]]))    
            .catch(err=>console.error(err.response?err.response.data.message:err.message));

            vehicles.list().then(r=>setvehicleData(r.data[Object.keys(r.data)[0]]))
            .then(r=>vehicleData.filter(v=>v.id == data.unloading_vehicle_id)[0])
            .then(d=>setSelectedVehicle({value:d.id,label:d.number}))
            .catch(err=>console.error(err.response?err.response.data.message:err.message));

            staff.list().then(r=>setUserData(r.data[Object.keys(r.data)[0]]))
            .then(r=>UserData.filter(u=>u.id == data.unloading_driver_id)[0])
            .then(d=>setSelectedDriver({value:d.id,label:`${d.first_name} ${d.last_name}`}))
            .catch(err=>console.error(err.response?err.response.data.message:err.message));

            client.list().then(r => setUnloadingPoints(r.data[Object.keys(r.data)[0]].filter(c=>c.client_type == 'receiver'))) 
            .then(()=>setSelectedUnloadingPoint({value:data.unloading_point?.id,label:data.unloading_point.name}))
            .catch(err => console.error(err.response ? err.response.data.message : err.message));
    
        }
    },[status]);
    
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
                                    <CustomSelect isSearchable name='item_id' options={itemData.map(i=>({value:i.id,label:i.name}))} value={{value:data.item.id,label:data.item.name}} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="product_rate" className="form-label">Rate</label>
                                    <input type="text" className="form-control" id='product_rate' name="sales_rate" defaultValue={data.purchase_rate} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="sales_quantity" className="form-label">Qurantity</label>
                                    <input type="text" className="form-control" id='sales_quantity' defaultValue={data.sales_quantity} name="sales_quantity" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="vehicle_id" className="form-label">Vehicle</label>
                                    <CustomSelect 
                                        isSearchable  
                                        value={selectedVehicle}
                                        onChange={e=>setSelectedVehicle(e)}
                                        name='unloading_vehicle_id' 
                                        options={vehicleData?.map(v=>({value:v.id,label:v.type}))} 
                                    />
                                    
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="driver_id" className="form-label">Driver</label>
                                    <CustomSelect 
                                        isSearchable 
                                        value={selectedDriver}
                                        onChange={e=>setSelectedDriver(e)}
                                        name='unloading_driver_id' 
                                        options={UserData?.map(u=>({value:u.id,label:`${u.first_name} ${u.last_name}`}))} 
                                    />
                                    
                                </div>
                            </div>
                            
                            <div className="col-6">
                                <div>
                                    <label htmlFor="unloading_point" className="form-label">UnLoading Point</label>
                                    <CustomSelect 
                                        isSearchable 
                                        name="unloading_point" 
                                        options={unloadingPoints?.map(c=>({value:c.id,label:c.name}))}
                                        value={selectedUnloadingPoint}
                                        onChange={e=>setSelectedUnloadingPoint(e)}
                                    />
                                </div>
                            </div>                            
                            <div className="col-6 mb-2">
                                <div>
                                    <label htmlFor="unloading_challan" className="form-label">UnLoading Challan</label>
                                    <input type="number" className="form-control" name='unloading_challan' defaultValue={data.unloading_challan} id='loading_challan' />
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