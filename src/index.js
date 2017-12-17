import './index.scss'
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import App from './components/App'
import Home from './components/Home'
import About from './components/About'

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/(home)?" component={Home}/>
        <Route path="/about" component={About}/>
        <Redirect from="*" to="/"/>
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
)
