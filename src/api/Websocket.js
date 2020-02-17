import axios from 'axios'
import Websocket from '../models/Websocket'

export default function getWebsocket() {
  axios.get('http://localhost:5001/getGateway')
    .then(res => {
      console.log('websocket:',res.data.url)
      const ws = Websocket(res.data.url, 'test')
        /*
      ws.clientProm.then(client => {
        client.send('test')
      })
      */
    })
}
