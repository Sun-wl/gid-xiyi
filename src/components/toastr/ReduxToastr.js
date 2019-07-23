import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import ToastrBox from './ToastrBox'
import ToastrTips from './ToastrTips'
import ToastrBlock from './ToastrBlock'
import Overlay from './Overlay'
import * as tActions from './actions'
import {EE} from 'common'
import config from './config'
import "!style!css!less!./less/index.less"


class ReduxToastr extends Component {
  static displayName = 'ReduxToastr'

  static propTypes = {
    toastr: PropTypes.object,
    options: PropTypes.object,
    position: PropTypes.string,
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number
  }

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    timeOut: 5000,
    okText: 'enter',
    cancelText: 'cancel'
  }

  constructor(props) {
    super(props)
    config.timeOut = this.props.timeOut
    config.newestOnTop = this.props.newestOnTop
  }

  componentDidMount() {
    const {addToastrAction,  clean, showTips,hideOverlay,showOverlay} = this.props
    EE.on('toastr/tips', showTips)
    EE.on('add/toastr', addToastrAction)
    EE.on('clean/toastr', clean)
    EE.on('show/overlay', showOverlay)
    EE.on('clean/overlay', hideOverlay)
  }

  componentWillUnmount() {
    EE.removeListener('toastr/tips')
    EE.removeListener('add/toastr')
    EE.removeListener('clean/toastr')
    EE.on('show/overlay')
    EE.on('clean/overlay')
  }

  render() {
    return (
      <div>
        {this.props.toastr.overlay &&
           <Overlay overlay={this.props.toastr.overlay} {...this.props} />
        }
        <div className={cn('redux-toastr', this.props.position)}>
          {this.props.toastr &&
            <ToastrTips tips={this.props.toastr.tips} {...this.props} />
          }
          {this.props.toastr &&
            <ToastrBlock block={this.props.toastr.block} {...this.props} />
          }
          {this.props.toastr &&
              this.props.toastr.toastrs.map(item => <ToastrBox key={item.id} item={item}  {...this.props}/>)
          }
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    toastr: state.toastr ? state.toastr : state.get('toastr')
  }
}


export default connect(
  mapStateToProps, tActions
)(ReduxToastr)
