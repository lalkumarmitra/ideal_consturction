import React from 'react'
import { Link } from 'react-router-dom'
function Error404() {
  return (
    <div className="container">
        <div className="row">
            <div class="col-lg-12">
                <div class="text-center pt-4">
                    <div class="">
                        <img src="assets/images/error.svg" alt="" class="error-basic-img move-animation" />
                    </div>
                    <div class="mt-n4">
                        <h1 class="display-1 fw-medium">404</h1>
                        <h3 class="text-uppercase">Sorry, Page not Found 😭</h3>
                        <p class="text-muted mb-4">The page you are looking for not available!</p>
                        <Link to="/" class="btn btn-success"><i class="mdi mdi-home me-1"></i>Back to home</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Error404