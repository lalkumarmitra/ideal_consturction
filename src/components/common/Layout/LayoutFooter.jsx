import React from "react";

function LayoutFooter() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <script>{new Date().getFullYear()}</script>© SAJAG.
          </div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Design & Develop by <a href="http://www.lalkumarmitra.web.app/" className="badge badge-soft-danger">Lal Kumar Mitra and Team</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LayoutFooter;
