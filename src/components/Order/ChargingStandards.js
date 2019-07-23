/**
 * Created by evan on 2016/2/24.
 */

import React from 'react'
import { FormattedMessage as Text } from 'react-intl'
import sizeS from 'static/img/size-s.png'
import jacket from 'static/img/jacket.png'
import winterCoat from 'static/img/winter-coat.png'
import tshirt from 'static/img/tshirt.png'
import sizeL from 'static/img/size-l.png'
import curtain from 'static/img/curtain.png'
import sheet from 'static/img/sheet.png'
import coverlid from 'static/img/coverlid.png'

const ChargingStandards = () => {
  return (
    <div>
      <p className='tip-one txt-whirt'><Text id='order.standard'/></p>
      <section className='bd'>
        <div className='description'>
          <div className='float-l w-38'>
            <img src={sizeS} width='45px'/>
            <div className='mg-t-8'><Text id='order.small.current.price'/></div>
            <div><Text id='order.small.standard'/></div>
          </div>
          <div className='p-list float-r w-61'>
            <div>
              <img src={winterCoat} width='35px'/>
              <Text id='order.downcoats.unit'/>
            </div>
            <div>
              <img src={jacket} width='35px'/>
              <Text id='order.jackets.unit'/>
            </div>
            <div>
              <img src={tshirt} width='35px'/>
              <Text id='order.tshirts.unit'/>
            </div>
          </div>
        </div>
        <div className='clear'></div>
        <div className='line'></div>
        <div className='description pd-t-10'>
          <div className='float-l w-38'>
            <img src={sizeL} width='45px'/>
            <div className='mg-t-8'><Text id='order.large.current.price'/></div>
            <div><Text id='order.large.standard'/></div>
          </div>
          <div className='p-list float-r w-61'>
            <div>
              <img src={curtain} width='35px'/>
              <Text id='order.curtain.unit'/>
            </div>
            <div>
              <img src={sheet} width='35px'/>
              <Text id='order.sheet.unit'/>
            </div>
            <div>
              <img src={coverlid} width='35px'/>
              <Text id='order.coverlid.unit'/>
            </div>
          </div>
        </div>
        <div className='clear'></div>
      </section>
    </div>
  )
}

export default ChargingStandards
