
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authenticatedRoutes, publicRoutes, authRoutes } from "./routes";
import './assets/css/bootstrap.min.css';
import './assets/css/icons.min.css';
import './assets/css/app.css';
import Layout from "./components/common/Layout/Layout";
import 'simplebar-react/dist/simplebar.min.css';
import Error404 from "./pages/Error/404";
import AuthLayout from "./components/Auth/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLayout, changeSideBar, updateScreenSize } from "./features/Layout/layoutSlice";
import Preloader from "./components/Preloader";
import { AuthMiddleWare, GuestMiddleware } from "./routes/routes";


const layoutChanger = s => {
  localStorage.setItem('layoutConfig',JSON.stringify(s))
  document.documentElement.dataset.layoutMode = s.layoutMode;
  document.documentElement.dataset.sidebar = s.sidebar;
  document.documentElement.dataset.topbar = s.topbar;
  document.documentElement.dataset.sidebarSize = s.sidebarSize;
  document.documentElement.dataset.preloader = s.preloader;
}
const screenSize = s => {
  let sizes = { sm:768, md:992, lg:1200 }
  return s>=sizes.md?'lg':(s<sizes.sm ?'sm':'md');
}
const setBodyClass = s =>{
  if(s==="lg" || s=="md") document.getElementsByTagName('body')[0].classList.remove('twocolumn-panel')
  else document.getElementsByTagName('body')[0].classList.add('twocolumn-panel')
}

function App() {
  const dispatch = useDispatch();
  const layoutStates = useSelector(state=>state.layout);
  const handleResize = () =>{
    const s = screenSize(window.innerWidth);
    setBodyClass(s);
    dispatch(updateScreenSize(s));
    if(s==='md') dispatch(changeSideBar('sm'))
    else dispatch(changeSideBar('lg'))
  }
  useEffect(()=>{
    let layoutconfiguraitons = localStorage.getItem('layoutConfig');
    if(layoutconfiguraitons && (layoutconfiguraitons !== JSON.stringify(layoutStates))) 
    dispatch(setLayout(JSON.parse(layoutconfiguraitons)));
  },[])
  useEffect(()=>{layoutChanger(layoutStates);},[layoutStates]);
  useEffect(()=>{
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  },[])

  const loader = useSelector(state=>state.ui);
  return (
    <>
      {loader.loader?(<Preloader title={loader.message} />):null}
      <BrowserRouter>
        <Routes>
          {authRoutes.map((route,idx)=>(<Route key={idx} path={route.path} element={(<GuestMiddleware><AuthLayout>{route.element}</AuthLayout></GuestMiddleware>)} />))}
          {publicRoutes.map((route, idx) => ( <Route path={route.path} element={(<GuestMiddleware>{route.element}</GuestMiddleware>)} key={idx} /> ))}

          {authenticatedRoutes.map((route, idx) => 
            route.children.length 
            ? route.children.map((child,id)=>(<Route path={child.path} element={(<AuthMiddleWare users={route.users}><Layout>{child.element}</Layout></AuthMiddleWare>)} key={id} />))
            : (<Route path={route.path} element={(<AuthMiddleWare users={route.users}><Layout>{route.element}</Layout></AuthMiddleWare>)} key={idx} />)
          )}
          <Route path="*" element={<AuthLayout><Error404/></AuthLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
