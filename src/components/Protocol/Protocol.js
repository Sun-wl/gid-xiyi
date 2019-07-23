/**
 * Created by evan on 2016/2/24.
 */
import React, {PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import {Link } from 'react-router'
import './Protocol.scss'
const Protocol = ({props,currUrl}) => {
  return (
    <div  className='protocol'>
      <input type='checkbox'  {...props}  />
      <Text id='order.protocol'>
        {(text) =>{
          let t = text.split(';')
           return (
             <span>
               {t[0]} <Link to={{pathname: `/protocol/user`,state: {modal: true,  goBackUrl:currUrl, btnText:'我知道了',title:'Gidoor洗衣平台用户服务协议'}}}>{t[1]}</Link>
               {t[2]} <Link to={{pathname: `/protocol/notice`,state: {modal: true, goBackUrl:currUrl,btnText:'我知道了',title:'客户须知'}}}>{t[3]}</Link>
             </span>
           )
           }
        }
      </Text>

    </div>
  )
}

Protocol.propTypes = {
  props: PropTypes.object.isRequired,
  currUrl: PropTypes.string.isRequired
}

export default Protocol


