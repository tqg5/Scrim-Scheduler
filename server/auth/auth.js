module.exports = app => {
  app.get('/auth', (req, res) => {
    res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=668288993858945044&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2FgetToken&response_type=code&scope=guilds%20identify')
  })
}
