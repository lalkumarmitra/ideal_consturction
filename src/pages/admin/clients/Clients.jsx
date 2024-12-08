import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from '../../../components/common/BreadCrumb'
import { Row, Col, Card, CardHeader, CardBody, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { ASSET_URL, client } from '../../../helper/api_url';
import { TableResponsive } from '../../../components/common/TableResponsive';
import { swal } from '../../../helper/swal';
import Swal from 'sweetalert2';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { UpdateClientModal } from './update';
import { ViewClientModal } from './view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateClientModel } from './CreateClientModel';
function Clients() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { data: clients = [], isLoading, isError, error } = useQuery({
        queryKey: ['clients'],
        queryFn: () => client.list(),
        staleTime: 20 * 60 * 1000,
        gcTime: 20 * 60 * 1000,
        select: (data) => data.data.clients
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
                client.delete(id).then(() => {
                    queryClient.setQueryData(['clients'], (oldData) => {
                        console.log(oldData)
                        if (!oldData || !oldData.data || !oldData.data.clients) {
                            return oldData;
                        }
                        return { ...oldData, data: { ...oldData.data, clients: oldData.data.clients.filter((i) => i.id !== id), }, };
                    });
                }).catch((err) => {
                    Swal.fire({ title: 'Error', text: err.response ? err.response.data.message : err.message, icon: 'error', });
                }).finally(() => { dispatch(setPreloader({ loader: false, message: "" })); });
            }
        });
    };

    const columns = useMemo(()=>[
        {
            Header: "Name",
            accessor: "name",
            HeaderClass:'',
            DataClass:'',
            Cell:(cell)=> {
                const imageUrl =ASSET_URL+cell.row.original.image;
                return (<span> <img className="me-2 rounded-circle header-profile-user" src={imageUrl} alt="User Avatar" />{cell.row.original.name}</span>)
            }
            
        },
        {
            Header: "Address",
            accessor: "address",
            HeaderClass:'',
            DataClass:'',
            
        },
        {
            Header: "City / State",
            accessor: "city",
            HeaderClass:'',
            DataClass:'',
            Cell:(cell)=>{
                return `${cell.row.original.city} ${cell.row.original.state}`;
            }
            
        },
        {
            Header: "PIN ",
            accessor: "pin",
            HeaderClass:'',
            DataClass:'',
            
        },
        {
            Header: "Type ",
            accessor: "",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell: (cell) => cell.row.original.client_type == 'sender'
            ?(<span className='badge bg-primary p-1'>Loading Point</span>)
            :(<span className='badge bg-success p-1'>UnLoading Point</span>)
            
        },
        {
            Header: "Action",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell: (cell) => {
                const row=cell.row.original;
              return ( 
                <div className="">
                   <ViewClientModal data={row} />
                   {/* <UpdateClientModal data={row} clientData={clientData} setClientData={setClientData} /> */}
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
                const imageUrl =ASSET_URL+row.image;
                return (
                <div className="d-flex">
                    <ViewClientModal data={row}>
                    <img className="me-2 rounded-circle header-profile-user" src={imageUrl} alt="User Avatar" />
                    </ViewClientModal>
                    <div className="flex-grow-1" data-id="1">
                        <h5 className="fs-13 mb-1">
                            <a href="#" className="link text-dark"></a>
                            <a href="#">{row.name}</a>
                            {row.client_type == 'sender'
                                ?(<span className='badge bg-primary p-1 ms-2'>Loading Point</span>)
                                :(<span className='badge bg-success p-1 ms-2'>UnLoading Point</span>)
                            }
                        </h5>
                        <p className="text-muted mb-0">{row.address} | {row.city} | {row.district} {row.state} ({row.pin})</p>

                    </div>
                    <div className="flex-shrink-0">
                        <div>
                        {/* <UpdateClientModal data={row} clientData={clientData} setClientData={setClientData} /> */}
                            <button onClick={()=>handleDelete(row.id)} className="btn btn-sm btn-soft-danger me-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                        </div>
                    </div>
                </div>
                )
            }
        }
    ],[clients]);
    return (
        <>
            <BreadCrumb title="Clients/Locations" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Client/Location List</h5>
                            <CreateClientModel className="btn btn-soft-success"/>
                        </CardHeader>
                        <CardBody className="">
                            <TableResponsive isLoading={isLoading} customPageSize={8} columns={columns} data={clients}  />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Clients