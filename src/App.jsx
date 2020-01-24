import { hot } from 'react-hot-loader'
import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import OAuth2 from './components/OAuth2'
debugger
const App = () => (
  <Router>
    <Route exact path='/Scrim-Scheduler' component={Home} />
    <Route path='/Scrim-Scheduler/oauth2' component={OAuth2} />
    <ul>
      <li>
        <Link to='/Scrim-Scheduler'>Home</Link>
      </li>
      <li>
        <Link to='/Scrim-Scheduler/oauth2'>OAuth2</Link>
      </li>
    </ul>

  </Router>
)

export default hot(module)(App)
