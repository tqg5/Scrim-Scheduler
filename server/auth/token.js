const express = require('express')
const querystring = require('querystring')
const config = require('../../config.json')
const createXHR = require('../../src/helpers/xhr')
const differenceInSeconds = require('date-fns/differenceInSeconds')
const rax = require('retry-axios')
const getAccessTokenFromDB = require('../database/getAccessToken')

module.exports = (app, db) => {
  app.get('/getAccessTokenFromDB', async(req, res) => {

    const { accessCode } = await getAccessTokenFromDB(db)
    res.json(accessCode)
  })

  app.get('/getAccessToken', (req, res) => {
    console.log('getAccessToken')

    try { 
      getAccessToken(req.query.code).then(({data}) => {
        console.log('finished getting access token')
        console.log(data)
        //get access codes. if 0, insert, if found, check if expire date has passed to fetch a new one
        db.collection('AccessCodes').countDocuments({})
          .then(count => {
            console.log('count',count)
            if(!count) {
              db.collection('AccessCodes').insertOne({
                accessCode: data.access_token,
                createdAt: new Date(),
                expiresIn: data.expires_in,
                refreshToken: data.refresh_token
              })
            }
            else {
              db.collection('AccessCodes').findOne({})
                .then(shouldFetchNewCode)
                .then(fetchNewCode)
            }
          })
      })
      .catch(function(e) {
        console.log(e.response.data)
      })
    }
    catch(e) {
      console.log(e.message)
    } 
  })
}

function getAccessToken(code) {
  const xhr = createXHR()
  xhr.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  console.log('getAccessToken')
  const obj = {
    client_id: config.clientID,
    client_secret: config.clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'http://localhost:5001/getAccessToken',
    scope: 'identify guilds'
  }

  rax.attach(xhr)
  return xhr.post(`/oauth2/token`, querystring.stringify(obj))
}

function shouldFetchNewCode(code) {
  console.log(code)
  console.log('now:',new Date())
  console.log('createdAt:', code.createdAt)
  console.log('date diff:', differenceInSeconds(new Date(), code.createdAt))
  const diff = differenceInSeconds(new Date(), code.createdAt)

  return {
    shouldFetchNewCode: diff > code.expiresIn,
    code
  }
}

function fetchNewCode({
  shouldFetchNewCode: shouldFetch,
  code: {
    accessCode,
    refreshToken
  }}) {
  console.log('fetchingNewCode')
  console.log('shouldFetch', shouldFetch)
  console.log('code:',accessCode)
  if(!shouldFetch) return

  const xhr = createXHR()
  xhr.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  const refreshObj = {
    client_id: config.clientID,
    client_secret: config.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    redirect_uri: 'http://localhost:5001/getAccessToken',
    scope: 'identify guilds'
  }

  console.log('refreshing token')

  xhr.post('/oauth2/token', querystring.stringify(refreshObj))
    .then(res => {
      db.collection('AccessCodes').findOneAndReplace({accessCode}, {
        accessCode: res.data.access_token,
        createdAt: new Date(),
        expiresIn: res.data.expires_in,
        refreshToken: res.data.refresh_token
      })
    })
    .catch(e => {
      console.log(e)
    })
}
