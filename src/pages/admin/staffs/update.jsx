import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ASSET_URL, role, staff } from '../../../helper/api_url';
import { swal } from '../../../helper/swal';
import Modal_profile_image from '../../../components/common/modalProfile';
import { useModalHandler } from '../../../helper/custom_hook';
import CustomSelect from '../../../components/CustomSelect';

export function UpdateStaffModal({ data }) {
    const { status, toggleModal } = useModalHandler();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null); 
    const genders = [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' },];
    const mutation = useMutation({
        mutationFn: (formData) => staff.update(formData),
        onSuccess: (res) => {
            queryClient.setQueryData(['users'], (oldData) => {
                if (!oldData || !oldData.data || !oldData.data.users) {return oldData;}   
                return { ...oldData, data: { ...oldData.data, users: oldData.data.users.map((u) =>u.id === res.data.user.id ? res.data.user : u),},
                };
            });
            swal.success(res.data.message);
            toggleModal();
        },
        onError: (err) => {swal.error(err.response?.data?.message || err.message);},
    });
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (profileImage) {formData.append('avatar', profileImage); } 
        mutation.mutate(formData);
     };

    // Query for roles
    const { data: roles = [], isLoading: rolesLoading, isError: isRoleError, error: roleError } = useQuery({
        queryKey: ['role'],
        queryFn: () => role.list(),
        select: (res) => res.data.roles,
        staleTime: 20 * 60 * 1000,
        gcTime: 20 * 60 * 1000,
    });

    useEffect(() => {
        setIsLoading(rolesLoading);
        if (isRoleError) {
            const error = roleError.response?.data?.message || roleError.message;
            swal.error(error);
        }
    }, [rolesLoading, isRoleError, roleError]);

    return (
        <>
            <button onClick={toggleModal} className="btn btn-sm btn-soft-success me-1">
                <i className="ri-pencil-fill" />
            </button>
            <Modal className="fade" centered backdrop="static" show={status} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Update Staff</h5>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="row g-3">
                            {data.avatar && (
                                <div className="row">
                                    <Modal_profile_image viewimage={profileImage ? URL.createObjectURL(profileImage) : `${ASSET_URL}${data.avatar}`} />
                                    <div className="col-5 mx-auto">
                                        <input type="file"name="avatar" id="avatarInput" onChange={(e) => setProfileImage(e.target.files[0])}className="form-control"/>
                                    </div>
                                </div>
                            )}
                            <div className="col-6">
                                <input type="hidden" name="user_id" defaultValue={data.id} />
                                <label htmlFor="firstName" className="form-label">
                                    First Name
                                </label>
                                <input type="text"  className="form-control" id="firstName" name="first_name" defaultValue={data.first_name}placeholder="Enter firstname"/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name
                                </label>
                                <input type="text" className="form-control"id="lastName"  name="last_name" defaultValue={data.last_name} placeholder="Enter lastname"/>
                            </div>
                            <div className="col-lg-12">
                                <label htmlFor="genderInput" className="form-label">
                                    Gender
                                </label>
                                <select id="genderInput" name="gender" defaultValue={data.gender} className="form-control">
                                    {genders.map((gender, idx) => (
                                        <option key={idx} value={gender.value}>
                                            {gender.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="dob" className="form-label">
                                    Date Of Birth
                                </label>
                                <input type="date" id="dob" name="dob" defaultValue={data.dob} className="form-control" />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="role" className="form-label">
                                    Staff Type
                                </label>
                                <CustomSelect
                                    name="role_id"
                                    options={roles.map((role) => ({ label: role.name, value: role.id }))}
                                    defaultValue={{ value: data?.role?.id, label: data?.role?.name }}
                                    isSearchable 
                                    placeholder="Search user Role" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="passwordInput" className="form-label">
                                    Password
                                </label>
                                <input type="password" className="form-control" name="password" id="passwordInput" />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={toggleModal}>
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
