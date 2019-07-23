/**
 * Created by evan on 2016/5/16.
 */
 import React from 'react'
import render from './main'
import routes from './routes/index.app'


if (__DEV__ && module.hot) {
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(<RedBox error={error} />, MOUNT_ELEMENT)
  }
  module.hot.accept(['./routes/index.app'], (routes) => {
    try {
      render(routes, Math.random())
    } catch (error) {
      renderError(error)
    }
  })

}

render(routes)
