/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'

class ConfirmHead extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {amount,reward} = this.props
    return (
      <div className="cohd">
        <p className="cohd-name"><Text id="recharge.czamount" /></p>
        <div className="cohd-content">
          <p className="cohd-money1">{amount/100.00}</p>
          <p className="cohd-money2"><Text id="recharge.zengsong" values={{price:''+reward/100.00}}/></p>
        </div>
      </div>
    )
  }
}

ConfirmHead.propTypes = {
  amount: PropTypes.string.isRequired,
  reward: PropTypes.string.isRequired
}


export default ConfirmHead
