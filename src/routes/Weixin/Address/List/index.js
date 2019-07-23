export const  SelectRoute = (store) => ({
  path: 'select',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const AddressListView = require('./AddressListView').default
      next(null, AddressListView)
    }, 'WxAddressListView')
  }
})

export const  QueryRoute = (store) => ({
  path: 'query',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const AddressShowListView = require('./AddressShowListView').default
      next(null, AddressShowListView)
    }, 'WxAddressShowListView')
  }
})

export const AddRoute = (store) => ({
  path: 'add',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const AddressEditView = require('./AddressEditView').default
      next(null, AddressEditView)
    }, 'WxAddressEditView')
  }
})

export const EditRoute = (store) => ({
  path: 'edit/:id',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const AddressEditView = require('./AddressEditView').default
      next(null, AddressEditView)
    }, 'WxAddressEditView')
  }
})
