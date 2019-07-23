/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import greyX from 'static/img/recharge/greyX.png'
import phone from 'static/img/recharge/phone.png'
import pin from 'static/img/recharge/PIN.png'
import '../assets/Recharge.scss'
import Tappable from 'react-tappable'
import {toastr} from 'components/toastr'
import {sendSms,bind,changeSendStatus} from 'reducers/Recharge/bind'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'


class RechargeBind extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
        mobile:'',
        validCode:'',
        sendSmsCountdown: 61
    }
    this.timeId = null
    this.messages = context.intl.messages
  }

  componentWillUnmount () {
    clearTimeout(this.timeId)
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.bindStatus != this.props.bindStatus && nextProps.bindStatus ===1) {
      if(nextProps.backUrl){
        nextProps.handleTapEvent(nextProps.backUrl)
      }else{
        nextProps.handleTapEvent("/account")
      }
    }
  }

  sendSms() {
    if(!/^1[3-8][0-9]{9}$/.test(this.state.mobile)){
      toastr.error("bind.phoneerror")
      return;
    }
    this.setState({sendSmsCountdown: 60})
    this.props.sendSms(this.state.mobile)
    this.smsCountdown()
  }

  smsCountdown () {
    let {sendSmsCountdown } = this.state
    let _self = this
    if (sendSmsCountdown > 1 && this.props.smsSendStatus != -1) {
      _self.setState({sendSmsCountdown: sendSmsCountdown - 1})
      this.timeId = setTimeout(function () {
        _self.smsCountdown()
      }, 1000)
    } else {
      clearTimeout(this.timeId)
      _self.setState({sendSmsCountdown: 61})
      this.props.changeSendStatus();
    }
  }

  onChangeMobile(e){
    this.setState({mobile: e.target.value.substr(0,11)});
  }

  onChangeValidCode(e){
    this.setState({validCode: e.target.value.substr(0,6)});
  }

  isSmsSending() {
    if(this.state.sendSmsCountdown<61){
      return (
         <span className="btn-rebind-sendsms" >{this.state.sendSmsCountdown}s</span>
      )
    }else{
      return (
        <Tappable className="btn-rebind-sendsms" onTap={(e) => ::this.sendSms()}>
          <Text id="bind.sendpin" />
        </Tappable>
      )
    }
  }

  bindEvent() {
    if(!/^1[3-8][0-9]{9}$/.test(this.state.mobile)){
      toastr.error("bind.phoneerror")
      return;
    }
    if(!/^[0-9]{6}$/.test(this.state.validCode)){
      toastr.error("bind.codeerror")
      return;
    }
    this.props.bind(this.state.mobile,this.state.validCode)
  }

  clearInput(type){
    if(type===1){
      this.setState({mobile:''})
    }else{
      this.setState({validCode:''})
    }
  }

  render()
  {
    return (
      <div className="recharge">
        <div className="recharge-bind">
          <p>
            <Text id="bind.tip" />
          </p>
          <div className="rebind-phone">
            <img className="rebind-phoneImg1" src={phone} />
            <Text id='bind.mobile'>
              {(text) =><input type="tel"
                               placeholder={text}
                               value={this.state.mobile}
                               onChange={ (e) => this.onChangeMobile(e)} />}
            </Text>
            <Tappable onTap={(e) => this.clearInput(1)}>
              <img className="rebind-phoneImg2" src={greyX} />
            </Tappable>
          </div>
          <div className="rebind-validate">
            <div className="rebind-validate-con">
              <img className="rebind-validateImg1" src={pin} />
              <Text id='bind.pin'>
                {(text) =><input type="tel"
                                 placeholder={text}
                                 value={this.state.validCode}
                                 onChange={(e) =>this.onChangeValidCode(e)}/>}
              </Text>
            </div>
            <div className="btn-rebind-send">
              <Tappable className="rebind-validateImg2" onTap={(e) => this.clearInput(2)}>
                <img src={greyX} />
              </Tappable>
              {this.isSmsSending()}
            </div>
            <div className="clear"></div>
          </div>
          <Tappable onTap={(e) => this.bindEvent()}>
            <div className="btn-rebind">
              <Text id="bind" />
            </div>
          </Tappable>
        </div>
      </div>
    )
  }
}

RechargeBind.propTypes = {
  handleTapEvent: PropTypes.func.isRequired,
  sendSms: PropTypes.func.isRequired,
  bind: PropTypes.func.isRequired,
  changeSendStatus: PropTypes.func.isRequired,
  smsSending: PropTypes.bool.isRequired,
  smsSendStatus: PropTypes.number.isRequired,
  backUrl: PropTypes.string,
  bindStatus: PropTypes.number.isRequired
}

RechargeBind.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

const mapStateToProps = (state,props) => {
  return {
    smsSending: state.bind.smsSending ,
    smsSendStatus: state.bind.sendStatus,
    bindStatus: state.bind.bindStatus,
    backUrl: props.location.query.backUrl
  }
}

const mapDispatchToProps = (dispatch, props) => {
  console.log(props.location.query.backUrl)
  return {
    sendSms:(mobile) => dispatch(sendSms(mobile)),
    bind:(mobile,validCode) => dispatch(bind(mobile,validCode)),
    changeSendStatus:() => dispatch(changeSendStatus()),
    handleTapEvent:(path) => dispatch(push({pathname: path}))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeBind)

