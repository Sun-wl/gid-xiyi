/**
 * Created by evan on 2016/2/24.
 */
import React from 'react'
import { FormattedMessage as Text } from 'react-intl'
import error from 'static/img/error.png'

const NotLogin = () => {
  return (
    <div className='page-container'>
      <div className='view-container'>
        <div className='wallpaper'>
          <div className='no-find'>
            <div><img width='137px' src={error} /></div>
            <div className='info'>
              <div>OOPS! </div>
              <div><Text id='session.expired'/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotLogin
