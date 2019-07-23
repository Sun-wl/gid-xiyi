/**
 * Created by evan on 2016/5/16.
 */
import React from 'react'
import render from './main'
import routes from './routes/index.wx'
import ReactDOM from 'react-dom'

if (__DEV__ && module.hot) {
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(<RedBox error={error}/>, MOUNT_ELEMENT)
  }
  module.hot.accept(['./routes/index.wx'], (routes) => {
    try {
      render(routes, Math.random())
    } catch (error) {
      renderError(error)
    }
  })
}

render(routes)
