import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { TOKEN, URI, zbx } from '../apis/zbx'

const GraphItem = ({ itemid }) => {
    const [value, setValue] = useState()
    const [date, setDate] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await zbx.post(URI, {
                    jsonrpc: '2.0',
                    method: 'trend.get',
                    params: {
                        output: ["clock", "value_avg"],
                        itemids: [itemid],
                        limit: "24"
                    },
                    id: 1,
                    auth: TOKEN
                })
                setValue(fetchedData.data.result?.map((data) => data.value_avg))
                setDate(fetchedData.data.result?.map((data) => data.clock))
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [itemid])

    const options = {
        chart: { id: 'bar-chart' },
    }

    const series = {
        data: {
            x: date,
            y: value
        }
    }

    return (
        <Chart options={options} series={series} type='line' width='450' />
    )
}

export default GraphItem