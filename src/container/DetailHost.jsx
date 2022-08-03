import { Col, Modal, Row } from "react-bootstrap"
import GraphItem from "../component/GraphItem"

const DetailHost = ({ show, onHide, dataItem, name }) => {
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
                    <Row>
                        <Col>Sensor</Col>
                        <Col>LastUpdate</Col>
                        <Col>LastValue</Col>
                        <Col>PreviousValue</Col>
                    </Row>
                </strong>
                {
                    dataItem.map(data => (
                        <Row className="text-muted">
                            <Col key={data.itemid} lg={3}>
                                {data.name}
                            </Col>
                            <Col key={data.itemid + '2'} lg={3}>
                                {data.lastclock}
                            </Col>
                            <Col key={data.itemid + '3'} lg={3}>
                                {data.lastvalue}
                            </Col>
                            <Col key={data.itemid + '4'} lg={3}>
                                {data.prevvalue}
                            </Col>
                        </Row>
                    ))
                }
                <Row>
                    <GraphItem itemid={dataItem[2].itemid} />
                </Row>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailHost