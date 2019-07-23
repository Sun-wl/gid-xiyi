/**
 * Created by evan on 2016/2/24.
 */

import React,{PropTypes} from 'react'
import { FormattedMessage as Text } from 'react-intl'
import _ from 'lodash'
import classnames from 'classnames'


const OrderInfo = ({data}) => {

  const {order,toPay,payActionStatus} = data
  const amount = (order.feePrice.collectionMoney || 0) / 100.00
  const goods = _.filter(order.goods.items, o=>o.itemType == 1)
  const coupon = _.filter(order.goods.items, o=>o.itemType == 2||o.itemType==120)
  const iron = _.sortBy(_.filter(order.goods.items, o=> (o.itemType > 2 && o.itemType <= 6)), o=> o.itemType)
  const jingxi = _.sortBy(_.filter(order.goods.items, o=> (o.itemType > 100 && o.itemType <= 107)), o=> o.itemType)
  const daixidefault = (goods.length < 1 && jingxi.length <1)

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

  const service = (list, serviceName,key, tag) => {
    if(tag){
      return (
        <div key={key}>
          <div className="serviceName">{serviceName}</div>
          <div>
            <table className="order-info-list">
              <tbody>
              <tr>
                <td>
                  <Text id='order.waitinfo'/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    if (list.length < 1) {
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

  const payAction = (order) => {

    if(order.allowPay){

      return (
        <span className='payAction mg-l-10' onClick={(e) => toPay(e, order.orderNo)}>
          <Text id={payActionStatus === 'pending' ? 'processing':'order.pay.action'}/>
        </span>
      )
    }else{

      return (<span></span>)
    }
  }

  const signCode = (order) => {
    if (order.payStatus === 2 && order.status === 13) {
      return (<span className='txt-red float-r'><Text id='order.signCode' values={{code:order.signCode}}/></span>)
    } else {
      return (<span/>)
    }
  }

  if (order.status > 2) {
    return (
      <section className='bd'>
        <span><Text id='order.details.info'/></span>
        {signCode(order)}
        <div className='line'></div>
        {service(goods, (<Text id='service.laundry'/>),1,daixidefault)}
        {service(iron, (<Text id='service.iron'/>),2)}
        {service(jingxi, (<Text id='service.jingxi'/>),3)}
        {couponInfo(coupon)}
        <div className='line'></div>
        <div className="pd-t-10 text-c">
          <div className="float-l"><Text id='order.details.total.price'/></div>
          {(order.allowPay || order.payStatus ===2 )
            ? (<span><Text id='currency' values={{price: '' + amount}}/></span>)
            : (<span></span>)}
          <div className="float-r">{order.allowPay ? payAction(order) : order.payStatusText}</div>
        </div>
        <div className='clear'></div>
      </section>
    )
  } else {
    return (
      <section className='bd'>
        <span><Text id='order.details.info'/></span>
        <div className='line'></div>
        {service(goods, (<Text id='service.laundry'/>),1,daixidefault)}
        {service(iron, (<Text id='service.iron'/>),2)}
        {service(jingxi, (<Text id='service.jingxi'/>),3)}
        {couponInfo(coupon)}
        <div className='line'></div>
        <div className="pd-t-10  text-c">
          <div className="float-l"><Text id='order.details.total.price'/></div>
          {(order.allowPay || order.payStatus ===2 )
            ? (<span><Text id='currency' values={{price: '' + amount}}/></span>)
            : (<span></span>)}
          <div className="float-r">{order.allowPay ? payAction(order) : order.payStatusText}</div>
        </div>

        <div className='clear'></div>
      </section>
    )
  }
}

OrderInfo.propTypes = {
  data: PropTypes.object.isRequired
}


export default OrderInfo
