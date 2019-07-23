/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import _ from 'lodash'
import Tappable from 'react-tappable'
import classnames from 'classnames'

const IndexBody=({list, selectItem, amount, tag, otherItem})=> {

 const getItem = (list) =>{

    return _.map(list.data, item=> {
      if(amount === item.amount&&tag===0){
        return (
          <div  className="inbo-item cur" key={item.amount} >
            <p className="inbo-item1"><Text id="recharge.cmoney" values={{price: item.amount/100.00}}/></p>
            <p className="inbo-item2"><Text id="recharge.smoney" values={{price: item.reward/100.00}}/></p>
          </div>

        )
      }else {
        return (
          <Tappable onTap={(e) => selectItem(item.amount) }  className="inbo-item" key={item.amount}>
            <p className="inbo-item1"><Text id="recharge.cmoney" values={{price: item.amount/100.00}}/></p>
            <p className="inbo-item2"><Text id="recharge.smoney" values={{price: item.reward/100.00}}/></p>
          </Tappable>
        )
      }
    })
  }

  // const  lastItem=(tag)=>{
  //     if(tag===0){
  //       return (
  //         <Tappable onTap={(e) => selectItem(0) } className="inbo-item" >
  //           <p className="inbo-item3"><Text id="recharge.otheramount" /></p>
  //         </Tappable>
  //       )
  //     }else {
  //       return (
  //         <div className="inbo-item cur" >
  //           <p className="inbo-item3"><Text id="recharge.otheramount" /></p>
  //         </div>
  //       )
  //     }
  // }

  // const  otherInput=(amount,tag)=>{
  //   if(tag===0){
  //     return (
  //       <Tappable onTap={(e) => selectItem(0) } id="inbo" className="inbo-input">
  //         <Text id="recharge.other" className="inbo-chinput" />
  //       </Tappable>
  //     )
  //   }else {
  //     return (
  //       <div className="inbo-input">
  //         <div className="inbo-chinput">
  //           <Text id="recharge.other">
  //             {(text) =><input type="tel" value={amount/100.00===0?'':amount/100.00} placeholder={text} onChange={(e) => otherItem(e)} />}
  //           </Text>
  //         </div>
  //       </div>
  //     )
  //   }
  // }

  return (
    <div className="inbo">
      <div className="inbo-main">
        <p className="inbo-name"><Text id="recharge.chongzhi" /></p>
        <div className="inbo-items">
           {getItem(list)}
           {/*{lastItem(tag)}*/}
        </div>
      </div>
      <div className="inbo-input">
        <div className={classnames({'inbo-chinput':true,'cur':tag===1})}>
          <Text id="recharge.other">
            {(text) =><input type="tel" onClick={(e) => selectItem(0)} placeholder={text} onChange={(e) => otherItem(e)} />}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default IndexBody
