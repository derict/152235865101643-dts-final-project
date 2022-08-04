import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { TOKEN, URI, zbx } from '../apis/zbx'

const GraphItem = ({ itemid }) => {
    const [value, setValue] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await zbx.post(URI, {
                    jsonrpc: '2.0',
                    method: 'trend.get',
                    params: {
                        output: ["clock", "value_avg"],
                        itemids: [itemid],
                        time_from: (Date.now() / 1000) - 86400,
                        limit: "24"
                    },
                    id: 1,
                    auth: TOKEN
                })
                setValue(fetchedData.data.result?.map((data) => [((parseInt(data?.clock) + 25200) * 1000), parseInt(data?.value_avg * 1000)]))
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [itemid])

    const options = {
        chart: {
            id: 'trend',
            type: 'area',
            zoom: {
                autoScaleYaxis: true
            }
        },
        title: {
            text: 'Trend 24 Hours',
            style: {
                fontWeight: 'bold'
            }
        },
        stroke: {
            width: 2,
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            title: {
                text: '(ms)',
                style: {
                    fontWeight: 'normal'
                }
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM - HH:mm'
            }
        },
    }

    const series = [{
        name: 'Ping',
        data: value
    }]

    return (
        <Chart options={options} series={series} />
    )
}

export default GraphItem