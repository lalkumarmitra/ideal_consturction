import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from "../../../components/common/BreadCrumb";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { TableResponsive } from "../../../components/common/TableResponsive";
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import { NewStaffModal } from './modal';

function Staffs() {
    const dispatch = useDispatch();
    const [userData,setUserData] = useState([]);
    const token = useSelector(state=>state.auth._token);
    useEffect(()=>{
        axios({ 
            url: "https://idealconstruction.online/application/api/users/type/staff", 
            method: "GET",
            headers: { Accept: "application/json", Authorization: 'Bearer '+token },
        }).then(res=>setUserData(res.data.data.users)).catch(e=>console.log(e.response?e.response.data.message:e.message))
    },[]);
    const columns = useMemo(()=>[
        {
            Header: "Name",
            accessor: "first_name",
            HeaderClass:'',
            DataClass:'',
            Cell:(cell)=> {
                const imageUrl = `https://idealconstruction.online/application/${cell.row.original.avatar}`;
                return (<span> <img className="me-2 rounded-circle header-profile-user" src={imageUrl} alt="User Avatar" />{cell.row.original.first_name} {cell.row.original.last_name}</span>)
            }
        },
        {
            Header: "Phone",
            accessor: "phone",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Email",
            accessor: "email",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Staff Type",
            accessor: "role.name",
            HeaderClass:'text-center',
            DataClass:'text-center',
        },
        {
            Header: "Action",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell: (cell) => {
              return ( 
                <div className="">
                    <Button className="btn btn-sm btn-soft-primary me-1" >
                        <i className="ri-eye-fill" /> 
                    </Button>
                    <Button className="btn btn-sm btn-soft-success me-1" >
                        <i className="ri-pencil-fill" />  
                    </Button>
                    <Button onClick={()=>handleUserDelete(cell.row.original.id,cell.row.original.first_name)} className="btn btn-sm btn-soft-danger me-1" >
                        <i className="ri-delete-bin-fill" />  
                    </Button>
                </div>
              )
            },
          },
          {
            Header:'List',
            HeaderClass:'d-none',
            DataClass:'d-none',
            list:(row)=>{
                const imageUrl = `https://idealconstruction.online/application/${row.avatar}`;
                return (
                <div className="d-flex">
                    <img className="me-2 rounded-circle header-profile-user" src={imageUrl} alt="User Avatar" />
                    <div className="flex-grow-1" data-id="1">
                        <h5 className="fs-13 mb-1">
                            <a href="#" className="link text-dark"></a>
                            <a href="#">{row.first_name} {row.last_name}</a>
                        </h5>
                        <p className="text-muted mb-0">{row.phone} | {row.email}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <div>
                            <button className="btn btn-sm btn-soft-success me-1" data-id="1"> <i className="ri-pencil-fill"></i></button>
                            <button onClick={()=>handleUserDelete(row.id,row.first_name)} className="btn btn-sm btn-soft-danger me-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                        </div>
                    </div>
                </div>
                )
            }
          }
    ]);
    const handleUserDelete = (userId,name) =>{
        Swal.fire({
            title: "Are you sure ?",
            text:" You want to delete this User : " + name,
            icon:'warning',
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `No`
        }).then((result)=>{
            if (result.isConfirmed) {
                dispatch(setPreloader({loader:true,message:'Deleting Staffs please wait'}))
                axios({
                    url: "https://idealconstruction.online/application/api/user/"+userId+"/destroy", 
                    method: "DELETE",
                    headers: { Accept: "application/json", Authorization: 'Bearer '+token },
                })
                .then(res=>{
                    setUserData([...userData.filter(user=>user.id!=userId)])
                    dispatch(setPreloader({loader:false,message:""}))
                    console.log(userData.length);
                    Swal.fire({
                        title: "success",
                        text: res.data.message,
                        icon: "success",
                        confirmButtonClass: "btn btn-primary w-xs mt-2",
                        showCloseButton: !0,
                    });
                })
                .catch(err=>{
                    dispatch(setPreloader({loader:false,message:""}))
                    Swal.fire({
                        title: "error",
                        text: err.response ? err.response.data.message : err.message,
                        icon: "error",
                        confirmButtonClass: "btn btn-primary w-xs mt-2",
                        showCloseButton: !0,
                    });
                })
            }
        })
    }
    return (
    <>
        <BreadCrumb title="Staffs" prevPage="Home" prevPath="/dashboard" />
        <Row>
            <Col xs={12}>
                <Card>
                    <CardHeader className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title mb-0">Staff List</h5>
                        <NewStaffModal userData={userData} setUserData={setUserData} />
                    </CardHeader>
                    <CardBody className="">
                        <TableResponsive columns={columns} data={userData} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </>
    )
}

export default Staffs