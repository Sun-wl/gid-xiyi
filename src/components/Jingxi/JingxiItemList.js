/**
 * Created by Administrator on 2016/7/18.
 */

import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import _ from 'lodash'
import reduce from 'static/img/jingxi/reduce_light.png'
import increase from 'static/img/jingxi/increase_gre.png'
import Tappable from 'react-tappable'

class JingxiItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.shouldUpdate
  }

  createListItem() {
    const {reduceItem, addItem, data,type} = this.props
    return _.map(data, item => {
        return (
          <div key={item.code} className="item">
            <div>
              <div>
                <img src={`/img/jingxi/${item.code}.jpg`} className="showImg" />
              </div>

            </div>
            <div className="name">
              {item.name}<br/>
              <Text id='piece' values={{price:item.price/100.00}}/>
            </div>
            <div>
              <Tappable className="fa-reduceImg" onTap={(e)=> {e.preventDefault(); reduceItem(type,item.code)}}>
                <img className="ch-reduceImg" src={reduce} />
              </Tappable>
              {item.num||0}
              <Tappable className="fa-raiseImg" onTap={(e)=> {e.preventDefault(); addItem(type, item.code)}}>
                <img className="ch-raiseImg" src={increase} />
              </Tappable>
            </div>
          </div>
        )
      }
    )
  }

  render(){
     return (
       <div>
         {this.createListItem()}
         <div className="clear"></div>
       </div>
     )
  }
}



JingxiItemList.propTypes = {
  data: PropTypes.array.isRequired,
  addItem: PropTypes.func.isRequired,
  shouldUpdate: PropTypes.bool.isRequired,
  reduceItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}

export default JingxiItemList
