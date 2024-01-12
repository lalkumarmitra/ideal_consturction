import React from 'react'
import './preloader_style.css'
function Preloader({title = 'Please Wait ...'}) {
  return (
    <div className="d-flex position-fixed top-0 start-0 end-0 bottom-0  justify-content-center align-items-center" style={{zIndex:1000000,background:'rgba(64,81,137,0.0)',backdropFilter:'blur(4px)',height:'100vh',width: '100%',flexDirection: 'column'}}>
        <div className='ring-parent'>
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <span className='text-dark'>Loading...</span>
        </div>
            <span className="text-dark fs-5" style={{ marginTop: '58px'}}>{title}</span>
    </div>
  )
}

export default Preloader