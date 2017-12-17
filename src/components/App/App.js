import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'components/Navigation'

const App = ({ children }) => (
  <div className="App">
    <Navigation/>
    <div className='mx-3'>{children}</div>
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App
