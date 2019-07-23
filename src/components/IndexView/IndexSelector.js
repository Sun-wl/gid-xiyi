/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import  './assets/IndexView.scss'
import {toastr} from 'components/toastr'
import area from 'static/img/area.png'
import arrow from 'static/img/arrow.png'
import intro from 'static/img/intro.png'
import bg1 from 'static/img/bg-1.jpg'
import bg2 from 'static/img/bg-2.jpg'

import indexlaundry from 'static/img/index-laundry.png'
import indexwashing from 'static/img/index-washing.png'

import banner1 from 'static/img/banner-1.jpg'
import banner2 from 'static/img/banner-2.jpg'
import banner3 from 'static/img/banner-3.jpg'
import ReactSwipe from 'react-swipe';
import classnames from 'classnames'
import {FormattedMessage as Text} from 'react-intl'
import {push} from 'react-router-redux'
import Tappable from 'react-tappable'


class IndexSelector extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {bannerIndex: 0}
    this.dispatcher = context.store.dispatch
  }

  swipeback(a) {
    this.setState({bannerIndex: a})
  }

  handleTapEvent(path){
    this.dispatcher(push({pathname: path}))
  }

  render() {
    const willsUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8e156c2d0da759ea&redirect_uri=' +
      'http%3a%2f%2fm.gidoor.com%2fact%2fwx%2fxiyi%2fwills&response_type=code&' +
      'scope=snsapi_base&state=1643#wechat_redirect'

    const hxmklUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8e156c2d0da759ea&redirect_uri=' +
      'http%3a%2f%2fm.gidoor.com%2fact%2fwx%2fxiyi%2fhxmkl&response_type=code&' +
      'scope=snsapi_base&state=1643#wechat_redirect'

    return (
      <div className="chbody">
        <div className="banner-fa">
          <ReactSwipe className="banner"
            swipeOptions={{continuous: true,auto:2000,stopPropagation:true,callback:(::this.swipeback)}}>
            <div><a href={willsUrl}><img src={banner1}/></a></div>
            <div><a href={willsUrl}><img src={banner1}/></a></div>
            <div><a href={hxmklUrl}><img
              src={banner3}/></a></div>
          </ReactSwipe>
          <ul className="banner-icon">
            <li className={classnames({'banner-icon-item':true,'cur':this.state.bannerIndex == 0})}></li>
            <li className={classnames({'banner-icon-item':true,'cur':this.state.bannerIndex == 1})}></li>
          </ul>
        </div>
        <Tappable className="mjingxi" onTap={(e) => this.handleTapEvent('/xiyi/jingxi')}>
          <img className="bgimage" src={bg1}/>
          <div className="mjingxi-content">
            <img src={indexwashing}/>
            <div className="mjingxi-text">
              <p><Text id='service.prowash'/></p>
              <p className="w-220"><Text id='service.prowash.content'/></p>
            </div>
          </div>
        </Tappable>
        <Tappable className="mxiyi" onTap={(e) => this.handleTapEvent('/xiyi/daixi')}>
          <img className="bgimage" src={bg2}/>
          <div className="mxiyi-content">
            <img src={indexlaundry}/>
            <div className="mxiyi-text">
              <p><Text id='service.laundry1'/></p>
              <p className="w-220"><Text id='service.laundry1.content'/></p>
            </div>
          </div>
        </Tappable>
        <Tappable className="home-btn home-btn1" onTap={(e) => this.handleTapEvent('/service/introduce')}>
          <img src={intro} />
          <Text id='service.intro'/>
          <img src={arrow} />
        </Tappable>
        <Tappable className="home-btn home-btn2" onTap={(e) => this.handleTapEvent('/service/polygon')}>
          <img src={area} />
          <Text id='service.area'/>
          <img src={arrow} />
        </Tappable>
      </div>
    )
  }
}
IndexSelector.contextTypes = {
  store: React.PropTypes.object.isRequired,
}

export default IndexSelector
