const axios = require('axios')
const config = require('../../config.json')

module.exports = function createXHR() {
  return axios.create({
    baseURL: config.discordURL,
    headers: {
      Authorization: `Bot ${config.botToken}`
    }
  })
}
