import axios from 'axios'

export default async function Authorize () {
  const instance = axios.create({
    baseURL: 'https://discordapp.com/api',
    timeout: 1000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  const res = await instance.get('/oauth2/authorize', {
    params: {
      client_id: '668288993858945044',
      client_secret: 'eRnBbuU81EkBWLDiZBn3jjLVklEF5nHL',
      code: 'query code',
      scope: 'identify guilds',
      grant_type: 'authorization_code',
      redirect_uri: encodeURI('http://localhost/oauth2'),
      state: 1
    }
  })
  
  console.log(res)
}
