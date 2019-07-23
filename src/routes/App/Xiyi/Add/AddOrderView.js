/**
 * Created by evan on 2016/2/24.
 */
import React from 'react'
import XiyiOrderForm from 'components/Order/Add/XiyiOrderForm'
import ContactsInfoForm from './ContactsInfoForm'
import {ChargingStandards,OrderServiceTips,OrderFeeTips} from 'components/Order'
const AddOrderView = ({location}) => {
  return (
    <div className='black-bg'>
      <ChargingStandards />
      <OrderServiceTips />
      <XiyiOrderForm
        location={location}
        ContactsInfoForm={ContactsInfoForm}
        channel='app'
        bookType='daixi'/>
      <OrderFeeTips />
    </div>
  )
}
export default AddOrderView
