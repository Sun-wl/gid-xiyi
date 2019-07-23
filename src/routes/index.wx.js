// We only need to import the modules necessary for initial render
import MainLayout from '../layouts/MainLayout'
import NotFoundRoute from './NotFound'
import ProtocolRoute from './Protocol'
import WeixinRoute from './Weixin'
import NotLoginRoute from './NotLogin'

export const createRoutes = (store) => ({
  path: '/',
  component: MainLayout,
  childRoutes: [
    WeixinRoute(store),
    ProtocolRoute(store),
    NotLoginRoute(store),
    NotFoundRoute(store)
  ]
})

export default createRoutes
