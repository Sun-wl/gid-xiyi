/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import check from 'static/img/recharge/check.png'
import '../assets/Recharge.scss'
import {Link} from 'react-router'

class RechargeSuccess extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
  }

  render() {
    return (
      <div className="recharge">
        <div className="recharge-success">
          <img src={check} />
          <p><Text id="recharge.paysuccess" /></p>
          <Link to='/account'>
            <div className="recharge-successbtn">
              <Text id="done" />
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

RechargeSuccess.propTypes = {

}

RechargeSuccess.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

export default RechargeSuccess
