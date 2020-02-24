const createXHR = require('../../src/helpers/xhr')

module.exports = (app, db) => {
  app.get('/refreshGateway', async (req, res) => {
    const { data } = await createXHR().get('/gateway')
    console.log('data:',data)
    const { value } = await db.collection('WSS').findOneAndReplace({}, data)
    console.log('gateway:',value)
    if(!value) {
      db.collection('WSS').insertOne(data)
    }
    res.status(200)
    res.json({})
  })       
}
