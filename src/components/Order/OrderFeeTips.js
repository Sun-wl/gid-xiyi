/**
 * Created by evan on 2016/2/24.
 */
import React from 'react'
import { FormattedMessage as Text } from 'react-intl'

const OrderFeeTips = () => {
  return (
    <div className='mg-t-13 tip txt-whirt'>
      <ul className='ul-d'>
        <li><Text id='order.tip1'/></li>
        <li><Text id='order.tip2'/></li>
      </ul>
    </div>
  )
}
export default OrderFeeTips
