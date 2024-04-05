import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { swal } from '../../../helper/swal';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { client, item, transaction, vehicles } from '../../../helper/api_url';
import CustomSelect from '../../../components/CustomSelect';

function EditTransaction({rowData,setListData}) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    const handleClose = () => setStatus(!status);
    const [itemData, setItemData] = useState([]);
    const [vehicleData, setvehicleData] = useState([]);
    const [unloadingPoints, setUnloadingPoints] = useState([]);
    const [loadingPoints, setLoadingPoints] = useState([]);
    const [unloadingVehicleId,setUnloadingVehicleId] = useState();
    const [clientData, setClientData] = useState([]);

    const [loadingVehicleId,setLoadingVehicleId] = useState();

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); 
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const currentDate = useRef(getCurrentDate());
    useEffect(() => {
        if (status) {
            item.list().then(r => setItemData(r.data[Object.keys(r.data)[0]])).catch(err => console.log(err.response ? err.response.data.message : err.message))
            vehicles.list().then(r => setvehicleData(r.data[Object.keys(r.data)[0]])).catch(err => console.log(err.response ? err.response.data.message : err.message))
            client.list().then(r => setClientData(r.data[Object.keys(r.data)[0]])).catch(err => console.log(err.response ? err.response.data.message : err.message))
        }
    }, [status]);
    useEffect(()=>{
        if(status){
            setUnloadingPoints(clientData.filter(c=>c.client_type === "receiver"));
            setLoadingPoints(clientData.filter(c=>c.client_type === "sender"));
        }
    },[clientData])
    const handleSubmit = e => {
        dispatch(setPreloader({ loader: true, message: 'Creating new Transtion please wait' }))
        e.preventDefault();
        const formData = new FormData(e.target);
        transaction.update(formData).then(res => {
            // res.data.transaction.sales_price = res.data.transaction.sales_rate * res.data.transaction.sales_quantity;
            setListData(state=>state.map(i=> i.id == res.data.transaction.id? res.data.transaction:i))
            dispatch(setPreloader({ loader: false, message: '' }))
            handleClose();
            swal.success(res.data.message);
        }).catch(err => {
            dispatch(setPreloader({ loader: false, message: '' }))
            swal.error(err.response ? err.response.data.message : err.message)
        })
    }

    return (
        <>
            <button onClick={handleClose} className='btn btn-sm btn-soft-info me-1 waves-effect'>
                <i className="ri-pencil-fill" />  
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>New Transaction</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e => handleSubmit(e)}>
                        <input type="hidden" name="transaction_id" value={rowData?.id} />
                        <div className="col-12 mb-2">
                            <div>
                                <label htmlFor="item_id" className="form-label">Product / Item</label>
                                <CustomSelect isSearchable defaultValue={{label:rowData?.item?.name,value:rowData?.item.id}} options={itemData?.map(i=>({value:i.id,label:i.name}))} elementId="item_id" name="item_id" />
                            </div>
                        </div>
                        <div className='bg-soft-info p-2 mb-2 rounded'><h6 className='m-0 py-1 text-center'>Purchase</h6></div>
                        <div className="row g-3 mb-3">
                            <div className="col-6">
                                <div>
                                    <label htmlFor="purchase_date" className="form-label">Purchase Date</label>
                                    <input type="date" className="form-control" name='purchase_date' defaultValue={rowData?.purchase_date} id='purchase_date' />
                                </div>
                            </div>
                           
                            <div className="col-3">
                                <div>
                                    <label htmlFor="product_rate" className="form-label">Rate</label>
                                    <input type="number" className="form-control" id='product_rate' name="purchase_rate" defaultValue={rowData?.purchase_rate} />
                                </div>
                            </div>
                            <div className="col-3">
                                <div>
                                    <label htmlFor="quantity" className="form-label">Quantity</label>
                                    <input type="text" className="form-control" id='quantity' required defaultValue={rowData?.purchase_quantity} name="purchase_quantity" />
                                </div>
                            </div>

                            <div className="col-6">
                                <div>
                                    <label htmlFor="vehicle_id" className="form-label">Vehicle</label>
                                    <CustomSelect 
                                        defaultValue={{label:rowData?.loading_vehicle?.number,value:rowData?.loading_vehicle?.id}}
                                        onChange={e=>{setLoadingVehicleId(e);setUnloadingVehicleId(e)}} 
                                        options={vehicleData?.map(item=>({value:item.id,label:item.type}))} 
                                        elementId="vehicle_id" name='vehicle_id' 
                                        isSearchable 
                                    />
            
                                </div>
                            </div>                            

                            <div className="col-6">
                                <div>
                                    <label htmlFor="loading_point" className="form-label">Loading Point</label>
                                    <CustomSelect 
                                        defaultValue={{label:rowData?.loading_point?.name,value:rowData?.loading_point?.id}}
                                        elementId="loading_point" 
                                        isSearchable 
                                        options={loadingPoints?.map(c=>({value:c.id,label:c.name}))} 
                                        name="loading_point" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='bg-soft-warning p-2 mb-2 rounded'><h6 className='m-0 py-1 text-center'>Sales</h6></div>
                        <div className="row g-3">
                            <div className="col-12">
                                <div>
                                    <label htmlFor="sales_date" className="form-label">Sales Date</label>
                                    <input type="date" defaultValue={rowData?.sales_date}  className="form-control" name='sales_date' id='sales_date' />
                                </div>
                            </div>
                            <div className="col-3">
                                <div>
                                    <label htmlFor="sales_rate" className="form-label">Sales Rate</label>
                                    <input type="number" defaultValue={rowData?.sales_rate} className="form-control" name='sales_rate' id='sales_rate' />
                                </div>
                            </div>
                            <div className="col-3">
                                <div>
                                    <label htmlFor="sales_quantity" className="form-label">Sales Quantitiy</label>
                                    <input type="text" defaultValue={rowData?.sales_quantity} className="form-control" name='sales_quantity' id='sales_quantity' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="unloading_challan" className="form-label">Unloading Challan</label>
                                    <input type="number" defaultValue={rowData?.unloading_challan} className="form-control" name='unloading_challan' id='unloading_challan' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="unloading_vehicle_id" className="form-label">Vehicle</label>
                                    <CustomSelect 
                                        defaultValue={{label:rowData?.unloading_vehichle?.number,value:rowData?.unloading_vehichle?.id}} 
                                        onChange={e=>{setUnloadingVehicleId(e)}}
                                        options={vehicleData?.map(item=>({value:item.id,label:item.type}))} 
                                        elementId="unloading_vehicle_id" 
                                        name='unloading_vehicle_id' 
                                        isSearchable 
                                    />
                                    
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="unloading_point" className="form-label">UnLoading Point</label>
                                    <CustomSelect 
                                        defaultValue={{label:rowData?.unloading_point?.name,value:rowData?.unloading_point?.id}}
                                        elementId="unloading_point" 
                                        isSearchable 
                                        options={unloadingPoints?.map(c=>({value:c.id,label:c.name}))} name="unloading_point" 
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="col-12 mt-3">
                            <div className="hstack gap-2 justify-content-end">
                                <button type="submit" id="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditTransaction