/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import  './assets/ServiceAbout.scss'
import {toastr} from 'components/toastr'
import hz from 'static/img/service/hangzhou.jpg'
import sh from 'static/img/service/shanghai.jpg'

class ServiceRange extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
  }

  render() {
      return (
      <div className="servicerange">
        <div className="servicerange-item">
          <p><Text id='service.areash'/></p>
          <div className="servicerange-itemimg">
            <img src={sh} />
          </div>
        </div>
        <div className="servicerange-item ">
          <p><Text id='service.areahz'/></p>
          <div className="servicerange-itemimg">
            <img src={hz} />
          </div>
        </div>
      </div>
    )
  }
}

ServiceRange.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

export default ServiceRange
