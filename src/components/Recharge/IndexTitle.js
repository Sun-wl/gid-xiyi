/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'

const  IndexTitle  =({account}) => {
  return (
    <div className="inti">
      <p className="inti-name"><Text id="recharge.yue" /></p>
      <div className="inti-content">
        <p className="inti-money">{account.amount/100.00}</p>
        <p className="inti-account"><Text id="recharge.account" />:{account.username}</p>
      </div>
    </div>
  )
}

export default IndexTitle

