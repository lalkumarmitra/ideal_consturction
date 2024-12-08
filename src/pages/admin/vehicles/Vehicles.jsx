import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from "../../../components/common/BreadCrumb";
import { useDispatch } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { TableResponsive } from "../../../components/common/TableResponsive";
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import { NewStaffModal, NewVehicleModal } from '../../../components/common/modal';
import { vehicles } from '../../../helper/api_url';
import { swal } from '../../../helper/swal';
import { Switch } from 'antd';
import { UpdateVehicleModal } from './update';
import { ViewVehicleModal } from './view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateVehiclesModel } from './CreateVehiclesModel';

function Vehicles() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { data: vehiclesdata = [], isLoading, isError, error } = useQuery({
        queryKey: ['vehicles'],
        queryFn: () => vehicles.list(),
        staleTime: 20 * 60 * 1000,
        gcTime: 20 * 60 * 1000,
        select: (data) => data.data.vehicles
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
                vehicles.delete(id).then(() => {
                    queryClient.setQueryData(['vehicles'], (oldData) => {
                        if (!oldData || !oldData.data || !oldData.data.vehicles) {
                            return oldData;
                        }
                        return { ...oldData, data: { ...oldData.data, vehicles: oldData.data.vehicles.filter((i) => i.id !== id), }, };
                    });
                }).catch((err) => {
                    Swal.fire({ title: 'Error', text: err.response ? err.response.data.message : err.message, icon: 'error', });
                }).finally(() => { dispatch(setPreloader({ loader: false, message: "" })); });
            }
        });
    };

    const columns = useMemo(()=>[
        {
            Header: "Number",
            accessor: "number",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Type",
            accessor: "type",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Status",
            accessor: "status",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell:(cell)=>{
                return (
                    <Switch 
                        className={cell.row.original.status == 'active' ?'bg-primary':''}
                        loading={cell.row.original.changing?true:false}
                        checked={cell.row.original.status == 'active'} 
                        onChange={()=>{}}
                    />
                )
            }
        },
        {
            Header: "Action",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell: (cell) => {
                const row=cell.row.original;
              return ( 
                <div className="">
                   <ViewVehicleModal data={row} />
                    {/* <UpdateVehicleModal data={row} listData={listData} setListData={setListData} /> */}
                    <Button onClick={()=>handleDelete(row.id)} className="btn btn-sm btn-soft-danger me-1" >
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
                return (
                <div className="d-flex">
                    <div className="flex-grow-1" data-id="1">
                        <h5 className="fs-13 mb-1">
                            <a href="#" className="link text-dark"></a>
                            <a href="#">{row.number} <span className='badge bg-primary'>{row.type}</span></a>
                        </h5>
                    </div>
                    <div className="flex-shrink-0">
                        <div>
                            <Switch 
                                className={row.status == 'active' ?'bg-primary me-2':'me-2'}
                                loading={row.changing?true:false}
                                checked={row.status == 'active'} 
                                onChange={()=>{}}
                            />

                            {/* <UpdateVehicleModal data={row} listData={listData} setListData={setListData} /> */}
                            <button onClick={()=>handleDelete(row.id)} className="btn btn-sm btn-soft-danger me-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                        </div>
                    </div>
                </div>
                )
            }
          }
    ],[vehiclesdata]);
 
    return (
    <>
        <BreadCrumb title="Vehicles" prevPage="Home" prevPath="/dashboard" />
        <Row>
            <Col xs={12}>
                <Card>
                    <CardHeader className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title mb-0">Vehicle List</h5>
                        <CreateVehiclesModel className="btn btn-soft-success"/>
                    </CardHeader>
                    <CardBody className="">
                        <TableResponsive isLoading={isLoading} columns={columns} data={vehiclesdata}  />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </>
    )
}

export default Vehicles