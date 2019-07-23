/**
 * Created by evan on 2016/2/24.
 */
import React,{PropTypes} from 'react'
import _ from 'lodash'
import clock  from 'static/img/clock.png'

const OrderTimeline = ({data}) => {

   const list = _.map(data.timelines, tl=> {
     return (
       <div className='items-t-18 min-font' key={tl.id}>
         <span>{tl.title}</span>
         <span className='float-r'><img src={clock} width='19'/> {tl.createTime}</span>
       </div>
     )
   })
  return (
    <section className='bd'>
      <div className='float-l pd-t-2'>
        {data.statusText}
      </div>
      <div className='float-l mg-l-10 reserver'>{data.goodsTypeText}</div>
      <div className='clear'></div>
      <div className='line'></div>
      {list}
    </section>
  )
}


OrderTimeline.propTypes = {
  data: PropTypes.object.isRequired
}

export default OrderTimeline
