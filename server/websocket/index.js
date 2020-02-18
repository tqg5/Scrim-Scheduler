const Websocket = require('../models/Websocket')
const getWebsocket = require('../database/getWebsocket')

module.exports = (app, db) => {
    app.get('/createWebsocket', (req, res) => {
        getWebsocket(db).then(val => {
            console.log('createWebsocket:',val)
            res.json(val.url)
            Websocket(val.url)
        })
    })
}