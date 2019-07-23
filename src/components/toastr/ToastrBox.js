import React, {Component, PropTypes} from 'react'
import cn from 'classnames'
import config from './config'
import {FormattedMessage as Text} from 'react-intl'

export default class ToastrBox extends Component {
  static displayName = 'ToastrBox'

  static propTypes = {
    item: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    let {options} = props.item
    this.isHiding = false
    this.intervalId = null
  }

  componentDidMount() {
    const {remove, item} = this.props
    let {timeOut} = item.options
    if (typeof timeOut === 'undefined' && item.type !== 'message') {
      timeOut = config.timeOut
    }
    if (timeOut) {
      this._setIntervalId(setTimeout(this._removeToastr, timeOut))
    }
    if (this.isHiding) {
      this._setIsHiding(false)
      remove(item.id)
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId)
    }
  }

  _removeToastr = () => {
    const {remove, item} = this.props
    if (!this.isHiding) {
      remove(item.id)
      this._setIsHiding(true)
    }
  }

  _setIntervalId = (intervalId) => {
    this.intervalId = intervalId
  }

  _setIsHiding = (val) => {
    this.isHiding = val
  }

  render() {
    return (
      <div ref={(ref) => this.toastrBox = ref} className={cn('toastr',this.props.item.type)} >
        <div className="message-holder">
          {this.props.item.title && <div className="title"><Text defaultMessage={this.props.item.title} id={this.props.item.title}/></div>}
          {this.props.item.message && <div className="message"><Text defaultMessage={this.props.item.message} id={this.props.item.message}/></div>}
        </div>
      </div>
    )
  }
}
