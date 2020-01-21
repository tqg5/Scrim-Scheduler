import { hot } from 'react-hot-loader'
import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './Home'
import OAuth2 from './components/OAuth2'

const App = () => (
  <Router>
    <Route exact path='/' component={Home} />
    <Route path='/oauth2' component={OAuth2} />
  </Router>
)

export default hot(module)(App)
