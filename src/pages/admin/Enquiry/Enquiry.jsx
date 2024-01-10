import React, { useMemo } from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { Card, CardBody, CardHeader, Col, Row, Button } from "react-bootstrap";
import { TableResponsive } from "../../../components/common/TableResponsive";
import jsondata from '../../../assets/csvjson.json';


function Enquiry() {
  const data = jsondata;
  const columns = useMemo(
    () => [

      {
        Header: "Name",
        accessor: "Name",
        HeaderClass:'',
        DataClass:'',

      },
      {
        Header: "Fathers Name",
        accessor: "Fathers_Name",
      },
      {
        Header: "Mobile No",
        accessor: "Mobile_No",
        addClass:'bg-primary text-center'
      },
      {
        Header: "Whatsapp",
        accessor: "Whatsapp_No",
        
      },
      {
        Header: "Address",
        accessor: "Address",
        HeaderClass:'text-center',        
      },
      {
        Header: "Action",
        HeaderClass:'text-center',
        DataClass:'text-center',
        Cell: (row) => {
          return ( 
            <div className="d-flex align-items-center justify-content-between">
            <Button className="btn btn-sm btn-soft-info me-1" >
              <i className="mdi mdi-eye-outline" /> 
            </Button>
            <Button className="btn btn-sm btn-soft-success me-1" >
              <i className="mdi mdi-eye-outline" />  
            </Button>
            <Button className="btn btn-sm btn-soft-danger me-1" >
              <i className="mdi mdi-eye-outline" />  
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
                        <a href="#">{row.Name}</a>
                    </h5>
                    <p className="born timestamp text-muted mb-0">{row.Mobile_No} | {row.Whatsapp_No}</p>
                </div>
                <div className="flex-shrink-0">
                    <div>
                        <button className="btn btn-sm btn-soft-success me-1" data-id="1"> <i className="ri-pencil-fill"></i></button>
                        <button className="btn btn-sm btn-soft-danger me-1" data-id="1"> <i className="ri-delete-bin-fill"></i> </button>
                    </div>
                </div>
            </div>
           )
        }
      }
    ],

    []
  );
  return (
    <>
      <BreadCrumb title="Enquiry" prevPage="Dashboard" prevPath="/dashboard" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex align-items-center justify-content-between">
              <h5 className="card-title mb-0">Enquiry List</h5>
              <button type="button" className="btn btn-soft-success add-btn waves-effect" data-bs-toggle="modal" id="create-btn" data-bs-target="#add_staff_model">
                <i className="ri-add-line align-bottom me-1"></i>
                <span>New Enquiry</span>
              </button>
            </CardHeader>
            <CardBody className="">
              <TableResponsive columns={columns} data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className="customizer-setting">
        <button className="btn-success btn-rounded shadow-lg btn btn-icon btn-lg" style={{ padding: "28px", borderRadius: "90px" }}>
          <i className="mdi mdi-account-plus-outline fs-22"></i>
        </button>
      </div>
    </>
  );
}
export default Enquiry;
