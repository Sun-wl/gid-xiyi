/**
 * Created by evan on 2016/2/24.
 */
import React, {PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import _ from 'lodash'
import classnames from 'classnames'
import quanImg from 'static/img/quan.png'
import zheImg from 'static/img/zhe.png'
import rmbImg from 'static/img/rmb.png'
import used_large from 'static/img/used_large.png'
import couponImg from 'static/img/coupon.png'
import {currLang, formatCity} from 'common'

const couponListPanel = (list, selectedCoupon, selected) => {
  return _.map(list, item => {
    return (
      <li key={item.id} onClick={() =>selectedCoupon(item)}>
        <div className="item">
          <div className={classnames({userd:true,'hide-d':selected.id != item.id})}>
            <img className="uImg" src={used_large}/>
          </div>
          {(currLang == "en") ? (<img src={quanImg} className="quan"/>) : <span className="quan"/>}
          <div className="float-l coupon-body">
            <div className="content">
              <div>
                <span className="title">{item.name}</span>
                <div className="dashedline"></div>
              </div>
              <div>
                {item.remark}<br />
                {(item.city ? (
                  <span className="hint">
                    (<Text id='coupon.use.region' values={{city:formatCity(item.city)}}/>)</span>) : <span />)
                }
                <div className="dashedline-two"></div>
              </div>
              <div>
                {item.endDate && <Text id='coupon.valid.date' values={{date:item.endDate}}/>}
              </div>
            </div>
          </div>
          {formatCouponAmount(item)}
        </div>
      </li>
    )
  })
}

const formatCouponAmount = (item) => {

  if (item.amount > 100) {
    if (currLang == "en") {
      return (
        <div className="tc float-l right yellow">
          <img src={rmbImg} className="enRmb"/>
          <span className="number">{item.amount / 100.00}</span>
        </div>
      )
    } else {
      return (
        <div className="tc float-l right yellow">
          <span className="number">{item.amount / 100.00}</span>
          <span className="dis">元</span>
        </div>
      )
    }
  } else {
    if (currLang == "en") {
        return (
          <div className="tc float-l right green">
            <span className="number">{(100 - item.amount)}</span>
            <img src={zheImg} width='19px'/>
          </div>
        )
    }else{
      return (
        <div className="tc float-l right green">
          <span className="number">{item.amount / 10.0}</span>
          <span className="dis">折</span>
        </div>
      )
    }
  }
}

const CouponListItem = (props) => {
  const {data, selectedCoupon, selected, isLoading} = props
  if (data.length < 1 && !isLoading) {
    return (<div className="tc no-coupon"><img src={couponImg}/>
      <div className="tc"><Text id='no-coupon'/></div>
    </div> )
  } else {
    return (
      <ul className="couponList">
        {couponListPanel(data, selectedCoupon, selected)}
      </ul>
    )
  }
}
CouponListItem.propTypes = {
  data: PropTypes.array.isRequired,
  selectedCoupon: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
}
export default CouponListItem
