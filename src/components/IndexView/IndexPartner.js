/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import  './assets/IndexView.scss'
import indexpartner1 from 'static/img/indexpartner1.jpg'
import indexpartner2 from 'static/img/indexpartner2.jpg'
import indexpartner3 from 'static/img/indexpartner3.jpg'
import classnames from 'classnames'
import {FormattedMessage as Text} from 'react-intl'
import {push} from 'react-router-redux'
import Tappable from 'react-tappable'


class IndexPartner extends Component {

  constructor(props, context) {
    super(props, context)
    this.dispatcher = context.store.dispatch
  }

  handleTapEvent(path){
    this.dispatcher(push({pathname: path}))
  }

  render() {

    return (
      <div className="partner">
        <div className="par-head mg-b-20">
          <img src={indexpartner3}/>
          <p>GIDOOR LAUNDRY</p>
          <p>线下实体洗衣房</p>
        </div>
        <div className="par-foot">
          <Tappable className="par-item" onTap={(e) => this.handleTapEvent('/xiyi/jingxi')}>
            <img src={indexpartner2}/>
            <p><Text id='service.prowash.content'/></p>
            <p><Text id='service.prowash'/></p>
          </Tappable>
          <Tappable className="par-item" onTap={(e) => this.handleTapEvent('/xiyi/daixi')}>
            <img src={indexpartner1}/>
            <p><Text id='service.laundry1.content1'/></p>
            <p><Text id='service.laundry1'/></p>
          </Tappable>
        </div>
      </div>
    )
  }
}
IndexPartner.contextTypes = {
  store: React.PropTypes.object.isRequired,
}

export default IndexPartner
