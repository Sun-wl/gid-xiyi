
import { injectReducer } from 'store/reducers'

export const ServiceRange = (store) => ({
  path: 'polygon',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const ServiceRangeView = require('components/ServiceAbout/ServiceRange').default
      next(null, ServiceRangeView)
    }, 'ServicePolygon')
  }
})

export const ServiceIntroduce = (store) => ({
  path: 'introduce',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const ServiceIntroduceView = require('components/ServiceAbout/ServiceIntroduce').default
      next(null, ServiceIntroduceView)
    }, 'ServiceIntroduce')
  }
})


export default (store) => ({
  path: 'service',
  getChildRoutes(location, next) {
    require.ensure([], function (require) {
      next(null, [
        ServiceRange(store),
        ServiceIntroduce(store)
      ])
    },'ServiceAbout')
  }
})
