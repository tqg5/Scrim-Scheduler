const createXHR = require('../../src/helpers/xhr')
const config = require('../../config.json')
const xhr = createXHR()
xhr.defaults.headers.common['Bot'] = config.botToken;

//680651240845344902
module.exports = app => {
    app.get('/getChannel', async(req, res) => {
        const { data } = await createXHR().get('/channels/680651240845344902')

        console.log('get channel:',data)
    })

    app.post('/createMessage', async(req, res) => {
        console.log('createMessage')
        const { data } = await createXHR().post('/channels/680651240845344902/messages',{ content: 'test'},{
            headers: {'Content-Type': 'application/json'}
        })

        console.log(req)
    })
}