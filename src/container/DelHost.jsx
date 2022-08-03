import { IconAlertTriangle } from "@tabler/icons"
import { Button, Col, Modal, Row } from "react-bootstrap"
import { TOKEN, URI, zbx } from "../apis/zbx"

const DelHost = ({ hostid, show, onHide }) => {
    const reload = () => window.location.reload()
    const handleSubmit = async () => {
        try {
            await zbx.post(URI, {
                jsonrpc: '2.0',
                method: 'host.delete',
                params: [ hostid ],
                id: 1,
                auth: TOKEN
            })
            onHide(true)
            reload()
        } catch (err) {
            console.log(err)
        }
    }
    
    return(
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            centered
        >
            <div className="modal-status bg-danger"></div>
            <Modal.Body className="text-center py-4">
                <IconAlertTriangle
                    color="red"
                    style={{ width: 56, height: 56 }}
                />
                <h3>Are you sure?</h3>
                <div className="text-muted">If you proceed, you will delete this host</div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-100">
                    <Row>
                        <Col>
                            <Button variant="light" className="btn w-100" onClick={() => onHide(false)}>Cancel</Button>
                        </Col>
                        <Col>
                            <Button variant="danger" className="btn w-100" onClick={() => handleSubmit()}>Yes, delete host</Button>
                        </Col>
                    </Row>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default DelHost