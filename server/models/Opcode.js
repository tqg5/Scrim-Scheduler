const config = require('../../config.json')
const getAccessToken = require('../database/getAccessToken')

module.exports = function Opcode(db) {
  const opcode1 = function(seq = null) {
    return JSON.stringify({
      op: 1,
      d: seq
    })
  }

  const opcode2 = async function() {
    const obj = await getAccessToken(db)

    return JSON.stringify({
      op: 2,
      d: {
        token: config.botToken,
        properties: {
          $os: 'linux',
          $browser: 'scrim_scheduler',
          $device: 'scrim_scheduler'
        }
      }

    })
  }

  return {
    opcode1,
    opcode2
  }
}