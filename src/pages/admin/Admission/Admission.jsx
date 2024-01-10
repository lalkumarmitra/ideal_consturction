import React, { useMemo } from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { Card, CardBody, CardHeader, Col, Row, Button, UncontrolledTooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { TableResponsive } from "../../../components/common/TableResponsive";
function Admission() {
  const data = [
    {
      
      "show": {
        "id": 44813,
        "url": "http://www.tvmaze.com/shows/44813/the-snow-spider",
        "name": "The Snow Spider",
        "type": "Scripted",
        "language": "English",
        "genres": [
          "Drama",
          "Fantasy"
        ],
        "status": "In Development",
        "runtime": 30,
        "premiered": null,
        "officialSite": null,
        "schedule": {
          "time": "",
          "days": [

          ]
        }
      }
    },
  ]


  const columns = useMemo(
    () => [

      {
        Header: "Language",
        accessor: "show.language",
        HeaderClass:'',
        DataClass:'',

      },
      {
        Header: "Genre(s)",
        accessor: "show.genres",
      },
      {
        Header: "Runtime",
        accessor: "show.runtime",
        addClass:'bg-primary text-center'
      },
      {
        Header: "Status",
        accessor: "show.status",
        
      },
      {
        Header: "Action",
        HeaderClass:'text-center',
        DataClass:'text-center',
        Cell: (row) => {
          return ( 
            <Button className="btn btn-sm btn-soft-info" >
              <i className="mdi mdi-eye-outline" /> button 
            </Button>
          )
        },
        getProps: (state, rowInfo, column) => {
          // You can conditionally apply a className based on rowInfo or other conditions
          return {
            className: 'text-center', // or any other className you want to apply
          };
        },
      }
    ],

    []
  );



  return (
    <>
      <BreadCrumb title="Admission" prevPage="Dashboard" prevPath="/dashboard" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex align-items-center justify-content-between">
              <h5 className="card-title mb-0">Candidate List</h5>
              <button type="button" className="btn btn-soft-success add-btn waves-effect" data-bs-toggle="modal" id="create-btn" data-bs-target="#add_staff_model">
                <i className="ri-add-line align-bottom me-1"></i>
                <span>New Admission</span>
              </button>
            </CardHeader>
            <CardBody className="">
              <TableResponsive
                columns={columns} data={data}
              />
            </CardBody>
           
          </Card>
        </Col>
      </Row>
      <div className="customizer-setting">
        <button
          className="btn-success btn-rounded shadow-lg btn btn-icon btn-lg"
          style={{ padding: "28px", borderRadius: "90px" }}
        >
          <i className="mdi mdi-account-plus-outline fs-22"></i>
        </button>
      </div>
    </>
  );
}

export default Admission;
