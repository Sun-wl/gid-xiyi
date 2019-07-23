/**
 * Created by evan on 2016/2/24.
 */

import React, {PropTypes} from 'react'
import { FormattedMessage as Text} from 'react-intl'
import classnames from 'classnames'

const Submit = ({submitting,text}) => {
  if(!text){
    text = 'order.from.submit'
  }
  return (
    <div className='release-footer'>
      <button className={
              classnames( {'release-btn':true,'rb-able':!(submitting) })} disabled={(submitting)}>
        <Text id={submitting?'processing':text}/>
      </button>
    </div>
  )
};

Submit.propTypes = {
  submitting: PropTypes.bool.isRequired,
  text: PropTypes.string
};

export default Submit
