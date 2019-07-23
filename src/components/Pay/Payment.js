/**
 * Created by Administrator on 2016/5/3.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import wechatPay  from './assets/wechat_pay.png'
import checked  from './assets/checked_ora.png'
import circle  from './assets/circle.png'
import alipay  from './assets/alipay.png'
import wallet  from 'static/img/wallet.png'
import "./assets/pay.scss"
import _ from 'lodash'

const couponPrice = (g)=> {
  if (g.price < 0 && g.price >= -100) {
      return (<Text id='order.discount.percent' values={{
            percent:Math.abs(g.price)/10,
            percent1:100-Math.abs(g.price)}}/>)
  } else if (g.price < -100 && g.num ===0) {
      return (<Text id='order.discount' values={{price:Math.abs(g.price/100.00)}}/>)
  } else if (g.price < -100 && g.num >0) {
      return (<Text id='order.discount.bag' values={{price:Math.abs(g.price/100.00)}}/>)
  } else {
     return (<span />)
  }
}

const couponInfo = (items) => {
  if(items.length>0){
    return (
      <div key={0}>
        <div className="serviceName"><Text id='order.details.promocode'/></div>
        <div>
          <table className="order-info-list">
            <tbody>
            {couponInfoItem(items)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }else {
    return (<div/>)
  }
}

const couponInfoItem = (items) => {
  return _.map(items, (v, i)=>{
      if(v.itemType != 120){
        return (
          <tr className='txt-red' key={v.code}>
            <td className='td-l'>{v.name}</td>
            <td className='td-r'>
              {couponPrice(v)}
            </td>
          </tr>
        )
      }else {
        return (
          <tr className='txt-red' key={v.code}>
            <td className='td-l'>{v.name}</td>
            <td className='td-r'>
              -<Text id='currency' values={{price:'' + Math.abs(v.price/100.00)}} />
            </td>
          </tr>
        )
      }
  })
}

const walletPay = (selectPayType,payType,couponexist,myAmount) =>{
   if(!couponexist){
     return (
       <li>
         <div className="float-l">
           <img src={wallet} className="imgOne"/>
         </div>
         <div className="float-l desc">
           <div className="pay-title">
             {myAmount <0 ? <Text id='pay.payment.wallet1'/>:<Text id='pay.payment.wallet' values={{amount:""+myAmount}} />}
           </div>
           <div className="pay-desc"><Text id='pay.payment.wallet.desc'/></div>
         </div>
         <div className="float-r">
           {payType==='wallet'? <img src={checked} className="imgTwo"/>:<img src={circle} className="imgTwo" onClick={(e) => selectPayType('wallet')}/>}
         </div>
         <div className="clear"></div>
       </li>
     )
   }else {
     return (<span/>)
   }
}

const payTypeView = (platform, selectPayType, payType,couponexist,myAmount) =>{
   if(platform === 'wx'){
     return (
       <ul className="bd pay-type">
         {walletPay(selectPayType,payType,couponexist,myAmount)}
         <li className="last-li">
           <div className="float-l">
             <img src={wechatPay} className="imgOne"/>
           </div>
           <div className="float-l desc">
             <div className="pay-title"><Text id='pay.payment.weixin'/></div>
             <div className="pay-desc"><Text id='pay.payment.weixin.desc'/></div>
           </div>
           <div className="float-r">
             {payType==='wx'? <img src={checked} className="imgTwo"/>:<img src={circle} className="imgTwo" onClick={(e) => selectPayType('wx')}/>}
           </div>
           <div className="clear"></div>
         </li>
       </ul>
     )
   }else{
      return (
        <ul className="bd pay-type">

          {walletPay(selectPayType,payType,couponexist,myAmount)}

          <li>
            <div className="float-l">
              <img src={alipay} className="imgOne"/>
            </div>
            <div className="float-l desc">
              <div className="pay-title"><Text id='pay.payment.alipay'/></div>
              <div className="pay-desc"><Text id='pay.payment.alipay.desc'/></div>
            </div>
            <div className="float-r">
              {payType==='alipay' ? <img src={checked} className="imgTwo"/>:<img src={circle} className="imgTwo" onClick={(e) => selectPayType('alipay')}/>}
            </div>
            <div className="clear"></div>
          </li>
          <li className="last-li">
            <div className="float-l">
              <img src={wechatPay} className="imgOne"/>
            </div>
            <div className="float-l desc">
              <div className="pay-title"><Text id='pay.payment.weixin'/></div>
              <div className="pay-desc"><Text id='pay.payment.weixin.desc'/></div>
            </div>
            <div className="float-r">
              {payType==='wx'? <img src={checked} className="imgTwo"/>:<img src={circle} className="imgTwo" onClick={(e) => selectPayType('wx')}/>}
            </div>
            <div className="clear"></div>
          </li>
        </ul>
      )
   }
}

const dataList = (list) => {

  return _.map(list, item => {
    return (
      <tr key={item.code}>
        <td>{item.name}</td>
        <td>{item.itemType=='107'?'':`x${item.num}`}</td>
        <td><Text id='currency' values={{price:'' + (item.price/100.00)}} /></td>
      </tr>)
  })

}

const service = (list, serviceName,key) => {
  if (!list || list.length < 1) {
    return (<div></div>)
  }
  return (
    <div key={key}>
      <div className="serviceName">{serviceName}</div>
      <div>
        <table className="order-info-list">
          <tbody>
          {dataList(list)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Payment = ({data, toPay, platform, selectPayType, payType,myAmount}) => {
  const amount = data.feePrice.collectionMoney

  const goods = _.filter(data.goods.items, o=>o.itemType == 1)
  const coupon = _.filter(data.goods.items, o=>o.itemType == 2||o.itemType==120)
  const couponexist = (_.filter(data.goods.items, o=>o.itemType == 2).length>0)
  const iron = _.sortBy(_.filter(data.goods.items, o=> (o.itemType > 2 && o.itemType <= 6)), o=> o.itemType)
  const jingxi= _.sortBy(_.filter(data.goods.items, o=> (o.itemType > 100 && o.itemType <= 107)), o=> o.itemType)

  return (
    <div className="payment-page">
      <div className="bd order-info">
        <div className="title">
          <div>
            <Text id='order.details.no'/>
            <span className="float-r">{data.orderNo}</span>
          </div>
        </div>
        <div className="clear"></div>

        {service(goods, (<Text id='service.laundry'/>),1)}
        {service(iron, (<Text id='service.iron'/>),2)}
        {service(jingxi, (<Text id='service.jingxi'/>),3)}
        {couponInfo(coupon)}
        <ul className="info">
          <li>
            <div className="float-l ot"><Text id='order.details.total.price'/></div>
            <div className="float-r price">
              <Text id='currency' values={{price:''+(data.feePrice.collectionMoney/100.00)}}/>
            </div>
            <div className="clear"></div>
          </li>
        </ul>
      </div>

      <div className="hint">
        <Text id='pay.payment.option'/>
      </div>
      {payTypeView(platform, selectPayType, payType, couponexist, myAmount)}
      <button className="release-btn rb-able-pay" onClick={(e)=> toPay(e, data.orderNo, amount)}>
        <Text id='pay.payment.pay'/>&nbsp;
        <Text id='currency' values={{price:''+(amount/100.00)}}/>
      </button>
    </div>)
}

Payment.propTypes = {
  data: PropTypes.object,
  toPay: PropTypes.func.isRequired,
  platform: PropTypes.string.isRequired,
  selectPayType: PropTypes.func,
  payType: PropTypes.string,
  myAmount:PropTypes.number
}

export default  Payment
