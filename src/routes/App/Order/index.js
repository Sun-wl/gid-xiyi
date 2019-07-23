import DetailsRoute from './Details'
import ListRoute from './List'
import PayRoute from './Pay'
import OrderResultRoute from './Result'

export default (store) => ({
  path: 'order',
  childRoutes: [
    DetailsRoute(store),
    ListRoute(store),
    PayRoute(store),
    OrderResultRoute(store)
  ]
})
