import React from 'react'

function DataLoading() {
  return (
    <div className=" flex-column d-flex bg-light bg-opacity-50 rounded align-items-center justify-content-center p-5">
        <lord-icon
            src="https://cdn.lordicon.com/aqrzgjfy.json"
            trigger="loop"
            state="loop-oscillate"
            colors="primary:#f06548,secondary:#f7b84b"
            style={{width:"112px",height:"112px"}}>
        </lord-icon>
        <h3 className='mt-3 text-warning'>Loading . Please Wait...</h3>
    </div>
  )
}

export default DataLoading