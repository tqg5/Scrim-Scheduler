import axios from 'axios'

export default async function getAccessTokenFromDB() {
  return await axios.get('http://localhost:5001/getAccessTokenFromDB')
}