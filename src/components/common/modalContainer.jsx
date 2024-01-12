import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'


function ModalContainer(props) {
    const [status,setStatus] = useState(false);
    const handleClick = () => setStatus(!status);
    
  return (
    <>
        <button onClick={handleClick} className='btn btn-soft-success add-btn waves-effect'>
            <i className={props.btnClassName??"ri-add-line align-bottom me-1"}></i> 
            <span>{props.buttonLabel??'button'}</span>
        </button>
        <Modal className="fade" centered={true} backdrop="static" show={status} onHide={handleClick}>
            <Modal.Header closeButton>
                <Modal.Title><h5>{props.title}</h5></Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    </>
  )
}

export default ModalContainer