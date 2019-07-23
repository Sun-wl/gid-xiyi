/**
 * Created by evan on 2016/2/24.
 */
import React, {PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import _ from 'lodash'
import usedLarge from 'static/img/used_large.png'
import noAddress from 'static/img/no_address.png'
import circle from 'static/img/circle.png'
import {formatDetails}  from 'common'

const addressListPanel = (list, selectedAddress, selected,locale) => {

  return _.map(list, item => {
    return (
      <li key={item.id} onClick={() => selectedAddress(item)}>
        <div className="left">
          <img src={selected.id != item.id ? circle : usedLarge} width="20px" />
        </div>
        <div className="right">
          <div>
            {item.name} &nbsp; {item.mobile}
          </div>
          <div>
            {locale === 'en'?
             formatDetails(item.details,locale) + ' ' + item.address + ' ' + item.city :
              item.city + ' ' + item.address + ' ' + formatDetails(item.details,locale)
            }
          </div>
        </div>
        <div className="clear"></div>
      </li>
    )
  })
}


const AddressListItem = (props) => {

  const {data, selectedAddress, selected, isLoading,locale} = props

  if (data.length < 1 && !isLoading) {
    return (<div className="tc no-address">
      <div>
        <img src={noAddress} />
      </div>
      <div>
        <Text id='not.address' />
      </div>
    </div> )
  } else {
    return (
      <ul className="address-list">
        {addressListPanel(data, selectedAddress, selected, locale)}
      </ul>
    )
  }
}


AddressListItem.propTypes = {
  data: PropTypes.array.isRequired,
  selectedAddress: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired
}

export default AddressListItem
