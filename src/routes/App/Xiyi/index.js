/**
 * Created by evan on 2016/5/11.
 */
import AddRoute from './Add'
import IroningRoute from './../../Ironing'
import JingxiRoute from './../../Jingxi'

export default (store) => ({
  path: 'xiyi',
  indexRoute: { onEnter: (nextState, replace) => {
    replace({
      pathname: '/xiyi/book/daixi',
      query:nextState.location.query
    })
  }},
  childRoutes: [
    AddRoute(store),
    IroningRoute(store),
    JingxiRoute(store)
  ]
})
