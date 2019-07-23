import React, {Component,PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import  classnames from 'classnames'
import  CitySelector from '../CitySelector'
import  AMapAddressInput from '../AMapAddressInput'
import  AddressDetail from '../AddressDetail'
import Button from 'components/Button'

const addressForm = (contact, fields, submitting, locale)=> {

  return (
    <div>
      <div>
        <table className="address-from">
          <tbody>
          <tr>
            <td className={classnames({'txt-red':fields.name.error && fields.name.touched})}>
              <Text id='xingming'/>
            </td>
            <td>
              <Text id='order.from.contact.hint'>
                {(text) =><input className="normal" {...fields.name} type="text" placeholder={text}/>}
              </Text>
            </td>
          </tr>
           <tr>
            <td className={classnames({'txt-red':fields.mobile.error && fields.mobile.touched})}>
              <Text id='order.from.phone'/>
            </td>
            <td>
              <Text id='order.from.phone.hint'>
                {(text) =><input className="normal" {...fields.mobile} type="tel" maxLength="11" placeholder={text}/>}
              </Text>
            </td>
          </tr>
          <tr>
            <td ><Text id='order.from.city'/></td>
            <td >
              <CitySelector city={fields.city}/>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <AMapAddressInput city={fields.city.value} address={fields.address}/>
            </td>
          </tr>
          <tr>
            <td colSpan="2"><AddressDetail details={fields.details}/></td>
          </tr>
          </tbody>
        </table>
      </div>
      <Button submitting={submitting} text="save"/>
    </div>
  )
}

const AddressForm = ({contact,fields,submitting,locale}) => {
  return (addressForm(contact, fields, submitting, locale))
}

AddressForm.propTypes = {
  contact: PropTypes.object,
  fields: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired
}

export default AddressForm
