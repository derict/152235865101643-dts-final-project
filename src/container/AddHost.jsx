import { IconTemperaturePlus } from "@tabler/icons"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import { TOKEN, URI, zbx } from "../apis/zbx"

const AddHost = ({ show, onHide }) => {
    const [addResult, setAddResult] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const hostname = data.get('hostname')

        try {
            const fetchedData = await zbx.post(URI, {
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
            setAddResult(fetchedData.data.result)
            console.log(addResult)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='page page-center' style={{ minHeight: '30vh' }}>
                <div className='container-tight py-4'>
                    <div className='text-center mb-4'>
                        <IconTemperaturePlus
                            color="#206bc4"
                            style={{ width: 140, height: 140 }}
                        />
                    </div>
                    <form className="card card-md" onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="card-title text-center mb-4">Create New Monitoring</div>
                            <div className="mb-3">
                                <label className="form-label">Hostname</label>
                                <input name="hostname" type="text" className="form-control" placeholder="example.com / 8.8.8.8" required />
                            </div>
                            <div className="form-footer">
                                <button type="submit" className="btn btn-primary w-100">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default AddHost