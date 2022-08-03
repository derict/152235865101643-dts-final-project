import { Button, Form, Modal } from "react-bootstrap"
import { TOKEN, URI, zbx } from "../apis/zbx"

const AddHost = ({ show, onHide }) => {
    const reload = () => window.location.reload()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const hostname = data.get('hostname')

        try {
            await zbx.post(URI, {
                jsonrpc: '2.0',
                method: 'host.create',
                params: {
                    host: hostname,
                    interfaces: [{
                        "type": 1,
                        "main": 1,
                        "useip": 0,
                        "ip": "",
                        "dns": hostname,
                        "port": "10050"
                    }],
                    groups: [{ "groupid": "19" }],
                    templates: [{ "templateid": "10186" }]
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
            <div className='modal-status bg-success'></div>
            <Modal.Header>
                <Modal.Title>Add a New Host</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Label>Hostname</Form.Label>
                    <input name="hostname" type="text" className="form-control" placeholder="example.com / 8.8.8.8" required />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" className="me-auto" onClick={() => onHide(false)}>Cancel</Button>
                    <button type="submit" className="btn btn-primary">Create Host</button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddHost