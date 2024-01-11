import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center mt-sm-5 mb-4 text-white-50">
              <div><Link to="/" className="d-inline-block auth-logo"><img src="assets/images/logo-light.png" alt="" height="120" /></Link></div>
              <p className="mt-3 fs-15 fw-medium">{" "} Login To Ideal Construction Dashboard </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card mt-4">
              <div className="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Forgot Password?</h5>
                  <p class="text-muted">Reset password using Email</p>
                  <lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" class="avatar-xl"></lord-icon>
                </div>

                <div class="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                  Enter your email and instructions will be sent to you!
                </div>
                <div class="p-2">
                  <form>
                    <div class="mb-4">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" id="email" placeholder="Enter Email" />
                    </div>

                    <div class="text-center mt-4">
                      <button class="btn btn-success w-100" type="submit"> Send Reset Link</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
                <p className="mb-0">Wait, I remember my password... <Link to='/login' class="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
