import React from "react";
import LayoutHeader from "./LayoutHeader";
import LayoutSidebar from "./LayoutSidebar";
import LayoutFooter from "./LayoutFooter";
import { Container } from "react-bootstrap";

const Layout = (prop) => {
  const handleClickOnOverlay = () =>{
    document.getElementsByTagName('body')[0].classList.remove('vertical-sidebar-enable');
  }
  return (
    <>
      <div id="layout-wrapper">
        <LayoutHeader />
        <LayoutSidebar />
        <div onClick={handleClickOnOverlay} className="vertical-overlay"></div>
        <div className="main-content">
          <div className="page-content">
            <Container fluid >{prop.children}</Container>
          </div>
          <LayoutFooter />
        </div>
      </div>
    </>
  );
};

export default Layout;
