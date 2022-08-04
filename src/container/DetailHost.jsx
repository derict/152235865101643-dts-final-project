import { Col, Modal, Row } from "react-bootstrap"
import GraphItem from "../component/GraphItem"

const DetailHost = ({ show, onHide, dataItem, name, hostid }) => {

    const normalize = (key, data) => {
        if(key === 'icmpping'){
            if(data === '1'){ return 'normal'}
            else{ return 'timeout'}
        }
        if(key === 'icmppingloss'){
            return parseInt(data) +'%'
        }
        if(key === 'icmppingsec'){
            return parseInt(data * 1000) +' ms'
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size='lg'
        >
            <div className="modal-status bg-primary"></div>
            <Modal.Header>
                <div className="text-muted">{name}</div>
                <Modal.Title>
                    Detail Host
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <strong>
                    <Row className='text-center'>
                        <Col>Sensor</Col>
                        <Col>LastValue</Col>
                        <Col>PreviousValue</Col>
                    </Row>
                </strong>
                {
                    dataItem.map(data => (
                        <Row  key={hostid * Math.random()} className="text-muted">
                            <Col lg={4}>
                                {data?.name}
                            </Col>
                            <Col lg={4} className='text-center'>
                                {normalize(data?.key_, data?.lastvalue)}
                            </Col>
                            <Col lg={4} className='text-center'>
                                {normalize(data?.key_, data?.prevvalue)}
                            </Col>
                        </Row>
                    ))
                }
                <Row className="mt-5">
                    <GraphItem itemid={dataItem[2]?.itemid} />
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <strong>Last Update:</strong> {Date(dataItem[0]?.lastclock * 1000).toLocaleString()}
            </Modal.Footer>
        </Modal>
    )
}

export default DetailHost