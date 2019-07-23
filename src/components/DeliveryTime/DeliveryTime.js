/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import { FormattedMessage as Text } from 'react-intl'
import TimePicker from './TimePicker'
import pickpImg from 'static/img/pickup.png'
import dropoffImg from 'static/img/dropoff.png'
import _ from 'lodash'
import {DELIVER_TIME} from 'common'


class DeliveryTime extends Component {

  constructor(props, context) {
    super(props, context)
  }

  dayRange (type) {
    const date0 = new Date()
    const date1 = new Date(date0)
    const date2 = new Date(date0.setDate(date0.getDate() + 1))
    const date3 = new Date(date0.setDate(date0.getDate() + 1))
    return [
      {enabled:false,value:date1,selected:false},
      {enabled:type==='take',value:date2,selected:type==='take'},
      {enabled:type==='delivery',value:date3,selected:type==='delivery'},
    ]
  }

  takeTimeRange() {
    return  _.map(DELIVER_TIME, (item,index) => {
      var hour = new Date().getHours();
      if(hour<17){
        if(index === 0){
          return {enabled:true,value:item,selected:true}
        }
        if(index === 1){
          return {enabled:true,value:item}
        }
      }else {
        if(index === 0){
          return {enabled:false,value:item}
        }
        if(index === 1){
          return {enabled:true,value:item,selected:true}
        }
      }
      return {enabled:true,value:item}
    })
  }

  okTakeTimePicker(obj){
    const value = `tomorrow|${obj.time}`
    const {deliveryTime,deliveryTimeValue,takeTimeValue} = this.props
    if(takeTimeValue.value !== value){
       deliveryTime.onChange('')
       deliveryTimeValue.onChange('')
       takeTimeValue.onChange(`tomorrow|${obj.time}`)
    }
  }

  okDeliveryTimePicker(obj){
    const value = `afterTomorrow|${obj.time}`
    const {deliveryTimeValue} = this.props
    if(deliveryTimeValue.value !== value){
      deliveryTimeValue.onChange(value)
    }
  }


  deliveryTimeRange() {
    let regx = /(\d+:\d+-\d+:\d+)/
    let takeTimeValue = (this.props.takeTime.value||'').replace(/\s+/g,"")
    let res = takeTimeValue.match(regx)
    let time
    if(res && res.length>1){
      time = res[1]
    }
    let index=0
    return  _.map(DELIVER_TIME, (item) => {
      if(item<time){
        return {enabled:false,value:item}
      }else{
        if(index === 0){
          return {enabled:true,value:item, selected:true}
        }
        index++
        return {enabled:true,value:item}
      }
    })
  }

  takeTimeDateList(){
    return {
      time:this.takeTimeRange(),
      day:this.dayRange("take")
    }
  }

  deliveryDateList(){
    return {
      time:this.deliveryTimeRange(),
      day:this.dayRange("delivery")
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.remark !== nextProps.remark ||
      this.props.takeTime !== nextProps.takeTime ||
      this.props.deliveryTime !== nextProps.deliveryTime
  }

  render() {
    const {remark, takeTime, deliveryTime} = this.props
    return (
      <section className='bd'>
        <div className='form-item'>
          <TimePicker
            iconImg={pickpImg}
            field={takeTime}
            dateList={this.takeTimeDateList()}
            ok={::this.okTakeTimePicker}
            placeholder='order.delivery.take.time.hint' />
        </div>
        <div className='pd-t-15 form-item'>
          <TimePicker
            iconImg={dropoffImg}
            field={deliveryTime}
            dateList={this.deliveryDateList()}
            ok={::this.okDeliveryTimePicker}
            placeholder='order.delivery.delivery.time.hint' />
        </div>
        <div className='pd-t-15 form-item'>
          <div className="boder-div">
            <Text id='order.delivery.remark.hint'>
              {(text) => <input  {...remark} placeholder={text} />}
            </Text>
          </div>
        </div>
        <div className='clear'></div>
      </section>
    )
  }
}


DeliveryTime.propTypes = {
  remark: PropTypes.object.isRequired,
  takeTime: PropTypes.object.isRequired,
  deliveryTime: PropTypes.object.isRequired,
  deliveryTimeValue: PropTypes.object.isRequired,
  takeTimeValue: PropTypes.object.isRequired
}

export default DeliveryTime
