/**
 * Created by Administrator on 2016/7/12.
 */
import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import {FormattedMessage as Text} from 'react-intl'

class JingxiShow extends Component {

  getBoxNum(item) {
    if (_.startsWith(item.code,"packingBox")) {
      return (item.price / 100.00) * ((item.num - 1)<0?0:(item.num - 1))
    } else {
      return (item.price / 100.00) * item.num
    }
 }
  showData(list) {
    return _.map(list, item => {
        return (
          <tr key={item.code}>
            <td>{item.name}</td>
            <td>{item.itemType=='107'?'':`x${item.num}`}</td>
            <td>
              <Text id="currency" values={{price: ""+this.getBoxNum(item)}}/>
            </td>
          </tr>
        )
      }
    )
  }

  calcPrice(list){
    if( !list){
      return 0
    }
    return   _.reduce(list,(sum,v) => sum + this.getBoxNum(v) ,0)
  }

  render() {
    const {list} = this.props
    const amount  = this.calcPrice(list)
    return (
      <section className='bd ironing-total'>
        <div className="top">
          <div className="float-l"><Text id='service.jingxi'/></div>
          <div className="float-r edit">
          </div>
          <div className="clear"></div>
        </div>
        <div className="line"></div>
        <table className="iron-list">
          <tbody>
          {this.showData(list)}
          </tbody>
        </table>
        <div className="line"></div>
        <div className="total">
          <div>
            <div className="float-l"><Text id='order.ironing.total'/></div>
            <div className="float-r"><span className="price">￥ {amount}</span></div>
            <div className="clear"></div>
          </div>
        </div>
      </section>
    )
  }
}

JingxiShow.propTypes={
  list:PropTypes.array.isRequired
}
export default JingxiShow
