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

function Vehicles() {
    const dispatch = useDispatch();
    const [listData,setListData] = useState([]);
    const [dataLoading,setDataLoading] = useState(true);
    useEffect(()=>{
        setDataLoading(true);
        vehicles.list().then(res=>setListData(res.data.vehicles))
        .catch(err=>swal.error(err.response?err.response.data.message:err.message));
    },[]);
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
                    <UpdateVehicleModal data={row} listData={listData} setListData={setListData} />
                    <Button onClick={()=>handleListDataDelete(cell.row.original)} className="btn btn-sm btn-soft-danger me-1" >
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
                            <UpdateVehicleModal data={row} listData={listData} setListData={setListData} />
                            <button onClick={()=>handleListDataDelete(row)} className="btn btn-sm btn-soft-danger me-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                        </div>
                    </div>
                </div>
                )
            }
          }
    ]);
    const handleListDataDelete = (vehichle) =>{
        Swal.fire({
            title: "Are you sure ?",
            text:" You want to delete this User : " + vehichle.number,
            icon:'warning',
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `No`
        }).then((result)=>{
            if (result.isConfirmed) {
                dispatch(setPreloader({loader:true,message:'Deleting vehicle please wait'}))
                vehicles.delete(vehichle.id)
                .then(res=>{
                    setListData([...listData.filter(ld=>ld.id!=vehichle.id)])
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
    return (
    <>
        <BreadCrumb title="Vehicles" prevPage="Home" prevPath="/dashboard" />
        <Row>
            <Col xs={12}>
                <Card>
                    <CardHeader className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title mb-0">Vehicle List</h5>
                        <NewVehicleModal listData={listData} setListData={setListData}/>
                    </CardHeader>
                    <CardBody className="">
                        <TableResponsive isLoading={dataLoading} columns={columns} data={listData}  />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </>
    )
}

export default Vehicles