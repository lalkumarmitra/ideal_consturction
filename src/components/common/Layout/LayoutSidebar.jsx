import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { authenticatedRoutes } from "../../../routes";
import SimpleBar from "simplebar-react";

function LayoutSidebar() {
  const ref = useRef();

  useEffect(() => {
    ref.current.recalculate();
  });
  const handleClickOnNavLink = () =>{
    document.getElementsByTagName('body')[0].classList.remove('vertical-sidebar-enable');
  }
  const generateSidebar = type =>{
    return authenticatedRoutes.map((route, idx) => {
      return route.type === type && (
        route.children.length 
        ? (<li className="nav-item w-100" key={idx}>
            <a className="nav-link menu-link" href={`#drpdwnid-${idx}`} data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls={`drpdwnid-${idx}`}>
              <i className={route.icon}></i>{" "}
              <span data-key={`t-${route.label}`}>{route.label}</span>
            </a>
            <div className="collapse menu-dropdown" id={`drpdwnid-${idx}`}>
              <ul className="nav nav-sm flex-column">
                {route.children.map((child, id) => (
                  <li className="nav-item w-100" key={id}>
                    <NavLink to={child.path} className="nav-link" onClick={handleClickOnNavLink} data-key={`t-${child.label}`}><span className="ps-2">{child.label}</span></NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>) 
        : (<li className="nav-item w-100" key={idx}>
            <NavLink to={route.path} className="nav-link menu-link" onClick={handleClickOnNavLink} role="button"><i className={route.icon}></i> <span data-key={`t-${route.label}`}>{route.label}</span></NavLink>
          </li>)
      ) 
    })
  }
  return (
    <div className="app-menu navbar-menu">
      <div className="navbar-brand-box">
        <Link to="/" className="logo logo-dark">
          <span className="logo-sm"><img src="assets/images/logo-sm.png" alt="" height="22" /></span>
          <span className="logo-lg"><img src="assets/images/logo-dark.png" alt="" height="90" /></span>
        </Link>

        <Link to="/" className="logo logo-light">
          <span className="logo-sm"><img src="assets/images/logo-sm.png" alt="" height="22" /></span>
          <span className="logo-lg"><img src="assets/images/logo-light.png" alt="" height="90" /></span>
        </Link>
        <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
          <i className="ri-record-circle-line"></i>
        </button>
      </div>

      <SimpleBar ref={ref} id="scrollbar" style={{ maxHeight: "calc(100vh - 130px)" }}>
        <Container fluid>
          <div id="two-column-menu"></div>
          <ul className="navbar-nav" id="navbar-nav" data-simplebar>
            <li className="menu-title w-100"><span data-key="t-menu">Menu</span></li>
            {generateSidebar('menu')}
            <li className="menu-title w-100"><i className="ri-more-fill"></i><span data-key="t-pages">Modules</span></li>
            {generateSidebar('module')}
            <li className="menu-title w-100"><i className="ri-more-fill"></i><span data-key="t-components">Settings</span></li>
            {generateSidebar('setting')}
          </ul>
        </Container>
      </SimpleBar>
      <div className="sidebar-background"></div>
    </div>
  );
}

export default LayoutSidebar;
