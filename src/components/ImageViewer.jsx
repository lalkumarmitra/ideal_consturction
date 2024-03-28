import React, { useState } from 'react'
import { Card, CardImg, Modal } from 'react-bootstrap'
import { useModalHandler } from '../helper/custom_hook';

function ImageViewer(prop) {
    const {toggleModal,status} = useModalHandler()
    return (
        <>
            <div onClick={toggleModal} className={prop.className}> {prop.children} </div>
            <Modal className="fade" centered={true} show={status} onHide={toggleModal} size='xl'>
                <Card className='mb-0'>
                    <Card.Body>
                        <CardImg src={prop.image} style={{ aspectRatio: '16/9', objectFit: 'contain', height: 'auto' }} alt="issue screenshot" />
                    </Card.Body>
                </Card>
            </Modal>
        </>
    )
}

export default ImageViewer