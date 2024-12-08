
import { Modal, Row, Col } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModalHandler } from "../../../helper/custom_hook";
import { vehicles } from "../../../helper/api_url";
import { swal } from "../../../helper/swal";
export function CreateVehiclesModel({ className }){
    const { status, toggleModal } = useModalHandler();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (formData) => vehicles.add(formData),
        onSuccess: (res) => {
            queryClient.setQueryData(['vehicles'], (oldData) => {
                if (!oldData || !oldData.data || !oldData.data.vehicles) {
                    return { ...oldData, data: { ...oldData?.data, vehicles: [res.data.vehicle], }, };
                }
                return { ...oldData, data: { ...oldData.data, vehicles: [res.data.vehicle, ...oldData.data.vehicles], }, };
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
            <button type='button' onClick={toggleModal} className={`btn btn-soft-primary ${className}`}>
                <i className="ri-add-line align-bottom me-1"></i> 
                <span>New Vehicle</span>
            </button>
            
            <Modal className="fade" centered={true} backdrop="static" show={status} onHide={toggleModal} style={{ zIndex: 9999 }}>
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