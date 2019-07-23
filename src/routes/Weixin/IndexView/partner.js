export default (store) => ({
  path: 'partner',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const PartnerView = require('components/IndexView/IndexPartner').default
      next(null, PartnerView)
    }, 'wxPartnerView')
  }
})
