const config = require('../../config.json')
const Opcode = require('./Opcode')
const differenceInMilliseconds = require('date-fns/differenceInMilliseconds')

var WebSocketClient = require('websocket').w3cwebsocket

module.exports = function Websocket(url, db) {
  const opcode = Opcode(db)
  let seq = null
  let op1IntervalID = null
  let lastHeartbeat = null
  let hearbeatInterval = true

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
      //res(client)
    }

    client.onclose = function(close) {
      console.log('echo-protocol Connection Closed',close)
    }

    client.onmessage = async function(e) {
      if(e.type === 'message') {
        const data = JSON.parse(e.data)
        console.log(data)

        switch(data.op) {
          case 10:
            seq = data.s
            hearbeatInterval = data.d.heartbeat_interval

            
            if(!op1IntervalID) {
              
              console.log('opcode interval created')
              op1IntervalID = setInterval(function() {
                console.log('sending heartbeat with seq:',seq)
                /*
                if(!lastHeartbeat) {
                  console.log('clearing interval:',op1IntervalID)
                  client.close(4000,`Didn't receive opcode 11 in between heartbeats`)
                  
                  clearInterval(op1IntervalID)
                  rej(`Didn't receive opcode 11 in between heartbeats`)

                  return
                }
                */
                client.send(opcode.opcode1(seq))
                lastHeartbeat = false
              }, data.d.heartbeat_interval)
              client.send(opcode.opcode1(seq))
              const payload = await opcode.opcode2()

              console.log('opcode2:', payload)
              client.send(payload)
              break
            }
          case 11:
            //websocket is still connected
            lastHeartbeat = true
            console.log('received opcode 11 hearbeat')
        }
      }
    }
  })

  return {
    clientProm: prom
  }
}
