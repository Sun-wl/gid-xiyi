/**
 * Created by Administrator on 2016/3/1.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import _ from 'lodash'
import MapAdapt from './MapAdapt'
import arrowSelectImg from 'static/img/arrow_select.png'
import  classnames from 'classnames'

class AMapAddressInput extends Component {

  constructor (props, context) {
    super(props, context)
    this.locale =  context.intl.locale
    this.addressNotFound = context.intl.messages['order.address.notFound']
    this.state = {tips:[], ampStatus:'init', isComplete:false}
    this.dispatch = context.store.dispatch
    this.autoComplete = new MapAdapt(props.city,this.locale)
  }

  componentDidMount(){
    this.autoComplete.initMap(this.props.city,this.locale)
  }
  componentDidUpdate(){
    this.autoComplete.initMap(this.props.city,this.locale)
  }

  searchClean(data) {
    const self = this
    const {details,...address} = data
    _.mapKeys(address, function (value, key) {
      self.dispatch({
        type: 'redux-form/CHANGE',
        field: key,
        value: value,
        touch: true,
        form: 'addressForm'
      })
    })
      _.mapKeys(details, function (value, key) {
      self.dispatch({
        type: 'redux-form/CHANGE',
        field: 'details.' + key,
        value: value,
        touch: true,
        form: 'addressForm'
      })
    })
  }

  clickLocation (obj) {
    const self = this
    let address =''
    let data = {}
     if(this.locale === 'zh'){
       address = obj.name
       data = {
         poiId:obj.id,
          address:address,
          point:obj.location.lng + "," + obj.location.lat,
          details:{
            detail:obj.address
          }
       }
     }else{
       address =`${obj.name}(${obj.address})`
       data = {
         poiId:obj.id,
         address:address,
         point:obj.location.lng + "," + obj.location.lat
       }
     }
    this.searchClean(data)
    this.setState({tips:[],isComplete:true})
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.city  && nextProps.city){
      this.autoComplete.setCity(nextProps.city)
    }
    if(this.props.city && nextProps.city !== this.props.city){
      this.autoComplete.setCity(nextProps.city)
      this.searchClean(
        {
          poiId:'',
          address:'',
          point:'',
          details:{
            detail:'',
            room:'',
            floor:'',
            building:'',
          }
        }
      )
      this.setState({address:'',tips:[]})
    }
  }

  handlerChange (e) {
    let _self = this
    _self.props.address.onChange(e)
    if(!(e.target.value) || e.target.value.trim().length <= 1){
       _self.setState({tips:[], ampStatus:'ok'})
    }else{
      this.autoComplete.setLang(this.locale)
      this.autoComplete.search(e.target.value, function (status,result){
          if(status === 'complete' && result.info === 'OK'){
            _self.setState({tips:_.uniqWith(
                _.filter(result.poiList.pois,o=>o.name&&o.address&&o.location&&o.address.length>2&&o.address.length>2),
                function (t,o){return t.id===o.id}), ampStatus:'ok'})
          }else{
            _self.setState({tips:[], ampStatus:'no_data'})
          }
        })
    }
    if(this.state.isComplete){
       _self.setState({isComplete:false})
    }
  }

  render () {
    const {address} = this.props
    const tipsList = _.map(this.state.tips,
        tip => (
          <li key={tip.id} onClick={()=>this.clickLocation(tip)}>
            <div className="float-l left">
              <span className="bk-f">{tip.name}</span>
              <div className="hs-f">{tip.address} </div>
            </div>
            <div className="float-r right">
              <img src={arrowSelectImg} />
            </div>
            <div className="clear"></div>
          </li>
          )
    )
    const inputAddressHtml =(text)=>{
      return (
        <textarea
          className={classnames({'error':this.props.address.error && this.props.address.touched})}
          autoComplete="off"
          placeholder={text}
          {...address}
          onChange={::this.handlerChange}/>
      )
    }

    return (
      <div className="auto-complete">
        <Text id='order.from.address.hint'>
          {(text) =>  inputAddressHtml(text)}
        </Text>
        <div className="result">
           {
             this.state.ampStatus === 'no_data'?
             (<div className='notfound'>{this.addressNotFound}</div>):
             (<ul>{tipsList}</ul>)
           }
        </div>
      </div>
    )
  }
}



AMapAddressInput.propTypes = {
  address: PropTypes.object.isRequired,
  city: PropTypes.string.isRequired
}
AMapAddressInput.contextTypes = {
  intl: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
}

export default  AMapAddressInput
