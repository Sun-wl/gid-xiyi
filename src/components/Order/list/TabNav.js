/**
 * Created by evan on 2016/2/24.
 */

import React, {PropTypes} from 'react'
import { FormattedMessage as Text } from 'react-intl'

const TabNav = ({index, action}) => {
  if(index === 1){
    return (
      <div>
        <ul className='order-tab'>
          <li className='float-l  cur-tab' ><Text id='order.list.current'/></li>
          <li className='float-l tab' onClick={() => action(2)}><Text id='order.list.history'/></li>
        </ul>
        <div className='clear'></div>
      </div>
    )
  } else {
    return (
      <div>
        <ul className='order-tab'>
          <li className='float-l tab' onClick={() => action(1)}><Text id='order.list.current'/></li>
          <li className='float-l cur-tab'><Text id='order.list.history'/></li>
        </ul>
        <div className='clear'></div>
      </div>
    )
  }
}

TabNav.propTypes = {
  index: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired
}


export default TabNav
