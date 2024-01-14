import React from 'react'
import { Link } from 'react-router-dom'
import errorImage from '../../assets/images/error.svg'
function Error404() {
  return (
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="text-center pt-4">
                    <div className="">
                        <img src={errorImage} alt="" className="error-basic-img move-animation" />
                    </div>
                    <div className="mt-n4">
                        <h1 className="display-1 fw-medium">404</h1>
                        <h3 className="text-uppercase">Sorry, Page not Found 😭</h3>
                        <p className="text-muted mb-4">The page you are looking for not available!</p>
                        <Link to="/" className="btn btn-success"><i className="mdi mdi-home me-1"></i>Back to home</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Error404