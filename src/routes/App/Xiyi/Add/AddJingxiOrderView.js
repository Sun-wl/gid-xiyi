/**
 * Created by evan on 2016/2/24.
 */
import React,{PropTypes} from 'react'
import XiyiOrderForm from 'components/Order/Add/XiyiOrderForm'
import ContactsInfoForm from './ContactsInfoForm'
import {OrderFeeTips} from 'components/Order'
const AddJingxiOrderView = ({location}) => {
  return (
    <div className='black-bg'>
      <XiyiOrderForm location={location} ContactsInfoForm={ContactsInfoForm} channel='app' bookType='jingxi'/>
      <OrderFeeTips />
    </div>
  )
}

AddJingxiOrderView.propTypes={
  location:PropTypes.object.isRequired
}
export default AddJingxiOrderView
