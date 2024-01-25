import { Row,Col } from "react-bootstrap";

const Modal_profile_image = ({ viewimage }) => {
    return (
        <Row className='my-2 mb-3'>
            <Col lg="4" xs={4} className=' mx-auto text-center'>
                <img src={viewimage} alt='Not image' style={{ width: "100px", aspectRatio: '1/1', objectFit: 'cover', height: "100px", borderRadius: "50%" }} />
            </Col>
        </Row>
    );
}

export default Modal_profile_image;