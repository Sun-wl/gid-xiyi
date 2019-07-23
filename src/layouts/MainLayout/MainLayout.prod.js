/**
 * Created by evan on 2016/5/13.
 */

import React, {Component, PropTypes} from 'react'
import ReduxToastr from 'components/toastr'
import Modal from './Modal'
import 'styles/core.scss'

class MainLayout extends Component {

  constructor(props, context) {
    super(props, context)
    this.dispatcher = context.store.dispatch
  }

  componentWillReceiveProps(nextProps) {
    if ((
        nextProps.location.key !== this.props.location.key &&
        nextProps.location.state &&
        nextProps.location.state.modal
      )) {
      this.previousChildren = this.props.children
    }
  }

  render() {
    let { location } = this.props
    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    return (
      <div style={{ height: '100%' }}>
        <ReduxToastr
          timeOut={2000}
          newestOnTop={false}
          position='top-center'/>
        <div className='wallpaper'>
          {isModal?this.previousChildren:this.props.children}
        </div>
        {isModal &&<Modal location={location} dispatcher ={this.dispatcher} >{this.props.children}</Modal>}
      </div>
    )
  }
}

MainLayout.propTypes = {
  children: React.PropTypes.element
}

MainLayout.contextTypes = {
  store: React.PropTypes.object.isRequired
}

export default MainLayout
