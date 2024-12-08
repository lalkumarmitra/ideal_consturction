import { Modal, Row, Col } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModalHandler } from "../../../helper/custom_hook";
import {  item } from "../../../helper/api_url";
import { swal } from "../../../helper/swal";
export function CreateItemModel({ className }) {
	const { status, toggleModal } = useModalHandler();
	const queryClient = useQueryClient();
	const mutation = useMutation({
        mutationFn: (formData) => item.add(formData),
        onSuccess: (res) => {
            queryClient.setQueryData(['items'], (oldData) => {
                if (!oldData || !oldData.data || !oldData.data.items) {
                  return {...oldData,data: {...oldData?.data,items: [res.data.item],},};
                }
                return {...oldData,data: {...oldData.data,items: [res.data.item, ...oldData.data.items],},};
              });
              swal.success(res.data.message);
              toggleModal();
            },
            onError: (err) => {swal.error(err.response ? err.response.data.message : err.message);},
          });
            
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		mutation.mutate(formData);
	};



    return (
        <>
            <button onClick={toggleModal} className={`btn btn-soft-primary ${className}`}>
                <i className="ri-add-line align-bottom me-1"></i> 
                <span>New Item</span>
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={toggleModal}>
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
                                    <button type="button" className="btn btn-light" onClick={toggleModal}>Close</button>
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