const config = require('../../config.json')
const Opcode = require('./Opcode')

var WebSocketClient = require('websocket').w3cwebsocket

module.exports = function Websocket(url, msg) {
  let seq = null
  let op1IntervalID = null

  const prom = new Promise((res, rej) => {
    url = `${url}/?v=${config.discordAPIVersion}&encoding=json`
    console.log('discord url:',url)
    var client = new WebSocketClient(url)

    client.onerror = function(error) {
      console.log('Connect Error: ' + error.toString())
      rej()
    }
     
    client.onopen = function() {
      console.log('WebSocket Client Connected')
      res(client)
    }

    client.onclose = function(close) {
      console.log('echo-protocol Connection Closed',close)
    }

    client.onmessage = function(e) {
      console.log('received message:',e)
      if(e.type === 'message') {
        const data = JSON.parse(e.data)
        console.log(data)
        let payload = null

        switch(data.op) {
          case 10:
            seq = data.s
            payload = Opcode.opcode1(seq)
            if(!op1IntervalID) {
              console.log('opcode interval created')
              op1IntervalID = setInterval(function() {
                console.log('sending heartbeat with seq:',seq)
                client.send(Opcode.opcode1(seq))
              }, data.d.heartbeat_interval - 3000)
              break
            }
        }
      }
    }
  })

  return {
    clientProm: prom
  }
}
