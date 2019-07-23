/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import weixinImg from 'static/img/recharge/wechat_pay.png'
import Tappable from 'react-tappable'

const  ConfirmFoot = ({wechatpay}) =>{
  return (
    <div className="cofo">
      <div className="cofo-clearline">
        <div className="cofo-line">
          <div className="cofo-line-back"></div>
          <div className="cofo-line-bd"><span className="cofo-line-bdcon"><Text id="recharge.payment" /></span></div>
        </div>
      </div>
      <div className="cofo-pay">
        <Tappable onTap={wechatpay} className="cofo-btn-pay">
          <img src={weixinImg} /> <Text id="recharge.wechatpay" />
        </Tappable>
      </div>
    </div>
  )
}

ConfirmFoot.propTypes = {
  wechatpay: PropTypes.func.isRequired
}

export default ConfirmFoot
