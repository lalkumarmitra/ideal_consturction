import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from "../../../components/common/BreadCrumb";
import { useDispatch } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { TableResponsive } from "../../../components/common/TableResponsive";
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import { ASSET_URL, staff } from '../../../helper/api_url';
import { swal } from '../../../helper/swal';
import { Switch } from 'antd';
import { UpdateStaffModal } from './update';
import { ViewStaffModal } from './view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CreateStaffModel from './CreateStaffModel';
function Staffs() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);
    const { data: users = [], isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => staff.list(),
        staleTime: 20 * 60 * 1000,
        gcTime: 20 * 60 * 1000,
        select: (data) => data.data.users
    });
    useEffect(() => {
        if (isError) swal.error(error.response ? error.response.data.message : error.message)
    }, [isError, error])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setPreloader({ loader: true, message: 'Please wait ... ' }));
                staff.delete(id).then(() => {
                    queryClient.setQueryData(['users'], (oldData) => {
                        if (!oldData || !oldData.data || !oldData.data.users) {
                            return oldData;
                        }
                        return { ...oldData, data: { ...oldData.data, users: oldData.data.users.filter((u) => u.id !== id), }, };
                    });
                }).catch((err) => {
                    Swal.fire({ title: 'Error', text: err.response ? err.response.data.message : err.message, icon: 'error', });
                }).finally(() => { dispatch(setPreloader({ loader: false, message: "" })); });
            }
        });
    };

    const handleUserStateChange = (user) => {
        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('status_type', 'is_active');
      
        queryClient.setQueryData(['users'], (oldUsers) =>
          oldUsers.map((u) => (u.id === user.id ? { ...u, changing: true } : u))
        );
      
        staff.changeStatus(formData)
          .then((res) => {
            queryClient.setQueryData(['users'], (oldUsers) =>
              oldUsers.map((u) =>
                u.id === user.id ? { ...u, is_active: res.data.user.is_active, changing: false } : u
              )
            );
          })
          .catch((err) => {
            swal.error(err.response?.data?.message || err.message);
            queryClient.setQueryData(['users'], (oldUsers) =>
              oldUsers.map((u) => (u.id === user.id ? { ...u, changing: false } : u))
            );
          });
      };
      
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "first_name",
            HeaderClass: '',
            DataClass: '',
            Cell: (cell) => {
                const imageUrl = ASSET_URL + cell.row.original.avatar;
                return (<span> <img className="me-2 rounded-circle header-profile-user" src={imageUrl} alt="User Avatar" />{cell.row.original.first_name} {cell.row.original.last_name}</span>)
            }
        },
        {
            Header: "Phone",
            accessor: "phone",
            HeaderClass: '',
            DataClass: '',
        },
        {
            Header: "Email",
            accessor: "email",
            HeaderClass: '',
            DataClass: '',
        },
        {
            Header: "Staff Type",
            accessor: "role.name",
            HeaderClass: 'text-center',
            DataClass: 'text-center',
        },
        {
            Header: "Status",
            HeaderClass: 'text-center',
            DataClass: 'text-center',
            Cell: (cell) => {
                return (<Switch
                    className={cell.row.original.is_active ? 'bg-primary' : ''}
                    loading={cell.row.original.changing ? true : false}
                    checkedChildren={(<span style={{ fontSize: "10px" }}>Active</span>)}
                    unCheckedChildren={(<span style={{ fontSize: "10px" }}>Deactive</span>)}
                    checked={cell.row.original.is_active}
                    onChange={() => handleUserStateChange(cell.row.original)}
                />)
            }
        },
        {
            Header: "Action",
            HeaderClass: 'text-center',
            DataClass: 'text-center',
            Cell: (cell) => {
                const row = cell.row.original;
                return (
                    <div className="">
                        <ViewStaffModal data={row} />

                        <UpdateStaffModal data={row} />
                        <Button onClick={() => handleDelete(cell.row.original.id, cell.row.original.first_name)} className="btn btn-sm btn-soft-danger me-1" >
                            <i className="ri-delete-bin-fill" />
                        </Button>
                    </div>
                )
            },
        },
        {
            Header: 'List',
            HeaderClass: 'd-none',
            DataClass: 'd-none',
            list: (row) => {
                const imageUrl = ASSET_URL + row.avatar;
                return (
                    <div className="d-flex">
                        <ViewStaffModal data={row}>
                            <img className="me-2 rounded-circle header-profile-user" src={imageUrl} alt="User Avatar" />
                        </ViewStaffModal>
                        <div className="flex-grow-1" data-id="1">
                            <h5 className="fs-13 mb-1">
                                <a href="#" className="link text-dark"></a>
                                <a href="#">{row.first_name} {row.last_name}</a>
                            </h5>
                            <p className="text-muted mb-0">{row.phone} | {row.email}</p>
                        </div>
                        <div className="flex-shrink-0">
                            <div>
                                <Switch
                                    className={row.is_active ? 'bg-primary me-2' : 'me-2'}
                                    loading={row.changing ? true : false}
                                    checked={row.is_active}
                                    onChange={() => handleUserStateChange(row)}
                                    checkedChildren={(<span style={{ fontSize: "10px" }}>Active</span>)}
                                    unCheckedChildren={(<span style={{ fontSize: "10px" }}>Deactive</span>)}
                                />
                                <UpdateStaffModal data={row} userData={userData} setUserData={setUserData} />
                                <button onClick={() => handleDelete(row.id, row.first_name)} className="btn btn-sm btn-soft-danger me-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    ], [users]);
    return (
        <>
            <BreadCrumb title="Staffs" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Staff List</h5>
                            <CreateStaffModel className="btn btn-soft-success" />
                        </CardHeader>
                        <CardBody className="">
                            <TableResponsive isLoading={isLoading} columns={columns} data={users} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Staffs