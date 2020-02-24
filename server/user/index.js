const createXHR = require('../../src/helpers/xhr')
const getAccessTokenFromDB = require('../database/getAccessToken')
const config = require('../../config.json')

module.exports = (app, db) => {
  app.get('/getCurrentUser', async(req, res) => {
    const { accessCode } = await getAccessTokenFromDB(db)
    console.log('getCurrentUser accessCode:',accessCode)
    createXHR().get('/users/@me/guilds', {
        headers: {
            Authorization: `Bot ${config.botToken}`
        }
    })
      .then(({data}) => {
        console.log('currentUser:',data)
      })
      .catch(e => {
          console.log('error in getCurrentUser:', e)
      })
  })
}
