import './index.scss'
import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import {render} from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import App from './components/App'
import HomePage from './components/HomePage'
import AboutPage from './components/AboutPage'
import BlogPage from './components/BlogPage'
import PostPage from './components/PostPage'

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/(home)?" component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route exact path="/blog" component={BlogPage}/>
        <Route path="/blog/:slug" component={PostPage}/>
        <Redirect from="*" to="/"/>
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
)
