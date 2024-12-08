import { Modal, Row, Col } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModalHandler } from "../../../helper/custom_hook";
import { client } from "../../../helper/api_url";
import { swal } from "../../../helper/swal";

export function CreateClientModel({ className }) {
    const { status, toggleModal } = useModalHandler();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (formData) => client.add(formData),
        onSuccess: (res) => {
            queryClient.setQueryData(['clients'], (oldData) => {
                if (!oldData || !oldData.data || !oldData.data.clients) {
                    return { ...oldData, data: { ...oldData?.data, clients: [res.data.client], }, };
                }
                return { ...oldData, data: { ...oldData.data, clients: [res.data.client, ...oldData.data.clients], }, };
            });
            swal.success(res.data.message);
            toggleModal();
        },
        onError: (err) => { swal.error(err.response ? err.response.data.message : err.message); },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        mutation.mutate(formData);
    };
    return (
        <>
            <button onClick={toggleModal} type='button' className={`btn btn-soft-primary ${className}`}>
                <i className="ri-add-line align-bottom me-1"></i>
                New Client/Location
            </button>
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>New Client / Location</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e => handleSubmit(e)}>
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
                                    <input name="pin" className='form-control' id="pin" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <label htmlFor="client_type" className="form-label">Client/Location Type</label>
                                    <select name="client_type" className='form-control' id="client_type" >
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