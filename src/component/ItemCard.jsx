import { IconArrowDown, IconArrowUp } from "@tabler/icons"
import { useEffect, useState } from "react"
import { Card, Col, Dropdown, Row } from "react-bootstrap"
import { TOKEN, URI, zbx } from "../apis/zbx"
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import DelHost from "../container/DelHost"
import EditHost from "../container/EditHost"
import DetailHost from "../container/DetailHost"

const ItemCard = ({ hostid, name }) => {
    const [dataItem, setDataItem] = useState([0, 0, 0])

    const [delHost, setDelHost] = useState(false)
    const [editHost, setEditHost] = useState(false)
    const [detailHost, setDetailHost] = useState(false)

    const [user] = useAuthState(auth)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await zbx.post(URI, {
                    jsonrpc: '2.0',
                    method: 'item.get',
                    params: {
                        output: ["itemid", "name", "lastclock", "lastvalue", "prevvalue"],
                        hostids: hostid
                    },
                    id: 1,
                    auth: TOKEN
                })
                setDataItem(fetchedData.data.result)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        setInterval(() => {
            fetchData()
        }, 60000)
    }, [hostid])

    return (
        <>
            <Col xl={3} md={6}>
                <Card className="card-sm">
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col className="col-auto">
                                <span className={dataItem[0].lastvalue > 0 ? 'bg-green-lt avatar' : 'bg-red-lt avatar'}>
                                    {dataItem[0].lastvalue > 0 ? <IconArrowUp /> : <IconArrowDown />}
                                </span>
                            </Col>
                            <Col onClick={() => setDetailHost(true)}>
                                <div className="font-weight-medium">{name}</div>
                                <div className="text-muted">{dataItem[1].lastvalue === '100' ? 'timeout' : parseInt(dataItem[2].lastvalue * 1000) + ' ms'}</div>
                            </Col>
                            {
                                user ?
                                    <Col className="col-auto align-self-center">
                                        <Dropdown>
                                            <Dropdown.Toggle as='div'>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setEditHost(true)}>Edit</Dropdown.Item>
                                                <Dropdown.Divider></Dropdown.Divider>
                                                <Dropdown.Item className='text-danger' onClick={() => setDelHost(true)}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                    :
                                    <></>
                            }
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <DelHost
                show={delHost}
                onHide={() => setDelHost(false)}
                hostid={hostid}
            />
            <EditHost
                show={editHost}
                onHide={() => setEditHost(false)}
                hostid={hostid}
                name={name}
            />
            <DetailHost
                show={detailHost}
                onHide={() => setDetailHost(false)}
                hostid={hostid}
                name={name}
                dataItem={dataItem}
            />
        </>
    )

}

export default ItemCard