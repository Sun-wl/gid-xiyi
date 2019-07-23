/**
 * Created by evan on 2016/2/24.
 */
import React from 'react'
import * as orderComponents from 'components/Order/list'
import FooterNav from 'components/FooterNav'

const {
  OrderListItem,
  } = orderComponents

const OrderListView = () => {
  return (
    <div className="black-bg pd-d-45 chbody">
      <OrderListItem />
      <FooterNav index={2} />
    </div>
  )
}

export default OrderListView
