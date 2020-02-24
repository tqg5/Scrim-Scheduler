const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router()

require('./database').then(db => {
  app.use(cors())
  require('./bot')
  require('./auth/token')(app, db)
  require('./auth/auth')(app, db)
  require('./gateway/gateway')(app, db)
  require('./websocket')(app, db)
  require('./user')(app, db)
  require('./guilds')(app)
  require('./channel')(app)

  router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
  })
  
  
  const port = 5001
  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})