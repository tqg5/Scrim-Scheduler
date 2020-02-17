import { hot } from 'react-hot-loader'
import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Button } from 'antd'
import Home from './Home'
import getWebsocket from './api/Websocket'

const App = () => (
  <Router>
    <Route exact path='/Scrim-Scheduler' component={Home} />
    <ul>
      <li>
        <a href='http://localhost:5001/getToken'>getToken </a>
      </li>
    </ul>
    <ul>
      <li>
        <a href='https://discordapp.com/api/oauth2/authorize?client_id=668288993858945044&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2FgetToken&response_type=code&scope=guilds%20identify'>Home</a>
      </li>
      <li>
        <a href='http://localhost:5001/getGateway'>Get Gateway</a>
      </li>
      <li>
        <Button type='primary' onClick={getWebsocket}> Get Websocket </Button>
      </li>
    </ul>

  </Router>
)

export default hot(module)(App)
