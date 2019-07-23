/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import AppTopBar from 'components/AppTopBar'
import * as orderComponents from 'components/Order/details'
import {orderDetail} from 'reducers/Order/Details'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'

const {
  OrderInfo,
  DeliveryInfo,
  OrderTimeline
  } = orderComponents

class OrderDetailsView extends  Component {

  componentDidMount() {
    this.props.getDetail(this.props.orderNo)
  }

  toPay(e, orderNo){
    e.preventDefault()
    this.props.toPay(`/order/pay/payment/${orderNo}`)
  }

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
  }

  render() {
    const { data } = this.props
    return (
      <div>
        <AppTopBar title='page.details'/>
        <div className="black-bg pd-d-1 d-top">
          <OrderInfo data={{order:data, toPay:this.toPay.bind(this)}}/>
          <DeliveryInfo data={data}/>
          <OrderTimeline data={data}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  const { orderNo } = ownProps.location.query
  return {
      orderNo:orderNo,
      data:state.orderDetails.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     getDetail:function(orderNo){
        dispatch(orderDetail(orderNo))
     },
    toPay:(path) => {
      dispatch(push({pathname:path}))
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(OrderDetailsView)

OrderDetailsView.propTypes = {
  getDetail: PropTypes.func.isRequired,
  toPay: PropTypes.func.isRequired,
  orderNo: PropTypes.string.isRequired,
  data: PropTypes.object,
}

OrderDetailsView.contextTypes = {
  intl: React.PropTypes.object.isRequired
}
