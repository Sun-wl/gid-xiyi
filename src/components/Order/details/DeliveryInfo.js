/**
 * Created by evan on 2016/2/24.
 */

import React,{PropTypes} from 'react'
import { FormattedMessage as Text } from 'react-intl'


import clock  from 'static/img/clock.png'
import address  from 'static/img/address.png'
import customer  from 'static/img/customer.png'
import memo  from 'static/img/memo.png'

const DeliveryInfo = ({data}) => {
  return (
    <section className='bd'>
      <span><Text id='order.details.no'/>  &nbsp; &nbsp;{data.orderNo}</span>
      <div className='line'></div>
      <div className='items'>
        <img src={address} width='18'/>
        <span>{data.from.address}</span>
      </div>
      <div className='items'>
        <img src={customer} width='18'/>
        <span>{data.from.contact}</span>
        <span className='pd-l-4'>{data.from.mobile}</span>
      </div>
      <div className='line'></div>
      <div className='items'>
        <img src={clock} width='19'/>
        <span><Text id='order.delivery.take.time'/></span>
        <span className='pd-l-4'>{data.takeTime}</span>
      </div>
      <div className='items'>
        <img src={clock} width='19'/>
        <span><Text id='order.details.delivery.time'/></span>
        <span className='pd-l-4'>{data.deliveryTime}</span>
      </div>
      <div className='line'></div>
      <div className='items'>
        <img src={memo} width='19'/>
        <span><Text id='order.delivery.remark'/></span>
        <span className='pd-l-4'>{data.remark}</span>
      </div>
    </section>
  )
}

export default DeliveryInfo

DeliveryInfo.propTypes = {
  data: PropTypes.object.isRequired
}
