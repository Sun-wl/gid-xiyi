/**
 * Created by evan on 2016/2/24.
 */

import React, {PropTypes,Component} from 'react'
import { FormattedMessage as Text} from 'react-intl'
import classnames from 'classnames'
import {push} from 'react-router-redux'
import tabHome from 'static/img/home.png'
import tabHomeGreen from 'static/img/home_green.png'
import tabOrders from 'static/img/tab_orders.png'
import tabOrdersGreen from 'static/img/tab_orders_green.png'
import profile from 'static/img/profile.png'
import profileGreen from 'static/img/profile_green.png'
import Tappable from 'react-tappable'


class FooterNav  extends Component {

  constructor (props, context) {
    super(props, context)
    this.dispatcher = context.store.dispatch
  }

  handleTapEvent(path){
    this.dispatcher(push({pathname: path}))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.index !== this.props.index
  }

   render(){
     const {index} = this.props
     return (
       <section className="tabbar">
         <Tappable onTap={(e) => this.handleTapEvent('/xiyi/')} className={classnames('tabbar-item',{'cur': index === 1 })}>
           {index === 1 ?  <img src={tabHomeGreen}/>: <img src={tabHome}/>}
           <p><Text id='home'/></p>
         </Tappable>
         <Tappable onTap={(e) => this.handleTapEvent('/order/list')} className={classnames('tabbar-item',{'cur': index === 2 })}>
           {index === 2 ? <img src={tabOrdersGreen} width='13px'/>:<img src={tabOrders} width='13px'/>}
           <p><Text id='order.my'/></p>
         </Tappable>
         <Tappable onTap={(e) => this.handleTapEvent('/account')} className={classnames('tabbar-item',{'cur': index === 3 })}>
           {index === 3 ? <img src={profileGreen} width='13px'/>:<img src={profile} width='13px'/>}
           <p><Text id='page.profile'/></p>
         </Tappable>
       </section>
     )
   }
}


FooterNav.propTypes = {
  index: PropTypes.number.isRequired
}

FooterNav.contextTypes = {
  store: React.PropTypes.object.isRequired
}

export default FooterNav
