/**
 * Created by evan on 2016/2/24.
 */
import React from 'react'
import * as orderComponents from 'components/Order/list'

const {
  OrderListItem,
  } = orderComponents

const OrderListView = () => {
  return (
    <div className="black-bg pd-d-1">
      <OrderListItem />
    </div>
  )
}

export default OrderListView
