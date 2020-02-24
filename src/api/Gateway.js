import axios from 'axios'

export default async function getGateway() {
  const { data } = await axios.get('http://localhost:5001/refreshGateway')

  return data
}