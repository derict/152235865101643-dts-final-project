import { IconPlus } from "@tabler/icons"
import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useAuthState } from "react-firebase-hooks/auth"
import { TOKEN, URI, zbx } from "../apis/zbx"
import ItemCard from "../component/ItemCard"
import { auth } from "../config/firebase"
import AddHost from "./AddHost"

const Home = () => {
    const [dataHost, setDataHost] = useState([])
    const [user] = useAuthState(auth)

    const [addNew, setAddNew] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await zbx.post(URI, {
                    jsonrpc: '2.0',
                    method: 'host.get',
                    params: {
                        output: ["name", "hostid"],
                        groupids: "19"
                    },
                    id: 1,
                    auth: TOKEN
                })
                setDataHost(fetchedData.data.result)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="page-body">
                <Container variant='xl' className="d-flex flex-column justify-content-center">
                    <div className="page-header d-print-none">
                        <Row className="g-2 align-items-center">
                            <Col>
                                <div className="page-title">PINGs</div>
                                <div className="text-muted mt-1">{dataHost.length} host</div>
                            </Col>
                            <Col xs={12} md="auto" className="ms-auto d-print-none">
                                <div className="d-flex">
                                    <div className="me-3">
                                    </div>
                                    {user ? <Button variant="primary" onClick={() => setAddNew(true)}><IconPlus />Add Host</Button> : <></>}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="page-body">
                        <Row className="row-cards">
                            {
                                dataHost.map(data => (
                                    <ItemCard key={data.hostid} hostid={data.hostid} name={data.name}/>
                                ))
                            }
                        </Row>
                    </div>
                </Container>
            </div>
            <AddHost
                show={addNew}
                onHide={() => setAddNew(false)}
            />
        </>
    )
}

export default Home