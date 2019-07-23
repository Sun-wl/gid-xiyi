/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import { FormattedMessage as Text } from 'react-intl'
import classnames from 'classnames'
import ironingImg from 'static/img/ironing.png'
import newImg from 'static/img/new.png'
import edit  from 'static/img/edit.png'
import {push} from 'react-router-redux'
import Tappable from 'react-tappable'

class IroningInput extends Component {

  constructor(props, context) {
    super(props, context)
    this.dispatcher = context.store.dispatch
  }

  handleTapEvent(path){
    this.dispatcher(push({pathname: path,state: {modal: true, className:'ironing-model', goBackUrl:'', btnText:'',title:''}}))
  }


  showData(list) {

    function getBoxNum(item) {
      if (item.code === "packingBox") {
        return (item.price / 100.00) * (item.num - 1)
      } else {
        return (item.price / 100.00) * item.num
      }
    }

    return _.map(list, item => {
        return (
          <tr key={item.code}>
            <td>{item.name}</td>
            <td>x {item.num}</td>
            <td>
              ￥ {getBoxNum(item)}
            </td>
          </tr>
        )
      }
    )
  }

  calcPrice() {
    if (!this.props.selectedIron) {
      return 0
    }
    return _.reduce(this.props.selectedIron, (sum, v) => {
      if (v.code === 'packingBox') {
        return sum + v.price * ((v.num || 1) - 1)
        return sum + v.price * ((v.num || 1) - 1)
      }
      return sum + v.price * (v.num || 0)
    }, 0)
  }

  calcPackageBox() {
    if (!this.props.selectedIron) {
      return <Text id="order.ironing.packageBox1" values={{num:1}}/>
    }
    const totalSpace =
      _.reduce(this.props.selectedIron, (sum, v) => {
        if (v.code === 'packingBox') {
          return sum
        } else {
          return sum + v.space * (v.num || 0)
        }
      }, 0)
    return <Text id="order.ironing.packageBox1" values={{num: Math.ceil(totalSpace/110.0) || 1}}/>
  }

  render() {
    if (this.props.selectedIron && this.props.selectedIron.length > 0) {
      return (
        <section className='bd ironing-total'>
          <div className="top">
            <div className="float-l"><Text id='order.ironing.service.name'/></div>
            <div className="float-r edit">
              <Tappable onTap={(e) => this.handleTapEvent('/xiyi/ironing/query')}>
                <img src={edit} width="22px"/>
              </Tappable>
            </div>
            <div className="clear"></div>
          </div>
          <div className="line"></div>
          <table className="iron-list">
            <tbody>
            {this.showData(this.props.selectedIron)}
            </tbody>
          </table>
          <div className="line"></div>
          <div className="total">
            <div>
              <div className="float-l"><Text id='order.ironing.total'/></div>
              <div className="float-r"><span className="price"> ￥ {this.calcPrice() / 100.00}</span></div>
              <div className="clear"></div>
            </div>
            <div>
              <ul className="ul-d mg-l-20 ironingBox">
                <li>{this.calcPackageBox()}</li>
                <li><Text id='order.ironing.packageBox2'/></li>
              </ul>
            </div>
          </div>
        </section>
      )
    } else {
      return (
        <Tappable onTap={(e) => this.handleTapEvent('/xiyi/ironing/query')}>
            <section className='bd'>
              <div className="new_flag">
                <img src={newImg}/>
              </div>
              <div className='form-item'>
                <div className="eng-address">
                  <img src={ironingImg}/>
                  <span className={classnames({'hint-span':true})}>
                  <Text id='order.from.ironing.hint'/></span>
                </div>
                <div className='clear'></div>
              </div>
            </section>
        </Tappable>
      )
    }
  }
}

IroningInput.propTypes = {
  selectedIron: React.PropTypes.array
}

IroningInput.contextTypes = {
  store: React.PropTypes.object.isRequired
}

export default IroningInput
