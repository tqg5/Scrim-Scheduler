const createXHR = require('../../src/helpers/xhr')
const config = require('../../config.json')
//680651240845344898
module.exports = async(app) => {
    app.get('/getChannels' , async(req, res) => {
        const { data } = await createXHR().get('/guilds/680651240845344898/channels',{
            headers: {
                Authorization: `Bot ${config.botToken}`
            }
        })

        console.log('get channels',data)
    })
}