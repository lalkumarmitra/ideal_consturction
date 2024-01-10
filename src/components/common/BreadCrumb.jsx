import React from 'react'
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
function BreadCrumb({title,prevPage=null,prevPath=null}) {
  return (
    <Row>
        <Col>
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">{title}</h4>

                <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                    <Link to={prevPath === null ? '/':prevPath}>{prevPage === null ? 'Home' : prevPage}</Link>
                    </li>
                    <li className="breadcrumb-item active">{title}</li>
                </ol>
                </div>
            </div>
        </Col>
    </Row>
  )
}

export default BreadCrumb;