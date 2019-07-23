/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {FormattedMessage as Text} from 'react-intl'
import check from "static/img/check.png"

const OrderSuccess = ({location}) => {
  const {orderNo} = location.query
  return (
    <div className="black-bg">
      <div className='text-c'>
        <img src={check} className='chkImg'/>
      </div>
      <div className='text-c chkText'>
        <Text id='order.status.created.order'/>
      </div>
      <div className='text-c chkinfo'>
        <Text id='order.details.no'/>: {orderNo}
      </div>
      <div className='release-footer'>
        <Link to='/order/list'>
          <button className='release-btn rb-able'>
            <Text id="order.pay.details"/>
          </button>
        </Link>
      </div>
    </div>
  )
}
export default OrderSuccess
