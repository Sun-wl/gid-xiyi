/**
 * Created by evan on 2016/2/24.
 */
import React from 'react'
import {Link} from 'react-router'
import { FormattedMessage as Text} from 'react-intl'

const FuliView = () => {
  return (
    <div className="flym">
      <div>
        <strong>Gidoor洗衣</strong>福利到，惊喜不间断，拿到你手软！<br/>
        <strong>Gidoor洗衣</strong>，谢谢您的支持！
      </div>
      <div>
        <Text id='fuli.booking.succ'/>
      </div>
      <div>
        <Text id='fuli.runner.info'/>
      </div>
      <ul>
        <li>
          <img src="/img/gang.jpg" className="left-gang"/>
          <strong>Gidoor洗衣</strong>优惠码<img src="/img/gang.jpg" className="right-gang"/>
        </li>
        <li>
          <img className="adImg" src="/img/ad1.jpg"/>
        </li>
        <li>
          <img src="/img/gang.jpg" className="left-gang"/>INCAKE蛋糕优惠券<img src="/img/gang.jpg" className="right-gang"/>
        </li>
        <li>
          <Link to='/fuli/incake' >
            <img className="adImg" src="/img/ad2.jpg"/>
          </Link>
        </li>
        <li>
          <img src="/img/gang.jpg" className="left-gang"/>也买酒兑换券<img src="/img/gang.jpg" className="right-gang"/>
        </li>
        <li>
          <Link to='/fuli/ymaijiu' >
            <img className="adImg" src="/img/ad3.jpg"/>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default FuliView
