import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from '../../../components/common/BreadCrumb'
import { Row, Col, Card, CardHeader, CardBody, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { client } from '../../../helper/api_url';
import { TableResponsive } from '../../../components/common/TableResponsive';
import { NewClientModal } from '../../../components/common/modal';
import { swal } from '../../../helper/swal';
import Swal from 'sweetalert2';
import { setPreloader } from '../../../features/Ui/uiSlice';
function Clients() {
    const dispatch = useDispatch();
    const [clientData,setClientData] = useState([]);
    useEffect(()=>{
        client.list().then(res=>setClientData(res.data.clients))
    },[]);
    const handleClientDelete = clientRow =>{
        Swal.fire({
            title: "Are you sure ?",
            text:" You want to delete this Client : " + clientRow.name,
            icon:'warning',
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `No`
        }).then((result)=>{
            if (result.isConfirmed) {
                dispatch(setPreloader({loader:true,message:'Deleting Item please wait'}))
                client.delete(clientRow.id)
                .then(res=>{
                    setClientData([...clientData.filter(i=>i.id!=clientRow.id)])
                    dispatch(setPreloader({loader:false,message:""}))
                    swal.success(res.data.message);
                })
                .catch(err=>{
                    dispatch(setPreloader({loader:false,message:""}))
                    swal.error(err.response ? err.response.data.message : err.message);
                })
            }
        })
    }
    const columns = useMemo(()=>[
        {
            Header: "Name",
            accessor: "name",
            HeaderClass:'',
            DataClass:'',
            Cell:(cell)=> {
                const imageUrl = `https://idealconstruction.online/application/${cell.row.original.image}`;
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
              return ( 
                <div className="">
                    <Button className="btn btn-sm btn-soft-primary me-1" >
                        <i className="ri-eye-fill" /> 
                    </Button>
                    <Button className="btn btn-sm btn-soft-success me-1" >
                        <i className="ri-pencil-fill" />  
                    </Button>
                    <Button onClick={()=>handleClientDelete(cell.row.original)} className="btn btn-sm btn-soft-danger me-1" >
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
                const imageUrl = `https://idealconstruction.online/application/${row.image}`;
                return (
                <div className="d-flex">
                    <img className="me-2 rounded-circle header-profile-user" src={imageUrl} alt="User Avatar" />
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
                            <button className="btn btn-sm btn-soft-success me-1" data-id="1"> <i className="ri-pencil-fill"></i></button>
                            <button onClick={()=>handleClientDelete(row)} className="btn btn-sm btn-soft-danger me-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                        </div>
                    </div>
                </div>
                )
            }
        }
    ]);
    return (
        <>
            <BreadCrumb title="Clients/Locations" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Client/Location List</h5>
                            <NewClientModal clientData={clientData} setClientData={setClientData} />
                        </CardHeader>
                        <CardBody className="">
                            <TableResponsive customPageSize={8} columns={columns} data={clientData}  />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Clients