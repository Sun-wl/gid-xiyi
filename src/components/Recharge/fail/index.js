/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import waring from "static/img/waring.png"
import '../assets/Recharge.scss'
import {Link} from 'react-router'

const  RechargeSuccess  = ({location}) =>{
  const {msg} = location.query
  return (
    <div className="recharge">
      <div className="recharge-success">
        <img src={waring} />
        <p><Text id="order.pay.fail" /></p>
        {msg?<p><Text id={msg} defaultMessage={msg}/></p>:<p/>}
        <Link to='/recharge'>
          <div className="recharge-successbtn">
            <Text id="done" />
          </div>
        </Link>
      </div>
    </div>
  )
}

RechargeSuccess.propTypes = {
  location: PropTypes.object.isRequired
}

export default RechargeSuccess
