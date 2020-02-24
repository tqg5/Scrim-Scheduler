const Websocket = require('../models/Websocket')
const getWebsocket = require('../database/getWebsocket')

module.exports = (app, db) => {
    app.get('/createWebsocket', async(req, res) => {
        try {
            const { url } = await getWebsocket(db)
            console.log('createWebsocket:',url)
            await Websocket(url,db).clientProm
        }
        catch(e) {
            console.log('catch:',e)
            res.status(500)
            res.json(e)
        }
    })
}