/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import _ from 'lodash'
import noAddress from 'static/img/no_address.png'
import editImg from 'static/img/edit_26.png'
import deleteImg from 'static/img/delete.png'
import {Link} from 'react-router'
import {formatDetails}  from 'common'

const addressListPanel = (list, deleteAddress, locale) => {

  return _.map(list, item => {
    return (
      <li key={item.id}>
        <div className="one">
          {item.name} &nbsp; {item.mobile}
        </div>
        <div className="two">
          {locale === 'en' ?
          formatDetails(item.details, locale) + ' ' + item.address + ' ' + item.city :
          item.city + ' ' + item.address + ' ' + formatDetails(item.details, locale)
          }
        </div>
        <div className="dline"></div>
        <div className="editor">
          <div className="float-r delete" onClick={(e) =>deleteAddress(item.id)}>
            <img src={deleteImg}/>
            <Text id='delete'/>
          </div>
          <div className="float-r edit">
            <Link to={`/contact/edit/${item.id}`}>
              <img src={editImg}/>
              <Text id='edit'/>
            </Link>
          </div>
        </div>
      </li>
    )
  })
}


const AddressShowListItem = (props) => {

  const {data,deleteAddress, isLoading,locale} = props

  if (data.length < 1 && !isLoading) {
    return (<div className="tc no-address">
      <div>
        <img src={noAddress}/>
      </div>
      <div>
        <Text id='not.address'/>
      </div>
    </div> )
  } else {
    return (

        <ul className="address-show-list">
          {addressListPanel(data, deleteAddress, locale)}
        </ul>
    )
  }
}


AddressShowListItem.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deleteAddress: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
}

export default AddressShowListItem

