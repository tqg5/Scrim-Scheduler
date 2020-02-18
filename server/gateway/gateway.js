const createXHR = require('../../src/helpers/xhr')
let db = null
require('../database').then(database => {
  db = database
})

module.exports = (app, db) => {
  app.get('/getGateway', (req, res) => {
    createXHR().get('/gateway')
      .then(({data}) => {
        db.collection('WSS').findOneAndReplace({}, data)
          .then(val => {
            console.log('val:',val)
            if(!val.value) {
              db.collection('WSS').insertOne(data)
            }

            res.json(data)
          })
        console.log(data)
      })
  })
}
