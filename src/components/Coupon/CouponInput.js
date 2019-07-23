/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import { FormattedMessage as Text } from 'react-intl'
import classnames from 'classnames'
import couponImg from 'static/img/coupon_y.png'
import {formatCity} from 'common'
class CouponInput extends Component {

  openCoupon() {
    this.props.openCoupon(formatCity(this.props.city,'zh'))
  }

  componentWillMount() {
    const coupon = this.props.selectedCoupon || {}
    // 如果优惠券不一致需要更新
    if (coupon.id && this.props.coupon.id.value !== coupon.id) {
      this.props.coupon.id.onChange(coupon.id)
      this.props.coupon.name.onChange(coupon.name)
    }
  }

  render() {
    const {name} = this.props.coupon
    return (
      <section className='bd'>
        <div className='form-item'>
          <div className="eng-address" onClick={::this.openCoupon}>
            <img src={couponImg} />
            <span className={classnames({'hint-span':true,'txt-black':name.value})}>
              {name.value || <Text id='order.delivery.promocode' />}</span>
          </div>
          <div className='clear'></div>
        </div>
      </section>
    )
  }
}

CouponInput.propTypes = {
  coupon: PropTypes.object.isRequired,
  openCoupon: PropTypes.func.isRequired,
  city: PropTypes.string,
  selectedCoupon: PropTypes.object
}


export default CouponInput
