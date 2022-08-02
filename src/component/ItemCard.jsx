import { IconArrowDown, IconArrowUp } from "@tabler/icons"
import { useEffect, useState } from "react"
import { Badge, Card, Col, Row } from "react-bootstrap"
import { TOKEN, URI, zbx } from "../apis/zbx"

const ItemCard = ({ hostid, name }) => {
    const [dataItem, setDataItem] = useState([0, 0, 0])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await zbx.post(URI, {
                    jsonrpc: '2.0',
                    method: 'item.get',
                    params: {
                        output: ["key_", "lastvalue", "prevvalue"],
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
        <Col xl={3} md={6}>
            <Card className="card-sm">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col className="col-auto">
                            <span className={dataItem[0].lastvalue > 0 ? 'bg-green-lt avatar' : 'bg-red-lt avatar'}>
                                {dataItem[0].lastvalue > 0 ? <IconArrowUp /> : <IconArrowDown />}
                            </span>
                        </Col>
                        <Col>
                            <div className="font-weight-medium">{name}</div>
                            <div className="text-muted">{parseInt(dataItem[2].lastvalue * 1000)} ms</div>
                        </Col>
                        <Col className="col-auto align-self-center">
                            <Badge bg={dataItem[0].lastvalue > 0 ? 'primary' : 'danger'} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )

}

export default ItemCard