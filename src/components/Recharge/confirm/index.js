/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import ConfirmHead from './ConfirmHead'
import ConfirmFoot from './ConfirmFoot'
import '../assets/Recharge.scss'
import {connect} from 'react-redux'
import {wechatpay} from 'reducers/Recharge/confirm'
import pingpp from 'plugins/pay'
import {push} from 'react-router-redux'
import {toastr} from 'components/toastr'

class RechargeConfirm extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
  }

  componentWillReceiveProps(nextProps) {
    const {payResult,errorMsg,status} = this.props

    if (status === 'pending' && nextProps.status === 'success') {
      pingpp.createPayment(nextProps.charge,  (result, error) =>{
        if (result === 'success') {
           payResult('/recharge/success')
        }else if (result === 'cancel'){
           payResult('/recharge/fail',{msg:'order.pay.cancel'})
        }else {
          let msg = ''
          if (typeof error === 'object') {
            for (let k in error) {
              msg += `${k}:${error[k]}`
            }
          }
          if (typeof error === 'string') {
            msg = error
          }
         payResult('/recharge/fail',{msg:msg})
        }
      })
    }if (status === 'pending' && nextProps.status === 'fail') {
       //payResult('/recharge/fail',{msg:errorMsg})
       toastr.error(errorMsg)
    }
  }

  render() {
    const {reward,amount, wechatpay} = this.props
    return (
      <div className="recharge">
        <ConfirmHead reward={reward} amount={amount}/>
        <ConfirmFoot  wechatpay={wechatpay} />
      </div>
    )
  }
}

RechargeConfirm.propTypes = {
  amount: PropTypes.string.isRequired,
  reward: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  charge: PropTypes.string,
  errorMsg: PropTypes.string,
  wechatpay: PropTypes.func.isRequired,
  payResult: PropTypes.func.isRequired
}

RechargeConfirm.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

const mapStateToProps = (state,ownProps) => {
  const {amount,reward} = ownProps.location.query
  return {
    amount:amount,
    reward:reward,
    status:state.confirm.status,
    charge:state.confirm.charge,
    errorMsg:state.confirm.errorMsg
  }
}


const mapDispatchToProps = (dispatch, props) => {
  return {
    wechatpay:() => dispatch(wechatpay(props.location.query.amount)),
    payResult:(path,query) => dispatch(push({pathname:path,query:query}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeConfirm)
