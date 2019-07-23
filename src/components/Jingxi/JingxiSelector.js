/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import {connect} from 'react-redux'
import {jingxiList,jingxiItemChange,jingxiConfirm,cleanSelected} from 'reducers/Jingxi'
import  './assets/Jingxi.scss'
import reduce from 'static/img/jingxi/reduce_light.png'
import raiseGreen from 'static/img/jingxi/increase_gre.png'
import basketgreen from 'static/img/jingxi/basket_green.png'
import basketgrey from 'static/img/jingxi/basket_grey.png'
import emptyImg from 'static/img/jingxi/empty.png'
import classnames from 'classnames'
import _ from 'lodash'
import {push} from 'react-router-redux'
import ReactSwipe from 'react-swipe';
import JingxiItemList from './JingxiItemList'
import Tappable from 'react-tappable'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll-probe'

class JingxiSelector extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {showSwitch: false,currentTab: "outwear"}
  }

  getWrapped(){
    if(!this.props.data){
      return []
    }
    const {outwear, bottom, accessories,home,packingBox}  = this.props.data
    return _.filter(_.concat(outwear.item,bottom.item,accessories.item, home.item, packingBox.item),item=>item.num>0)
  }

  componentWillMount() {
    this.props.queryJingxi()
  }

  openSwitch(listSize) {
    if(listSize > 0){
      if(this.state.showSwitch){
        this.setState({showSwitch: false})
      }else{
        this.setState({showSwitch: true})
      }
    }
  }

  clickTab(code){
    const swipe = this.refs.reactSwipe;
    switch (code) {
      case 'bottom':
        swipe.slide(1)
        break;
      case 'accessories':
        swipe.slide(2)
        break;
      case 'home':
        swipe.slide(3)
        break;
      default:
        swipe.slide(0)
    }
  }

  addItem(itemType,code){
    this.props.jingxiItemChange(itemType,code, 1)
  }

  reduceItem(itemType,code){
    this.props.jingxiItemChange(itemType,code, -1)
    if(this.getWrapped().length < 1 && this.state.showSwitch){
      this.setState({showSwitch: false})
    }
  }

  calcPrice(){
    if( !this.props.data){
      return 0
    }
    const r =(data)=>_.reduce(data.item,(sum,v) => {
      if(_.startsWith(v.code,"packingBox")){
        if(!v.num){
          return sum
        }else{
          return sum +  v.price * (v.num-1)
        }
      }else{
        return sum +  v.price *(v.num||0)
      }
    }, 0)

    const {outwear, bottom, accessories,home, packingBox}  = this.props.data

    return  r(outwear) + r(bottom) + r(accessories) + r(home) + r(packingBox)
  }

  calcTotalType(){
    const r =(data)=> _.reduce(data.item, (sum,v) => sum +  (v.num||0), 0)
    const {outwear, bottom, accessories,home}  = this.props.data
    return  r(outwear) + r(bottom) + r(accessories) + r(home)
  }

  createTabs(data) {
    return (
      <div className="jingxi-navbar">
        <Tappable className="jingxi-navbar-item" onTap={() => this.clickTab(data.outwear.code)}>
            <span className={classnames({'cur':this.state.currentTab == 'outwear'})} >{data.outwear.name}</span>
        </Tappable>
        <Tappable className="jingxi-navbar-item" onTap={() => this.clickTab(data.bottom.code)}>
            <span className={classnames({'cur':this.state.currentTab == 'bottom'})}>{data.bottom.name}</span>
        </Tappable>
        <Tappable className="jingxi-navbar-item" onTap={() => this.clickTab(data.accessories.code)}>
            <span className={classnames({'cur':this.state.currentTab == 'accessories'})} >{data.accessories.name}</span>
        </Tappable>
        <Tappable className="jingxi-navbar-item" onTap={() => this.clickTab(data.home.code)}>
            <span className={classnames({'cur':this.state.currentTab == 'home'})} >{data.home.name}</span>
        </Tappable>
      </div>
    )
  }

  chooseGoodsItem(list){
    return  _.map(_.filter(list,item => item.num > 0), item => {
        if(item.code === "packingBox" || item.code === "packingBoxJx"  ) {
          return (<div className="goods-items" key={item.code}>
            <div className="goods-item">{item.name}</div>
            <div className="goods-item"><Text id="currency" values={{price: ""+(item.price/100.00 * (item.num-1))}}/></div>
            <div className="goods-item">
              <div>{item.num||0}</div>
            </div>
            <div className="clear"></div>
          </div>)
        }else{
          return (
            <div className="goods-items" key={item.code}>
              <div className="goods-item">{item.name}</div>
              <div className="goods-item"><Text id="currency" values={{price: item.price/100.00 * item.num}}/></div>
              <div className="goods-item">
                <div>
                  <Tappable className="fa-reduceImg" onTap={()=>this.reduceItem('', item.code)}>
                    <img className="ch-reduceImg" src={reduce} />
                  </Tappable>
                  <span className="listItemAmount">{item.num||0}</span>
                  <Tappable className="fa-raiseImg" onTap={()=>this.addItem('', item.code)}>
                    <img className="ch-raiseImg" src={raiseGreen} />
                  </Tappable>
                </div>
              </div>
              <div className="clear"></div>
            </div>
          )
        }
      }
    )
  }

  confirmJingxi(){
    const selectItem = this.getWrapped()
    const otherItem = this.props.data.otherCost.item[0]
    if(this.calcPrice()<10000){
      otherItem.num = 1
    }else {
      otherItem.num = 0
    }
    selectItem.push(otherItem)
    this.props.confirmJingxi(selectItem)
    this.props.toOrder()
  }

  cleanAll(){
    this.setState({showSwitch: false})
    this.props.cleanSelectedAction()
  }

  swipeCallBack(i, item){
    switch (i) {
      case 1:
        this.setState({currentTab: 'bottom'});
        break;
      case 2:
        this.setState({currentTab: 'accessories'});
        break;
      case 3:
        this.setState({currentTab: 'home'});
        break;
      default:
        this.setState({currentTab: 'outwear'});
    }
  }

  buyCarBody(wrapped,total){
    return (
      <div>
        <Tappable className="mask" onTap={()=>this.openSwitch(1)}/>
        <span className="goods-menu">
          <div className="buybar-image">
            <Tappable onTap={(e) => this.openSwitch(1)}>
              <img src={basketgreen} />
            </Tappable>
            <span className={classnames({'buybar-icon':true,'show-none':total===0})}>{total}</span>
          </div>
          <div className="goodsmenuTitle">
              <Tappable onTap={::this.cleanAll}>
                <img src={emptyImg} />
                <Text id='empty'/>
              </Tappable>
          </div>
          <ReactIScroll
            className="goodsmenuContent"
            iScroll={iScroll}
            options={{scrollY:true}}>
            <div>
              {this.chooseGoodsItem(wrapped)}
              <div className="clear"></div>
            </div>
          </ReactIScroll>
        </span>
      </div>
    )
  }

  buyCarFootValid(total,price) {
    return (
      <div className="buybar">
        <div className={classnames({'buybar-image ':true,'show-none':this.state.showSwitch})}>
          <Tappable onTap={(e) => this.openSwitch(1)}>
            <img src={basketgreen} />
          </Tappable>
          <span className={classnames({'buybar-icon':true,'show-none':total===0})}>{total}</span>
        </div>
        <div className={classnames({'buybar-content':true,'float-l':true,'mg-l-15':this.state.showSwitch})}>
          <span className="text1">￥ {price}</span>
        </div>
        <Tappable className="buybar-btn float-l" onTap={::this.confirmJingxi}>
          <Text id='done'/>
        </Tappable>
      </div>
    )
  }

  buyCarFootInValid(){
    return(
      <div className="buybar">
        <div className='buybar-image'>
          <img src={basketgrey}/>
          <span className='buybar-icon show-none'>0</span>
        </div>
        <div className='buybar-content float-l'>
          <span className="text2">￥ 0</span>
        </div>
        <div className="buybar-btn bd-btn float-l"> <Text id='done'/></div>
      </div>
    )
  }

  buyCar(wrapped){
    const price   = this.calcPrice() /100.00
    const total   = this.calcTotalType()
    if(wrapped.length > 0 && this.state.showSwitch){
      return (
        <div>
          {this.buyCarBody(wrapped,total)}
          {this.buyCarFootValid(total, price)}
        </div>
      )
    }else if(wrapped.length > 0  && !this.state.showSwitch ){
      return this.buyCarFootValid(total, price)
    }else{
      return this.buyCarFootInValid()
    }
  }

  render() {
    const {data} = this.props
    const wrapped = this.getWrapped()
    return (
      <div className="jingxi-service">
        <div className="mainbody">
          {this.createTabs(data)}
          <ReactSwipe key= {4} className="h-100" ref="reactSwipe" swipeOptions={{
             continuous: false,
             stopPropagation:false,
             callback:(::this.swipeCallBack)
          }}>
            <ReactIScroll
              className="list"
              iScroll={iScroll}
              options={{scrollY:true}}>
              <JingxiItemList data={data.outwear.item}
                          addItem={::this.addItem}
                          type={this.state.currentTab}
                          shouldUpdate={this.state.currentTab === 'outwear'}
                          reduceItem={::this.reduceItem}/>
            </ReactIScroll>
            <ReactIScroll
              className="list"
              iScroll={iScroll}
              options={{scrollY:true}}>
              <JingxiItemList data={data.bottom.item}
                          addItem={::this.addItem}
                          type={this.state.currentTab}
                          shouldUpdate={this.state.currentTab === 'bottom'}
                          reduceItem={::this.reduceItem}/>
            </ReactIScroll>
            <ReactIScroll
              className="list"
              iScroll={iScroll}
              options={{scrollY:true}}>
              <JingxiItemList data={data.accessories.item}
                          addItem={::this.addItem}
                          type={this.state.currentTab}
                          shouldUpdate={this.state.currentTab === 'accessories'}
                          reduceItem={::this.reduceItem}/>
            </ReactIScroll>
            <ReactIScroll
              className="list"
              iScroll={iScroll}
              options={{scrollY:true}}>
              <JingxiItemList data={data.home.item}
                          addItem={::this.addItem}
                          type={this.state.currentTab}
                          shouldUpdate={this.state.currentTab === 'home'}
                          reduceItem={::this.reduceItem}/>
            </ReactIScroll>
          </ReactSwipe>
        </div>
        {this.buyCar(wrapped)}
      </div>
    )
  }
}

JingxiSelector.propTypes = {
  queryJingxi: PropTypes.func.isRequired,
  data: PropTypes.object,
  isLoading:PropTypes.bool.isRequired,
  jingxiItemChange: PropTypes.func.isRequired,
  selectedJingxi:PropTypes.object,
  confirmJingxi:PropTypes.func.isRequired,
  toOrder:PropTypes.func.isRequired,
  cleanSelectedAction:PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.jingxi.isLoading,
    data: state.jingxi.data
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    queryJingxi:()=>dispatch(jingxiList()),
    jingxiItemChange:(itemType,code,num)=> {
      dispatch(jingxiItemChange({
        itemType:itemType,
        code:code,
        num:num
      }))
    },
    confirmJingxi:(selected)=>dispatch(jingxiConfirm(selected)),
    cleanSelectedAction : ()=>dispatch(cleanSelected()),
    toOrder: (orderNo) => dispatch(push({pathname: '/xiyi/book/jingxi'}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JingxiSelector)
