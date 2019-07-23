/**
 * Created by evan on 2016/6/17.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import classnames from 'classnames'
import {formatterDateMMdd, getWeekName, getDateMMdd} from 'common'
import './assets/deliveryTime.scss'
import {toastr} from 'components/toastr'
import _ from 'lodash'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll-probe'

class TimePicker extends Component {

  constructor(props, context) {
    super(props, context)

    const {time,day} = props.dateList
    this.state = {
      hiddenTimePicker: true,
      time: ((_.filter(time, (item)=> item.selected)[0]) || {}).value,
      day: ((_.filter(day, (item)=> item.selected)[0]) || {}).value
    }
    this.lang = context.intl.locale

  }

  componentWillReceiveProps(nextProps) {
    const nextDateList = nextProps.dateList
    const dateList = this.props.dateList
    if(!_.isEqual(nextDateList,dateList)){
      let time = _.find(nextDateList.time, o=> o.value === this.state.time && o.enabled)
      if(!time){
        time =  _.find(nextDateList.time,o=>o.enabled)
      }
      let day = _.find(nextDateList.day,
          o=> getWeekName(o.value,this.lang) === getWeekName(this.state.day,this.lang)
          && o.enabled)
      if(!day){
        day =  _.find(nextDateList.day, o=>o.enabled)
      }
      this.setState({ time: time.value, day: day.value})
    }
  }

  componentDidMount(){
    const {field} = this.props
    if(!field.value) {
      this.confirmDateTime()
    }
  }

  componentDidUpdate(nextProps){
    if(nextProps.dateList.scrollEnd){
      const _this = this
      setTimeout(function () {
        if(_this.refs.iScroll){
          _this.refs.iScroll.withIScroll(function (iScroll) {
            iScroll.scrollTo(iScroll.maxScrollX, 0, 1000, '')
          })
        }
      },0)
    }
  }

  openTimePicker(){
    toastr.showOverlay()
    this.setState({hiddenTimePicker: false})
  }

  closeTimePicker(){
    this.setState({hiddenTimePicker: true})
    toastr.hideOverlay()
  }

  confirmDateTime(){
    const {field:{onChange} } = this.props
    const {day,time} = this.state
    this.closeTimePicker()
    if(this.lang === 'zh'){
      onChange(`${getDateMMdd(day,this.lang)} ${time || ''}`)
    }else{
      onChange(`${time || ''} ${getDateMMdd(day,this.lang)}`)
    }
    if(this.props.ok){
      this.props.ok({time:this.state.time,day:this.state.day})
    }
  }

  clickDayItem(item){
    this.setState({day:item})
  }

  renderDate(){
    const dateList = this.props.dateList
    const {day} = this.state
    return (
      _.map(dateList.day, (item,index)=>{
         let weekName = getWeekName(index ===0?7:item.value ,this.lang)
         if(item.enabled){
           return (
             <li key={weekName}
                  className={classnames("item", {'choose':(getWeekName(day,this.lang) == weekName )})}
                  onClick={() => {this.clickDayItem(item.value)}}>
               <div>{weekName}</div>
               <div>{formatterDateMMdd(item.value)}</div>
             </li>
           )
         }else{
           return (
             <div key={weekName} className="item disable">
               <div>{weekName}</div>
               <div>{formatterDateMMdd(item.value)}</div>
             </div>
           )
         }
      })
    )
  }

  clickTimeItem(item){
    this.setState({time:item})
  }

  renderTime(){
    const dateList = this.props.dateList
    return (
      _.map(dateList.time, item =>{
         if(item.enabled){
           return (
             <div key={item.value}  onClick={()=> this.clickTimeItem(item.value)}
                  className={classnames("item",{'choose':(this.state.time === item.value)})}>
               {item.value}
             </div>
           )
         }else{
            return ( <div key={item.value} className="disable item">{item.value}</div>)
         }
      })
    )
  }

  render() {
    const {field, placeholder,iconImg,type} = this.props
    let element = (
      <div className={classnames({'eng-address':true,'error':field.error  && field.touched})}
           onClick={::this.openTimePicker}>
        <img src={iconImg}/>
        {field.value || <span className="hint-span"><Text id={placeholder}/></span>}
      </div>
    )
    if(this.state.hiddenTimePicker){
      return  element
    }else{
     return(<span>
          {element}
          <div>
            <div className="time-select">
              <div className="title">
                <div className="float-l" onClick={::this.closeTimePicker}><Text id="cancel"/></div>
                <span className="name"><Text id={placeholder}/></span>
                <div className="float-r lvs" onClick={::this.confirmDateTime}><Text id="done"/></div>
              </div>
              <div className="body">
                   <ReactIScroll
                     iScroll={iScroll}
                     ref='iScroll'
                     options={{scrollbars: false, scrollX:true, click:true}}>
                     <ul className={classnames({'dateJingXi':type == 'jingxi','date': true})}>
                        {this.renderDate()}
                     </ul>
                   </ReactIScroll>
                <div className="time">
                   {this.renderTime()}
                  <div className="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </span>)
    }
  }
}

TimePicker.propTypes = {
  placeholder: PropTypes.string.isRequired,
  iconImg: PropTypes.any.isRequired,
  field: PropTypes.object.isRequired,
  dateList: PropTypes.object.isRequired,
  ok: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}
TimePicker.contextTypes = {
  intl: React.PropTypes.object.isRequired
}
export default  TimePicker
