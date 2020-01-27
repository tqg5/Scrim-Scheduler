const express = require('express')
const querystring = require('querystring')
const cors = require('cors')
const app = express()
const router = express.Router()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors())

const port = 5001

app.get('/auth', (req, res) => {
    res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=668288993858945044&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2FgetToken&response_type=code&scope=guilds%20identify')
})

app.get('/getToken', (req, res) => {
    const tokenAPI = 'https://discordapp.com/api/oauth2/token'

    console.log(req.query.code)

    //res.status(200).json({code: req.query.code})
    res.redirect('http://localhost:5000/Scrim-Scheduler')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))