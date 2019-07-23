/**
 * Created by evan on 2016/2/27.
 */

import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {FormattedMessage as Text} from 'react-intl'
import { sendSms } from 'reducers/Sms'
import { connect } from 'react-redux'


class SendMobileCodeInput extends Component {

  _bind (...methods) {
    methods.forEach((method)=>this[method] = this[method].bind(this))
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      sendSmsCountdown: 61,
      timeId: null,
      modifyMobile: props.initMobile,
      initMobile: props.initMobile
    }
    this._bind('smsCountdown')

  }

  sendVerifyCode () {
    const {fieldMobile, sendVerifyCode} = this.props
    fieldMobile.onBlur(this.refs.fieldMobile)
    if (!fieldMobile.error) {
      if(this.state.initMobile === fieldMobile.value){
        this.setState({modifyMobile: this.state.initMobile})
      }else{
        sendVerifyCode(fieldMobile.value)
        this.smsCountdown(0)
      }
    }
  }

  modifyMobileNo () {
    this.setState({modifyMobile: undefined})
  }

  smsCountdown (c) {
    let {sendSmsCountdown, timeId } = this.state
    let _self = this
    if (sendSmsCountdown > 1 && (this.props.smsSendStatus != -1 || c == 0)) {
      _self.setState({sendSmsCountdown: sendSmsCountdown - 1})
      timeId = setTimeout(function () {
        _self.smsCountdown(c + 1)
      }, 1000)
    } else {
      clearTimeout(timeId)
      _self.setState({sendSmsCountdown: 61})
    }
  }

  render () {
    const {fieldVerifyCode, fieldMobile, smsSending} = this.props
    if (this.state.modifyMobile && !fieldMobile.dirty && !fieldVerifyCode.dirty )
      return (
        <div>
          <div className='pd-t-15 form-item'>
            <div className='float-l w-22'>
              <label><Text id='order.from.phone'/></label>
            </div>
            <div className='float-l w-43'>{this.state.modifyMobile}</div>
            <div className='float-l w-35'>
              <button type='button' className='vb' onClick={::this.modifyMobileNo}>
                <Text id='order.modify.phone'/>
              </button>
            </div>
          </div>
        </div>
      )
    else {
      return (
        <div>
          <div className='pd-t-15 form-item'>
            <div className='float-l w-22'>
              <label><Text id='order.from.phone'/></label>
            </div>
            <div className='float-l w-42'>
              <Text id='order.from.phone.hint'>
                {(text) =>
                  <input type="tel" ref="fieldMobile"
                    className={classnames({'n-input':true,'error':fieldMobile.error && fieldMobile.touched })}
                    placeholder={text}  {...fieldMobile}/>}
              </Text>
            </div>
            <div className='float-l w-35'>
              <button type='button'
                className={classnames({vb:true,'sms-disable':(smsSending || this.state.sendSmsCountdown<=60)})}
                onClick={::this.sendVerifyCode}
                disabled={(smsSending || this.state.sendSmsCountdown<=60)}>
                {this.state.sendSmsCountdown <= 60 ?
                  <Text id='order.from.send' values={{countDown:[this.state.sendSmsCountdown]}}/> :
                  <Text id='order.from.send.normal' values={{countDown:""}}/>
                }
              </button>
            </div>
          </div>
          <div className='pd-t-15 form-item'>
            <div className='float-l w-22'>
              <label><Text id='order.from.code'/></label>
            </div>
            <div className='float-l w-43'>
              <Text id='order.from.code.hint'>
                {(text) =>
                  <input ref="fieldCode"
                    className={classnames({'n-input':true, 'error':fieldVerifyCode.error  && fieldVerifyCode.touched})}
                    {...fieldVerifyCode} placeholder={text}/>}
              </Text>
            </div>
          </div>
        </div>
      )
    }
  }
}


SendMobileCodeInput.propTypes = {
  fieldVerifyCode: PropTypes.object.isRequired,
  sendVerifyCode: PropTypes.func.isRequired,
  fieldMobile: PropTypes.object.isRequired,
  smsSending: PropTypes.bool,
  smsSendStatus: PropTypes.number.isRequired,
  initMobile: PropTypes.string
}


const mapDispatchToProps = (dispatch) => {
  return {
    sendVerifyCode:(data) => {
      dispatch(sendSms(data))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    smsSending: state.sms.smsSending ,
    smsSendStatus: state.sms.sendStatus
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(SendMobileCodeInput)
