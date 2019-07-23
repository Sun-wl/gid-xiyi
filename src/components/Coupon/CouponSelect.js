/**
 * Created by evan on 2016/5/20.
 */

import React, {Component, PropTypes} from 'react'
import {selectedCoupons} from 'reducers/Coupon'
import {goBack} from 'react-router-redux'
import CouponListView from './CouponListView'
import Tappable from 'react-tappable'
import {FormattedMessage as Text} from 'react-intl'

class CouponSelect extends Component {

  constructor(props, context) {
    super(props, context)
    this.dispatcher = context.store.dispatch
  }

  selectedCoupon(coupon) {
    this.dispatcher(selectedCoupons(coupon))
  }

  handleTapEvent(){
    this.dispatcher(goBack())
  }

  render() {
    return (
      <div className="black-bg pd-d-45 coupon">
        <CouponListView
          location={this.props.location}
          selectedCoupon={::this.selectedCoupon} />
        <Tappable className="btn" onTap={(e) => this.handleTapEvent()}>
          <Text id="done"/>
        </Tappable>
      </div>
    )
  }
}

CouponSelect.contextTypes = {
  store: React.PropTypes.object.isRequired
}

CouponSelect.propTypes = {
  location: PropTypes.object.isRequired
}
export default CouponSelect
