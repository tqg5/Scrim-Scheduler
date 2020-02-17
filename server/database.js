const MongoClient = require('mongodb').MongoClient
const config = require('../config.json')

const promise = new Promise((resolve, reject) => {
  MongoClient.connect(config.dbConnection, function(e, database) {
    if (e) {
      reject(e)
    }

    console.log("Database created!")
    resolve(database.db('scrim-scheduler'))
  })
})


module.exports = promise
