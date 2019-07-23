/**
 * Created by evan on 2016/5/3.
 */
import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
class AppContainer extends React.Component {

  render () {
    const { history, routes, routerKey, store ,locale,messages} = this.props
    return (
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          <Router history={history} children={routes} key={routerKey} />
        </IntlProvider>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  routerKey: PropTypes.number,
  store: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
}

export default AppContainer
