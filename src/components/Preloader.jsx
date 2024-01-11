import React from 'react'

function Preloader({title = 'Please Wait ...'}) {
  return (
    <div className="d-flex position-fixed top-0 start-0 end-0 bottom-0 justify-content-center align-items-center" style={{zIndex:1000000,background:'rgba(64,81,137,0.4)',backdropFilter:'blur(4px)'}}>
        <div className='text-center'>
            <h4 className="text-dark">{title}</h4>
        </div>
    </div>
  )
}

export default Preloader