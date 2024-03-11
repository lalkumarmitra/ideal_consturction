import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from "../../../components/common/BreadCrumb"; 
import { TableResponsive } from "../../../components/common/TableResponsive";
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import { ASSET_URL, item } from '../../../helper/api_url';
import Swal from 'sweetalert2';
import { NewItemModal } from '../../../components/common/modal';
import { useDispatch } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { swal } from '../../../helper/swal';
import { UpdateItemModal } from './update';
import { ViewItemModal } from './view';
function Items() {
    const dispatch = useDispatch();
    const [itemData,setItemData] = useState([]);
    const [dataLoading,setDataLoading] = useState(true);
    useEffect(()=>{
        item.list().then(res=>setItemData(res.data.items))
        .catch(err=>swal.error(err.response?err.response.data.message:err.message))
        .finally(()=>setDataLoading(false));
    },[])
    const handleItemDelete = itemRow => {
        Swal.fire({
            title: "Are you sure ?",
            text:" You want to delete this Item/Product : " + itemRow.name,
            icon:'warning',
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `No`
        }).then((result)=>{
            if (result.isConfirmed) {
                dispatch(setPreloader({loader:true,message:'Deleting Item please wait'}))
                item.delete(itemRow.id)
                .then(res=>{
                    setItemData([...itemData.filter(i=>i.id!=itemRow.id)])
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
                const imageUrl =ASSET_URL+cell.row.original.image;
                return (<span> <img className="me-2 rounded-circle header-profile-user" src={imageUrl} alt="User Avatar" />{cell.row.original.name}</span>)
            }
        },
        {
            Header: "Rate",
            accessor: "rate",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Unit",
            accessor: "unit",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Description",
            accessor: "description",
            HeaderClass:'',
            DataClass:'',
        },
        {
            Header: "Action",
            HeaderClass:'text-center',
            DataClass:'text-center',
            Cell: (cell) => {
                const row=cell.row.original;
              return ( 
                <div className="">
                   <ViewItemModal data={row} />
                    <UpdateItemModal data={row} itemData={itemData} setItemData={setItemData} />
                    <Button onClick={()=>handleItemDelete(cell.row.original)} className="btn btn-sm btn-soft-danger me-1" >
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
                let description = row.description;
                let truncatedDescription = description.length > 20 ? description.substring(0, 20) + ' ...' : description;

                return (
                <div className="d-flex">
                    <ViewItemModal data={row}>
                    <img className="me-2 rounded-circle header-profile-user" src={imageUrl} alt="User Avatar" />
                    </ViewItemModal>
                    <div className="flex-grow-1" data-id="1">
                        <h5 className="fs-13 mb-1">
                            <a href="#" className="link text-dark"></a>
                            <a href="#">{row.name}</a>
                            <span className='text-muted ms-2'> <small>{truncatedDescription}</small> </span>
                        </h5>
                        <p className="text-muted mb-0">{row.rate} / {row.unit}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <div>
                            <UpdateItemModal data={row} itemData={itemData} setItemData={setItemData} />
                            <button onClick={()=>handleItemDelete(row)} className="btn btn-sm btn-soft-danger me-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                        </div>
                    </div>
                </div>
                )
            }
        }
    ])
    return (
        <>
            <BreadCrumb title="Items" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Item List</h5>
                            <NewItemModal itemData={itemData} setItemData={setItemData} />
                        </CardHeader>
                        <CardBody className="">
                            <TableResponsive isLoading={dataLoading} customPageSize={8} columns={columns} data={itemData}  />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Items