import { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { TOKEN, URI, zbx } from "../apis/zbx"

const EditHost = ({ show, onHide, hostid, name }) => {
    const reload = () => window.location.reload()

    const [hostInt, setHostInt] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await zbx.post(URI, {
                    jsonrpc: '2.0',
                    method: 'hostinterface.get',
                    params: {
                        output: ["dns"],
                        hostids: hostid
                    },
                    id: 1,
                    auth: TOKEN
                })
                setHostInt(fetchedData.data.result)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [hostid])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const hostname = data.get('hostname')
        try {
            await zbx.post(URI, {
                jsonrpc: '2.0',
                method: 'host.update',
                params: {
                    hostid: hostid,
                    host: hostname
                },
                id: 1,
                auth: TOKEN
            })

            await zbx.post(URI, {
                jsonrpc: '2.0',
                method: 'hostinterface.update',
                params: {
                    interfaceid: hostInt[0].interfaceid,
                    dns: hostname
                },
                id: 1,
                auth: TOKEN
            })
            onHide(true)
            reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <div className="modal-status bg-warning"></div>
            <Modal.Header>
                <Modal.Title>Edit Host</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Label>Hostname</Form.Label>
                    <input name="hostname" type="text" className="form-control" placeholder={name} required />
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-100">
                        <Row>
                            <Col>
                                <Button variant="light" className="btn w-100" onClick={() => onHide(false)}>Cancel</Button>
                            </Col>
                            <Col>
                                <button type="submit" className="btn btn-primary w-100">Save</button>
                            </Col>
                        </Row>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EditHost