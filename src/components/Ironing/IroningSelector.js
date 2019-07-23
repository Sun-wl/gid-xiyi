/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import { FormattedMessage as Text } from 'react-intl'
import {connect} from 'react-redux'
import {ironingList, ironItemChange,ironSelectedClean,selectedIronConfirm} from 'reducers/Ironing'
import  './assets/Ironing.scss'
import reduce from 'static/img/jingxi/reduce_light.png'
import raise from 'static/img/jingxi/increase_gre.png'
import classnames from 'classnames'
import _ from 'lodash'
import {goBack} from 'react-router-redux'
import {toastr} from 'components/toastr'
import ReactSwipe from 'react-swipe'
import Tappable from 'react-tappable'

class IroningSelector extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {currentTab: "outwear"}

  }

  componentWillMount() {
  if(!this.props.data)
    this.props.queryIroning()
    toastr.showOverlay()
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
      default:
        swipe.slide(0)
    }
  }

  addItem(itemType,code){
   this.props.ironItemChange(itemType,code,1)
  }

  reduceItem(itemType,code){
    this.props.ironItemChange(itemType,code,-1)
  }

  confirm(){
    this.props.selectedIronConfirm()
    toastr.hideOverlay()
    this.props.goBack()
  }

  clean(){
    //clean
    this.props.ironSelectedClean()
    toastr.hideOverlay()
    this.props.goBack()
  }

  initTab(data) {
    return (
      <div className="menu">
        <Tappable onTap={(e) => {e.preventDefault(); this.clickTab(data.outwear.code)}}>
            <div  className={classnames({cur:this.state.currentTab === data.outwear.code})}>
              <span>{data.outwear.name}</span>
            </div>
        </Tappable>
        <Tappable onTap={(e) => {e.preventDefault(); this.clickTab(data.bottom.code)}}>
          <div className={classnames({cur:this.state.currentTab === data.bottom.code})}>
           <span>{data.bottom.name}</span>
         </div>
        </Tappable>
        <Tappable onTap={(e) => {e.preventDefault(); this.clickTab(data.accessories.code)}}>
            <div className={classnames({cur:this.state.currentTab === data.accessories.code})}>
             <span>{data.accessories.name}</span>
            </div>
        </Tappable>
        <div className="clear"></div>
      </div>
    )
  }

  initData(item) {
    return _.map(item, item => {
        return (
          <div className="item" key={item.code}>
            <div>
              <Tappable onTap={(e)=> {e.preventDefault(); this.addItem(this.state.currentTab, item.code)} }>
                <img src={`/img/iron/${item.code}.png`} className="showImg" />
              </Tappable>
            </div>
            <div className="name">
              {item.name} <br/>
              <Text id='piece' values={{price:item.price/100.00}}/>
            </div>
            <div>
              <Tappable onTap={(e)=> {e.preventDefault(); this.reduceItem(this.state.currentTab, item.code)}}>
                <img className="reduceImg" src={reduce} />
              </Tappable>
              {item.num||0}
              <Tappable onTap={(e)=> {e.preventDefault(); this.addItem(this.state.currentTab, item.code)}}>
                <img className="raiseImg" src={raise} />
              </Tappable>
            </div>
          </div>
        )
      }
    )
  }

  calcPrice(){
    if( !this.props.data){
      return 0
    }
    const {outwear, bottom, accessories, packingBox}  = this.props.data
   const packingBoxNum =  packingBox ?  ((this.calcPackageBox()-1) * packingBox.item[0].price) : 0
    return   _.reduce(outwear.item,(sum,v) => sum +  v.price *(v.num||0),0) +
      _.reduce(bottom.item,(sum,v) => sum +  v.price *(v.num||0),0) +
      _.reduce(accessories.item,(sum,v) => sum +  v.price *(v.num||0),0) + packingBoxNum

  }

  calcPackageBox(){
  if( !this.props.data){
    return 1
  }
  const {outwear, bottom, accessories}  = this.props.data
  const totalSpace =
    _.reduce(outwear.item,(sum,v) => sum +  v.space *(v.num||0),0) +
    _.reduce(bottom.item,(sum,v) => sum +  v.space *(v.num||0),0) +
    _.reduce(accessories.item,(sum,v) => sum +  v.space *(v.num||0),0)
  return  Math.ceil(totalSpace/110.0) || 1
}

  calcPackageBoxText(){
    return <Text id="order.ironing.packageBox1" values={{num: this.calcPackageBox() }}/>
  }

  swipeback(i,item){
    switch (i) {
      case 1:
        this.setState({currentTab: 'bottom'});
        break;
      case 2:
        this.setState({currentTab: 'accessories'});
        break;
      default:
        this.setState({currentTab: 'outwear'});
    }
  }

  render() {
    const {data, isLoading} = this.props
    if (isLoading || !data) {
      return (<div></div>)
    }
    return (
      <div className="iron-service">
        <div className="top">
          <div className="float-l"><Text id='order.ironing.service.name'/></div>
          <div className="float-r cancel" onClick={::this.clean}><Text id="clean"/></div>
          <div className="clear"></div>
        </div>
        {this.initTab(data)}
        <div className="list">
          <ReactSwipe ref="reactSwipe" swipeOptions={{continuous: false,stopPropagation:false, callback:(::this.swipeback)}}>
            <div>
              {(isLoading || !data) ? (<div></div>) : this.initData(data.outwear.item)}
              <div className="clear"></div>
            </div>
            <div>
              {(isLoading || !data) ? (<div></div>) : this.initData(data.bottom.item)}
              <div className="clear"></div>
            </div>
            <div>
              {(isLoading || !data) ? (<div></div>) : this.initData(data.accessories.item)}
              <div className="clear"></div>
            </div>
          </ReactSwipe>
        </div>
        <div className="total">
          <div className="price">
            <Text id='order.ironing.total'/><span className="p"> ￥ {this.calcPrice()/100.00}</span>
          </div>
          <div className="ok" onClick={::this.confirm}><Text id='done'/></div>
          <div className="desc">
            <span className="ironingBox">
              <ul className="ul-d mg-l-18">
                <li>{this.calcPackageBoxText()}</li>
                <li><Text id='order.ironing.packageBox2'/></li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

IroningSelector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  queryIroning: PropTypes.func.isRequired,
  data: PropTypes.object,
  goBack: PropTypes.func.isRequired,
  ironItemChange: PropTypes.func.isRequired,
  ironSelectedClean: PropTypes.func.isRequired,
  selectedIronConfirm: PropTypes.func.isRequired,
  selected: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    data: state.iron.data,
    isLoading: state.iron.isLoading,
    selected: state.selected
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    queryIroning: function () {
      dispatch(ironingList())
    },
    goBack:function(){
      dispatch(goBack())
    },
    ironItemChange:(itemType,code,num)=>{
      dispatch(ironItemChange({
        itemType:itemType,
        code:code,
        num:num
      }))
    },
    ironSelectedClean:()=>{
      dispatch(ironSelectedClean())
    },
    selectedIronConfirm:()=>{
      dispatch(selectedIronConfirm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IroningSelector)
