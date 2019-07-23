export default (store) => ({
  path: 'protocol',
  childRoutes: [
    UserProtocol,
    UserNotice,
    AboutUs,
    Question,
    PrivateProtocol
  ]
})

const UserProtocol =  ({
  path: 'user',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const UserProtocol = require('components/Protocol/UserProtocol').default
      cb(null, UserProtocol)
    }, 'UserProtocol')
  }
})

const UserNotice =  ({
  path: 'notice',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const UserNotice = require('components/Protocol/UserNotice').default
      cb(null, UserNotice)
    }, 'UserNotice')
  }
})

const AboutUs =  ({
  path: 'aboutus',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const AboutUs = require('components/Protocol/AboutUs').default
      cb(null, AboutUs)
    }, 'AboutUs')
  }
})

const Question =  ({
  path: 'question',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Question = require('components/Protocol/Question').default
      cb(null, Question)
    }, 'Question')
  }
})

const PrivateProtocol =  ({
  path: 'privateProtocol',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PrivateProtocol = require('components/Protocol/PrivateProtocol').default
      cb(null, PrivateProtocol)
    }, 'PrivateProtocol')
  }
})




