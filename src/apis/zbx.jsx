import axios from 'axios'

const TOKEN = '65dbf62734060684d5846e4498e46bca'
const BASEURI = 'https://zabbix.sensing.my.id'
const URI = '/api_jsonrpc.php'
const METHOD = 'post'
const HEADERS = '{"Content-Type": "application/json-rpc"}'

const zbx = axios.create({
    method: METHOD,
    baseURL: BASEURI,
    headers: HEADERS
})

export { TOKEN, URI, zbx }