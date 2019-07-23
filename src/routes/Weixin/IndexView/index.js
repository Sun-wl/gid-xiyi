/**
 * Created by evan on 2016/2/24.
 */
import React,{PropTypes} from 'react'
import FooterNav from 'components/FooterNav'
import IndexSelector from 'components/IndexView/IndexSelector'

const IndexView = () => {
  return (
    <div>
      <IndexSelector/>
      <FooterNav index={1}/>
    </div>
  )
}

export default IndexView
