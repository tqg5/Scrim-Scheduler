import axios from 'axios'

export default async function createWebsocket() {
    try {
        await axios.get('http://localhost:5001/createWebsocket')
    }
    catch(e) {
        console.log('in catch of Websocket api:',e)
    }
}
