import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setPreloader } from "../../features/Ui/uiSlice";
import { authenticate } from "../../features/Auth/authSlice";
import { swal } from "../../helper/swal";


function Login() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(setPreloader({loader:true,message:'Logging In please wait'}));
    e.preventDefault();
    let formData = new FormData(e.target);
    axios({ 
      url: "https://idealconstruction.online/application/api/login", 
      method: "POST",
      headers: { Accept: "application/json" },
      data: formData,
    })
    .then((res) => {
      dispatch(setPreloader({loader:false,message:''}))
      localStorage.setItem('_token',res.data._token);
      dispatch(authenticate({_token:res.data._token,_user:res.data.data.user}))
    })
    .catch((err) => {
      dispatch(setPreloader({loader:false,message:''}))
      swal.error(err.response ? err.response.data.message : err.message);
    });
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                {/* <Link to="/" className="d-inline-block logo logo-dark"> <img src="assets/images/logo-dark.png" alt="" height="120" /> </Link> */}
                <Link to="/" className="d-inline-block logo logo-light"> <img src="assets/images/logo-light.png" alt="" height="120" /> </Link>
              </div>
              <p className="mt-3 fs-15 fw-medium"> {" "} Login to Ideal Construction Dashboard </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card mt-4">
              <div className="card-body p-4">
                <div className="text-center mt-2">
                  <h5 className="text-primary">Welcome Back !</h5>
                  <p className="text-muted">Log in to continue .</p>
                  <lord-icon src="https://cdn.lordicon.com/kthelypq.json" trigger="loop" colors="primary:#0ab39c" class="avatar-md" ></lord-icon>
                </div>
                <div className="p-2">
                  <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label"> Email </label>
                      <input type="email" className="form-control" name="email" placeholder="Enter username" />
                    </div>

                    <div className="mb-5">
                      <div className="float-end">
                        <Link to="/passwordReset" className="text-muted"> Forgot password? </Link>
                      </div>
                      <label className="form-label" htmlFor="password-input"> Password </label>
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <input type="password" className="form-control pe-5 password-input" placeholder="Enter password" name="password" />
                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" >
                          <i className="ri-eye-fill align-middle"></i>
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="btn btn-success w-100" type="submit"> Log In{" "} </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="mb-0">
                Don't have an account ?
                <Link to="/" className="fw-semibold text-primary text-decoration-underline" >{" "} Enquire </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
