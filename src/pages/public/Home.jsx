import React from "react";
import Layout from "../../components/common/Layout/Layout";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Starter</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Starter</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Home;
