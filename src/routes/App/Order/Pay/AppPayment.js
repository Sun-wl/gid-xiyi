/**
 * Created by Administrator on 2016/5/3.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Payment from 'components/Pay/Payment'
import {orderDetail} from 'reducers/Order/Details'
import { appPayRequest} from 'reducers/Pay'
import NativeJsBridge from '../../NativeJsBridge'
import AppTopBar from 'components/AppTopBar'
import {queryAccount} from 'reducers/Recharge'

class AppPayment extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
    this.state = {payType: 'wallet'}
    this.platform = 'app'
  }

  selectPayType(payType) {
    this.setState({payType: payType})
  }

  componentDidMount() {
    this.props.getDetail(this.props.orderNo)
    if(this.props.ticket){
      this.props.queryAccount()
    }
  }


  pay(e, orderNo, amount) {
    e.preventDefault()
    this.props.appPayRequest(orderNo)
    const payType = this.state.payType
    NativeJsBridge.pay(orderNo, payType, amount)
  }



  render() {

    const {account,data,ticket} = this.props
    let myAmount = -1
    if(ticket){
      myAmount =  account.amount ? account.amount/100.00:0
    }
    return (<div>
      <AppTopBar title='pay.details.info'/>
      <div className="black-bg pd-d-1 d-top">
        <Payment
          data={data}
          toPay={::this.pay}
          platform={this.platform}
          payType={this.state.payType}
          myAmount={myAmount}
          selectPayType={::this.selectPayType}/>
      </div>
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  const {orderNo} = ownProps.params
  return {
    orderNo: orderNo,
    data: state.orderDetails.data,
    charge: state.charge,
    account: ((state.recharge || {}).account) || {},
    ticket:state.secret.ticket
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetail: function (orderNo) {
      dispatch(orderDetail(orderNo))
    },
    goPayStatusPage: (page, data) =>  dispatch(push({pathname: page, query: data})),
    appPayRequest: (orderNo) => dispatch(appPayRequest(orderNo)),
    queryAccount:() => dispatch(queryAccount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppPayment)

AppPayment.propTypes = {
  getDetail: PropTypes.func.isRequired,
  orderNo: PropTypes.string.isRequired,
  data: PropTypes.object,
  charge: PropTypes.object,
  goPayStatusPage: PropTypes.func.isRequired,
  appPayRequest: PropTypes.func.isRequired,
  account: PropTypes.object,
  ticket: PropTypes.string
}

AppPayment.contextTypes = {
  intl: React.PropTypes.object.isRequired
}
