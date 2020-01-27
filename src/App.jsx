import { hot } from 'react-hot-loader'
import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'

const App = () => (
  <Router>
    <Route exact path='/Scrim-Scheduler' component={Home} />
    <ul>
      <li>
        <a href='https://discordapp.com/api/oauth2/authorize?client_id=668288993858945044&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2FgetToken&response_type=code&scope=guilds%20identify'>Home</a>
      </li>
    </ul>

  </Router>
)

export default hot(module)(App)
