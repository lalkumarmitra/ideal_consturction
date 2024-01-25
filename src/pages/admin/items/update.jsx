import React, { useEffect, useRef, useState } from 'react'
import { Modal,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { ASSET_URL, item, } from '../../../helper/api_url';
import { swal } from '../../../helper/swal'


export function UpdateItemModal({data,itemData,setItemData}) {
    const dispatch = useDispatch();
    const formRef=useRef(null);
    const [status,setStatus] = useState(false);
    const [ItemPic, setItemPic] = useState(null);
    const handleClose = () => setStatus(!status)
    const handleSubmit = e => {
        dispatch(setPreloader({loader:true,message:'Updating Item please wait'}))
        e.preventDefault();
        const formData = new FormData(formRef.current);
        item.update(formData).then(res=>{
            setItemData(itemData.map(td => td.id === res.data.item.id ? res.data.item : td))
            dispatch(setPreloader({loader:false,message:''}))
            handleClose();
            swal.success(res.data.message);
        }).catch(err=>{
            dispatch(setPreloader({loader:false,message:''}))
            swal.error(err.response ? err.response.data.message : err.message)
        })
    }
    const viewimage=ASSET_URL+data.image;
    useEffect(()=>{
        setItemPic(viewimage);
    },[]);
    const setItemImage = file => {
        const dataURL = window.URL.createObjectURL(file);
        setItemPic(dataURL)    
    }
    return (
        <>
            <button onClick={handleClose} className='btn btn-sm btn-soft-success me-1'>
                <i className="ri-pencil-fill" />
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Update Item</h5></Modal.Title>
                </Modal.Header>
                    <form ref={formRef} onSubmit={e=>handleSubmit(e)}>
                <Modal.Body>
                        <div className="row g-3">

                            <div className="col-6">
                                <input type="hidden" name="item_id" defaultValue={data.id} />
                                <div>
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id='name' name="name" defaultValue={data.name} placeholder="Enter Name" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="rate" className="form-label">Rate</label>
                                    <input type="number" className="form-control" id='rate' name="rate" defaultValue={data.rate} placeholder="Enter Rate" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <label htmlFor="unit" className="form-label">Unit</label>
                                    <input type="text" className="form-control" name='unit' defaultValue={data.unit} id="unit" />
                                </div>
                            </div>
                            <div className='col-8'>
                                <label htmlFor="itemImage" className="form-label">Product Image</label>
                                <input type="file" name="image" id="itemImage" onChange={(e) => setItemImage(e.target.files[0])} className='form-control col-5' />
                                <div className='mt-2'>
                                </div>

                            </div>
                            <div className='row'>
                                <div className="col-12 text-center">
                                <img src={ItemPic} alt='Not image' style={{ width: "280px", height: "200px",aspectRatio: '1/1',objectFit: 'cover', borderRadius: "5%" }} />

                                </div>
                            </div>
                            <div className="col-12">
                                <div>
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea name="description" className='form-control' cols="30" rows="5" defaultValue={data.description} id="description" ></textarea>
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