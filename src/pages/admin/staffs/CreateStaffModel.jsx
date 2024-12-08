import { Modal, Row, Col } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModalHandler } from "../../../helper/custom_hook";
import { staff, role } from "../../../helper/api_url";
import { swal } from "../../../helper/swal";
import CustomSelect from "../../../components/CustomSelect";
import { useEffect, useState } from "react";

const CreateStaffModel = ({ className }) => {
	const { status, toggleModal } = useModalHandler();
	const queryClient = useQueryClient();
	const genders = [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }]
	const currentDate = new Date().toISOString().split('T')[0];
	const [selectedDate, setSelectedDate] = useState(currentDate);
	const handleDateChange = (event) => setSelectedDate(event.target.value);
	const [isLoading, setIsLoading] = useState(true);
	const mutation = useMutation({
		mutationFn: (formData) => staff.add(formData),
		onSuccess: (res) => {
		  queryClient.setQueryData(['users'], (oldData) => {
			// If no old data exists, initialize with the new user
			if (!oldData || !oldData.data || !oldData.data.users) {
			  return {...oldData,data: {...oldData?.data,users: [res.data.user],},};
			}
			// If old data exists, append the new user
			return {...oldData,data: {...oldData.data,users: [res.data.user, ...oldData.data.users],},};
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
	// fetching and caching Roles
	const { data: roles = [], isLoading: rolesLoading, isError: isRoleError, error: roleError } = useQuery({
		queryKey: ['role'],
		queryFn: () => role.list(),
		select: (res) => res.data.roles,
		staleTime: 20 * 60 * 1000,
		gcTime: 20 * 60 * 1000
	})
	// loading and error handling
	useEffect(() => {
		setIsLoading(rolesLoading)
		if (isRoleError) {
			const error = roleError.response ? roleError.response.data.message : roleError.message
			swal.error(error)
		}
	}, [roles]);
	return (
		<>
			<button onClick={toggleModal} className={`btn btn-soft-primary ${className}`}>
				<i className="bx bx-plus align-middle me-1"> </i>Create New staff
			</button>
			<Modal className="fade" size="md" centered backdrop="static" show={status} onHide={toggleModal} >
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter"> Create New Staff </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={e => handleSubmit(e)}>
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
								<CustomSelect
									name="role_id"
									options={roles.map(f => ({ label: `${f?.name}`, value: f.id }))}
									isSearchable
									placeholder='search user Role'
								/>

							</div>
							<div className="col-6">
								<label htmlFor="genderInput" className="form-label">Gender</label>
								<select id="genderInput" name='gender' defaultValue='male' className='form-control'>
									{genders.length ? genders.map((gender, idx) => (
										<option key={idx} value={gender.value}>{gender.label}</option>
									)) : (<option disabled >No Gender Found</option>)}
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
									<input type="email" className="form-control" id="emailInput" name='email' placeholder="Enter your email" />
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
									<button type="submit" className="btn btn-primary"> Save </button>
								</div>
							</div>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CreateStaffModel;
