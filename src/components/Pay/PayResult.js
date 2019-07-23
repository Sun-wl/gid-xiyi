import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {FormattedMessage as Text} from 'react-intl'
import check from "static/img/check.png"
import waring from "static/img/waring.png"


const successInfo = (amount)=>(
  <div>
    <div className='text-c'>
      <img src={check} className='chkImg'/>
    </div>
    <div className='text-c chkText'>
      <Text id='order.pay.success'/>
    </div>
    <div className='text-c chkinfo'>
      <Text id='order.pay.amount' values={{amount:amount/100.00}}/>
    </div>
  </div>
)

const failInfo = (msg)=>(
  <div>
    <div className='text-c'>
      <img src={waring} className='chkImg'/>
    </div>
    <div className='text-c chkText chkerror'>
      <Text id='order.pay.fail'/>
    </div>
    <div className='text-c chkinfo'>{msg}</div>
  </div>
)

const cancelInfo = ()=>(
  <div>
    <div className='text-c'>
      <img src={waring} className='chkImg'/>
    </div>
    <div className='text-c chkText chkerror'>
      <Text id="order.pay.cancel"/>
    </div>
    <div className='text-c chkinfo'></div>
  </div>
)

const image = (locale) => (<div className='text-c mg-t-13'>
  <img src={locale=== 'zh'? '/img/reminder.jpg' :'/img/reminder.en.png'} className='chkdescImg'/>
</div>)


class PayResult extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
    this.locale = context.intl.locale
  }

  render() {
    const {amount, status, msg, platform} = this.props.location.query
    return (
      <div className="black-bg">
        {status === 'success' ? successInfo(amount) : (status==='cancel'? cancelInfo():failInfo(msg))}
        <div className='release-footer'>
          <Link to='/order/list'>
            <button className='release-btn rb-able'>
              <Text id="order.pay.details"/>
            </button>
          </Link>
        </div>
        {platform === 'wx' && image(this.locale)}
      </div>
    )
  }
}

PayResult.propTypes = {
  location: PropTypes.object.isRequired
}

PayResult.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

export default PayResult
