/**
 * Created by evan on 2016/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import {reduxForm} from 'redux-form'
import {DeliveryTime,JingxiDeliveryTime} from 'components/DeliveryTime'
import CouponInput from 'components/Coupon/CouponInput'
import IroningInput from 'components/Ironing/IroningInput'
import JingxiShow from 'components/Jingxi/JingxiShow'
import Button from 'components/Button'
import Protocol from 'components/Protocol'
import {addOrder, hideTips, selectContact,dynDetails} from 'reducers/Order/Add'
import {jingxiConfirm} from 'reducers/Jingxi'
import {ironSelectedClean} from 'reducers/Ironing'
import {push} from 'react-router-redux'
import {localStorage, formatCity,requireFields} from 'common'
import {toastr} from 'components/toastr'
const validateContact = requireFields('id')
import Tappable from 'react-tappable'
import classnames from 'classnames'

const validateDelivery = requireFields('takeTime', 'deliveryTime')

const validate = data => {
  const errors = {}
  if (typeof data.protocol !== 'undefined' && !(data.protocol)) {
    errors.protocol = true
  }
  errors.contact = validateContact(data.contact)

  errors.delivery = validateDelivery(data.delivery)

  return errors
}


const submitForm = (data, dispatch) => {

  let {takeTimeValue, deliveryTimeValue, remark} = data.delivery

  dispatch(
    addOrder({
      contactId: data.contact.id,
      remark: remark,
      takeTime: takeTimeValue,
      deliveryTime: deliveryTimeValue,
      coupon: {...data.coupon},
      channel: data.channel
    })
  )


}

export const fields = [
  'contact.id',
  'delivery.takeTime',
  'delivery.takeTimeValue',
  'delivery.deliveryTime',
  'delivery.deliveryTimeValue',
  'delivery.remark',
  'coupon.id',
  'coupon.name',
  'channel',
  'protocol'
]

class XiyiOrderForm extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
    this.lang = context.intl.lang
    this.state = {jingxi:[],paytype:false}
  }

  componentDidMount() {
    this.showTips()
    const {bookType} = this.props
    if(bookType !== "jingxi" ){
      this.props.jingxiConfirm([])
    }else{
      this.props.ironSelectedClean()
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.commitSuccess && !this.props.commitSuccess) {

      nextProps.orderSuccess(nextProps.result.orderNo,this.state.paytype)

      // 提交成功清除选定的优惠券
      this.clearSelectedCoupon(nextProps)
    }
  }

  clearSelectedCoupon(props) {
    const {fields: {coupon}, selectedCoupon} = props
    if (coupon.id.value || (selectedCoupon && (selectedCoupon.id||0) > 0)) {
      props.cleanCoupon()
      coupon.id.onChange('')
      coupon.name.onChange('')
    }
  }

  showTips() {
    const tips = localStorage.get('tips')
    if (tips !== '1.0' && this.props.showTips) {
      toastr.tips('order.tips.content', {
        onCancel: () => localStorage.put('tips', '1.0'),
        onOk: () => this.props.hideTips(),
        cancelText: 'not.show.again',
        title: 'order.tips.title'
      })
    }
  }

  selectContactAction(data) {
    const {fields: {contact}} = this.props
    if (data) {
      localStorage.put(`contact.${this.lang}`, JSON.stringify(data))
      contact.id.onChange(data.id)
      this.props.selectContactAction(data)
      this.clearSelectedCoupon(this.props)
    } else {
      data = this.props.selectedContact
      // 如果form表单的值和state的值不一致 需要更新，
      if (data && data.id !== contact.id.value) {
        localStorage.put(`contact.${this.lang}`, JSON.stringify(data))
        contact.id.onChange(data.id)
        this.clearSelectedCoupon(this.props)
      } else if (!contact.id.value) { // 首次初始化
        data = JSON.parse(localStorage.get(`contact.${this.lang}`))
        if (data) {
          contact.id.onChange(data.id)
          //动态更新
          this.props.addressDetails(data.id)
          this.props.selectContactAction(data)
        }
      }
    }
  }

  changePayType (type){
    this.setState({paytype:type})
  }

  render() {
    const {
      fields: {contact, delivery, protocol, coupon},
      handleSubmit, invalid, submitting, selectedContact, ContactsInfoForm,
      selectedJingxi,  selectedIron,bookType,location
    } = this.props

    let city = selectedContact ? formatCity(selectedContact.city, this.lang) : ''
    return (
      <form onSubmit={handleSubmit}>
        <ContactsInfoForm
          field={contact}
          contact={selectedContact}
          selectContactAction={::this.selectContactAction} />
         {bookType == "jingxi" ? (
          <div>
            <JingxiDeliveryTime {...delivery} />
            <JingxiShow list={selectedJingxi} />
          </div>
         ) : (
          <div>
            <DeliveryTime {...delivery} />
            <IroningInput selectedIron={selectedIron} />
            <CouponInput openCoupon={this.props.openCoupon}
              coupon={coupon}
              selectedCoupon={this.props.selectedCoupon}
              city={city}/>
          </div>
          )}
        <Protocol props={protocol} currUrl={location.pathname}/>
        <div className='error-text'>
          <Text id='order.protocol.error'>
            {(text) =><span> {!(protocol.error && protocol.touched) ? '' : text}</span>}
          </Text>
        </div>
        <div className="payways-btn">
          <p><Text id="jingxi.payways"/></p>
          <div className="btns clearfloat">
            <div className={classnames({'btn':true,'float-l':true,'cur':this.state.paytype})} onClick={(e) => this.changePayType(false)}>
              <Text id="jingxi.paynow"/>
            </div>
            <div className={classnames({'btn':true,'float-r':true,'cur':!this.state.paytype})} onClick={(e) => this.changePayType(false)}>
              <Text id="jingxi.payafter"/>
            </div>
          </div>
        </div>
        <Button submitting={submitting}/>
      </form>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    pending: state.orderAdd.pending,
    msg: state.orderAdd.msg,
    result: state.orderAdd.result,
    commitSuccess: state.orderAdd.commitSuccess,
    verifyMobilePass: state.orderAdd.verifyMobilePass,
    initialValues: {protocol: true, channel: props.channel},
    selectedCoupon: (state.coupon || {}).selected,
    showTips: state.orderAdd.showTips,
    selectedContact: state.orderAdd.selectedContact,
    selectedIron: (state.iron || {}).selected,
    selectedJingxi: ((state.jingxi||{}).selectedJingxi || [])
  }
}

const mapDispatchToProps = (dispatch,props) => {
  return {
    cleanCoupon: ()=>dispatch({type: 'COUPON_SELECTED_CLEAN'}),
    orderSuccess: (orderNo,paytype) => {
      if(paytype){
        dispatch(push({pathname: `/order/pay/payment/${orderNo}`}))
      }else{
        dispatch(push({pathname: '/order/success', query: {orderNo: orderNo}}))
      }
    },
    openCoupon: (city) => dispatch(push({pathname: '/coupon/select', query: {city: city}})),
    hideTips: () => dispatch(hideTips()),
    selectContactAction: (data) => dispatch(selectContact(data)),
    jingxiConfirm: (data) => dispatch(jingxiConfirm(data)),
    ironSelectedClean: () => dispatch(ironSelectedClean()),
    addressDetails: function(addressId) {
      if(addressId){
        dispatch(dynDetails(addressId))
      }
    }
  }
}

XiyiOrderForm.propTypes = {
  fields: PropTypes.object.isRequired,
  result: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  commitSuccess: PropTypes.bool,
  verifyMobilePass: PropTypes.bool,
  pending: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  orderSuccess: PropTypes.func.isRequired,
  showTips: PropTypes.bool.isRequired,
  openCoupon: PropTypes.func.isRequired,
  hideTips: PropTypes.func.isRequired,
  selectedCoupon: PropTypes.object,
  selectContactAction: PropTypes.func.isRequired,
  selectedContact: PropTypes.object,
  selectedIron: PropTypes.array,
  ContactsInfoForm: PropTypes.func.isRequired,
  addressDetails: PropTypes.func.isRequired,
  jingxiConfirm: PropTypes.func.isRequired,
  ironSelectedClean: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
  bookType: PropTypes.string.isRequired,
  selectedJingxi: PropTypes.array,
  location: PropTypes.object
}


XiyiOrderForm.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

export default reduxForm({
  form: 'addOrderForm',
  fields,
  onSubmit: submitForm,
  validate,
  destroyOnUnmount: false,
}, mapStateToProps, mapDispatchToProps)(XiyiOrderForm)
