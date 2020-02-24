import axios from 'axios'

export default function getCurrentUser() {
  axios.get('http://localhost:5001/getCurrentUser')
    .then(res => {
        console.log('in then of Websocket api:',res)
    })
    .catch(e => {
        console.log('in catch of Websocket api:',e)
    })
}
