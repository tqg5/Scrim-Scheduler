const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router()
const createXHR = require('../src/helpers/xhr')

app.use(cors())

require('./auth/token')(app)
require('./auth/auth')(app)
require('./gateway/gateway')(app)

let db = null
require('./database').then(database => {
  db = database
})

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})


const port = 5001

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
