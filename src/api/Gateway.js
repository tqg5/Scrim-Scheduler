import axios from 'axios'

export default function getGateway() {
  axios.get('http://localhost:5001/getGateway')
}
