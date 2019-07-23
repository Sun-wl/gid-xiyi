/**
 * Created by evan on 2016/2/24.
 */
import React,{PropTypes} from 'react'
import JingxiOrderForm from 'components/Order/Add/JingxiOrderForm'
import ContactsInfoForm from './ContactsInfoForm'
import {OrderFeeTips} from 'components/Order'

const AddJingxiOrderView = ({location}) => {
  return (
    <div className='black-bg'>
      <JingxiOrderForm
        location={location}
        ContactsInfoForm={ContactsInfoForm}
        channel='wx'
        bookType='jingxi'
      />
      <OrderFeeTips/>
    </div>
  )
}
AddJingxiOrderView.propTypes={
  location:PropTypes.object.isRequired
}
export default AddJingxiOrderView
