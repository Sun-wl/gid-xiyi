/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import  './assets/Daixi.scss'
import {push} from 'react-router-redux'
import Tappable from 'react-tappable'
import {OrderServiceTips} from 'components/Order'
import {FormattedMessage as Text,FormattedHTMLMessage} from 'react-intl'
import bag from 'static/img/daixi/bag.png'
import down from 'static/img/daixi/down.png'
import jackets from 'static/img/daixi/jackets.png'
import shirts from 'static/img/daixi/shirts.png'


class DaixiSelector extends Component {

  constructor(props, context) {
    super(props, context)
    this.dispatcher = context.store.dispatch
  }

  handleTapEvent(path){
    this.dispatcher(push({pathname: path}))
  }
  render() {
    return (
      <div className="daixi">
        <div>
          <p className='tip-one'><Text id='order.standard'/></p>
          <section className='bd'>
            <div className="info1">
              <div className="itemImg">
                <img src={bag} />
              </div>
              <div className="price">
                <p><Text id='order.small.standard'/></p>
                <p className="cur"><Text id='order.small.current.price'/></p>
              </div>
            </div>
            <div className="info2 clearfloat">
              <div className="item">
                <div className="itemImg">
                  <img src={shirts} />
                </div>
                <p><Text id='order.tshirts.unit'/></p>
                <p><FormattedHTMLMessage id='order.mount'  values={{mount:30}}/></p>
                <span className="symbol">
                  <Text id='order.or'/>
                </span>
              </div>
              <div className="item">
                <div className="itemImg">
                  <img src={jackets} />
                </div>
                <p><Text id='order.jackets.unit'/></p>
                <p><FormattedHTMLMessage id='order.mount'  values={{mount:10}}/></p>
                 <span className="symbol">
                  <Text id='order.or'/>
                 </span>
              </div>
              <div className="item">
                <div className="itemImg">
                  <img src={down} />
                </div>
                <p><Text id='order.downcoats.unit'/></p>
                <p><FormattedHTMLMessage id='order.mount'  values={{mount:4}}/></p>
              </div>
            </div>
          </section>
        </div>
        <OrderServiceTips/>
        <Tappable onTap={(e) => this.handleTapEvent('/xiyi/book/daixi')}>
          <button className="release-btn rb-able">
            <Text id="done"/>
          </button>
        </Tappable>
      </div>
    )
  }
}

DaixiSelector.contextTypes = {
  store: React.PropTypes.object.isRequired,
}

export default DaixiSelector
