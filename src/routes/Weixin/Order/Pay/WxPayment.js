/**
 * Created by Administrator on 2016/5/3.
 */
import React, {Component, PropTypes} from 'react'
import {orderDetail} from 'reducers/Order/Details'
import {connect} from 'react-redux'
import pingpp from 'plugins/pay'
import {toPayAction,toWalletPayAction} from 'reducers/Pay'
import {push} from 'react-router-redux'
import Payment from 'components/Pay/Payment'
import {toastr} from 'components/toastr'
import {queryAccount} from 'reducers/Recharge'

class WxPayment extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
    this.state = {payType: 'wallet'}
  }

  selectPayType(payType) {
    this.setState({payType: payType})
  }

  componentDidMount() {
    this.props.getDetail(this.props.orderNo)
    if(this.props.ticket){
      this.props.queryAccount()
    }
    const {data} = this.props
    const couponexist = (_.filter(data.goods.items, o=>o.itemType == 2).length>0)
    if(couponexist){
      this.selectPayType('wx')
    }
  }

  componentWillReceiveProps(nextProps) {
    const status = this.props.charge.status
    const nextStatus = nextProps.charge.status


    const channel = nextProps.charge.channel
    const {goPayStatusPage} = this.props
    //const cancelMsg = this.messages["order.pay.cancel"]
    const payResultUrl = '/order/pay/result'
     if(channel === 'gidoorWallet' ){
       const walletPayStatus = this.props.charge.walletPayStatus
       const nextWalletPayStatus= nextProps.charge.walletPayStatus
        //判断第一次获取支付参数成功状态
       if( status === 'pending' && nextStatus === 'success'){

         toastr.tips('order.pay.confirm', {
           onCancel: () => {},
           onOk: () => this.props.toWalletPay(nextProps.charge.data),
           cancelText: 'cancel'
         })

         //判断第二次获取支付成功状态
       }else if(walletPayStatus === 'pending' && nextWalletPayStatus ==='success'){
         goPayStatusPage(payResultUrl, {
           orderNo: nextProps.charge.payOrderNo,
           status: 'success',
           amount: nextProps.charge.amount,
           msg: nextProps.charge.msg
         })
       }else if(walletPayStatus === 'pending' && nextWalletPayStatus ==='fail'){
         toastr.error(nextProps.charge.msg)
       }

     }else if(channel === 'wx_pub' ){
       // 微信
         if(status === 'pending' && nextStatus === 'success'){
           pingpp.createPayment(nextProps.charge.data, function (result, error) {
             if (result === 'success') {
               nextProps.data.payStatus = 2
               goPayStatusPage(payResultUrl, {
                 orderNo: nextProps.charge.payOrderNo,
                 amount: nextProps.charge.amount,
                 status: 'success'
               })
             } else if (result === 'fail') {
               let msg = ''
               if (typeof error === 'object') {
                 for (let k in error) {
                   msg += `${k}:${error[k]}`
                 }
               }
               if (typeof error === 'string') {
                 msg = error
               }
               goPayStatusPage(payResultUrl, {
                   orderNo: nextProps.charge.payOrderNo,
                   status: 'fail',
                   msg: msg
                 }
               )
             } else if (result === 'cancel') {
               goPayStatusPage(payResultUrl, {
                 orderNo: nextProps.charge.payOrderNo,
                 status: 'cancel',
                 msg: msg
               })
             }
           })
         }else if (status === 'pending' && nextStatus === 'fail'){
           goPayStatusPage(payResultUrl, {
             orderNo: nextProps.charge.payOrderNo,
             status: 'fail',
             msg: nextProps.charge.msg
           })
         }
     }
  }

  pay(e, orderNo) {
    e.preventDefault()
    const {status} = this.props.charge
    if (status === 'pending') {
      return
    }
    let channel = 'gidoorWallet'
    if(this.state.payType === 'wx'){
       channel ='wx_pub'
    }
    this.props.toPay( {'orderNo': orderNo,'channel': channel})
  }

  render() {
    const {account,data,ticket} = this.props
    let myAmount = -1
    if(ticket){
       myAmount =  account.amount ? account.amount/100.00:0
    }
    return (
      <div className="black-bg pd-t-0">
        <Payment
          data={data}
          toPay={::this.pay}
          platform='wx'
          payType={this.state.payType}
          selectPayType={::this.selectPayType}
          myAmount={myAmount}
        />
      </div>
    )
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
    toPay: function (data) {
      dispatch(toPayAction(data))
    },
    goPayStatusPage: (page, data) => {
      dispatch(push({pathname: page, query: data}))
    },
    toWalletPay: function (data) {
      dispatch(toWalletPayAction(data))
    },
    queryAccount:() => dispatch(queryAccount()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WxPayment)

WxPayment.propTypes = {
  getDetail: PropTypes.func.isRequired,
  orderNo: PropTypes.string.isRequired,
  data: PropTypes.object,
  toPay: PropTypes.func.isRequired,
  toWalletPay: PropTypes.func.isRequired,
  charge: PropTypes.object.isRequired,
  goPayStatusPage: PropTypes.func.isRequired,
  account: PropTypes.object,
  ticket: PropTypes.string
}

WxPayment.contextTypes = {
  intl: React.PropTypes.object.isRequired
}
