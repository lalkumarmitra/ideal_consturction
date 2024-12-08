import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from "../../../components/common/BreadCrumb"; 
import { TableResponsive } from "../../../components/common/TableResponsive";
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import { ASSET_URL, item } from '../../../helper/api_url';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPreloader } from '../../../features/Ui/uiSlice';
import { swal } from '../../../helper/swal';
import { UpdateItemModal } from './update';
import { ViewItemModal } from './view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateItemModel } from './CreateItemModel';
function Items() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { data: items = [], isLoading, isError, error } = useQuery({
        queryKey: ['items'],
        queryFn: () => item.list(),
        staleTime: 20 * 60 * 1000,
        gcTime: 20 * 60 * 1000,
        select: (data) => data.data.items
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
                item.delete(id).then(() => {
                    queryClient.setQueryData(['items'], (oldData) => {
                        console.log(oldData)
                        if (!oldData || !oldData.data || !oldData.data.items) {
                            return oldData;
                        }
                        return { ...oldData, data: { ...oldData.data, items: oldData.data.items.filter((i) => i.id !== id), }, };
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
                    {/* <UpdateItemModal data={row} itemData={itemData} setItemData={setItemData} /> */}
                    <Button onClick={()=>handleDelete(row?.id)} className="btn btn-sm btn-soft-danger me-1" >
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
                            {/* <UpdateItemModal data={row} itemData={itemData} setItemData={setItemData} /> */}
                            <button onClick={()=>handleDelete(row?.id)} className="btn btn-sm btn-soft-danger me-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                        </div>
                    </div>
                </div>
                )
            }
        }
    ],[items])
    return (
        <>
            <BreadCrumb title="Items" prevPage="Home" prevPath="/dashboard" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Item List</h5>
                            <CreateItemModel className="btn btn-soft-success" />
                        </CardHeader>
                        <CardBody className="">
                            <TableResponsive isLoading={isLoading} customPageSize={8} columns={columns} data={items}  />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Items