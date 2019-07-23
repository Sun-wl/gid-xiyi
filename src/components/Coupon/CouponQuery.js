/**
 * Created by evan on 2016/5/20.
 */

import React from 'react'
import CouponListView from './CouponListView'
import FooterNav from 'components/FooterNav'

const CouponQuery = (platform)=> ({location}) => {
  if (platform === 'wx') {
    return (
      <div className="black-bg">
        <CouponListView location={location} />
      </div>
    )
  } else {
    return (
      <div className="black-bg pd-d-1">
        <CouponListView location={location} />
      </div>
    )
  }
}

export default CouponQuery
