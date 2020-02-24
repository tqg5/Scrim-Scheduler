import axios from 'axios'

export default async function getChannels() {
  return await axios.get('http://localhost:5001/getChannels')
}