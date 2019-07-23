/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll-probe'
import {FormattedMessage as Text} from 'react-intl'
import {orderList} from 'reducers/Order/List'
import _ from 'lodash'
import TabNav from './TabNav'
import {connect} from 'react-redux'
import {PAGE_SIZE} from 'common'
import {Link} from 'react-router'
import clock  from 'static/img/clock.png'
import address  from 'static/img/address.png'
import noOrders  from 'static/img/no_orders.png'
import {push} from 'react-router-redux'
import {toastr} from 'components/toastr'
import loadingImg from 'static/img/loading.gif'

class OrderListItem extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {tabIndex: 1, pullDown: false, pullUp: false}
    this.messages = context.intl.messages
    this.pageNo = 1
  }

  componentDidMount() {
    this.props.orderList(this.getUrl(1, 1), 'init')
  }

  componentWillReceiveProps(nextProps) {
    const nextHasData = nextProps.hasData
    const hasData = this.props.hasData
    if (hasData && !nextHasData) {
      toastr.success("order.list.empty")
    }
    if (this.props.pending && !nextProps.pending) {
      this.setState({pullUp: false, pullDown: false})
    }
  }

  toPay(e, orderNo) {
    e.preventDefault()
    this.props.toPay(`/order/pay/payment/${orderNo}`)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.pullDown === nextState.pullDown &&
      this.state.pullUp === nextState.pullUp &&
      this.props.pending === nextProps.pending) {
      return false
    } else {
      return true
    }
  }

  getUrl(tabIndex, pageNo) {
    return `flag=${tabIndex}&pageSize=${PAGE_SIZE}&pageNo=${pageNo}`
  }

  scrollEnd(iScrollInstance) {
    if (this.state.pullUp && !this.props.pending) {
      this.pageNo = 1
      this.props.orderList(this.getUrl(this.state.tabIndex, this.pageNo), 'down')
    }
    if (this.state.pullDown && !this.props.pending) {
      this.pageNo = this.props.hasData ? this.pageNo + 1 : this.pageNo
      this.props.orderList(this.getUrl(this.state.tabIndex, this.pageNo), 'up')
    }
  }

  scrollMove(iScrollInstance) {
    if(iScrollInstance.y > 60){
      iScrollInstance.y =60
      return
    }
    if( iScrollInstance.y + 60 < iScrollInstance.maxScrollY){
      iScrollInstance.y =iScrollInstance.maxScrollY-60
      return
    }
    if (!this.state.pullUp && iScrollInstance.y > 8) {
      this.setState({pullUp: true})
    } else if (!this.state.pullDown && iScrollInstance.y < (iScrollInstance.maxScrollY - 8)) {
      this.setState({pullDown: true})
    }
  }

  clickTabs(tabIndex) {
    this.setState({tabIndex: tabIndex})
    this.pageNo = 1
    this.props.orderList(this.getUrl(tabIndex, this.pageNo), 'init')
  }

  payText(order) {
    if (order.payStatus !== 2 && order.status <= 2)
      return (<span className='txt-red'><Text id='order.pay.no' /></span>)
    else if (order.payStatus === 2 && order.status === 13)
      return (<span className='txt-red'><Text id='order.signCode' values={{code:order.signCode}} /></span>)
    else
      return (
        <span className='txt-red'><Text id='currency' values={{price:'' + (order.feePrice.collectionMoney / 100.00)}} /></span>
      )
  }

  payActionText(order) {
    //if (order.payStatus !== 2 && order.status > 2) {
    if (order.allowPay) {
      return (
        <div className='items'>
          <div className='w-72 float-l'>
            <img src={address} width='18' />
            <span className="pd-l-4">{order.from.address} {order.from.details}</span>
          </div>
          <div className='w-28 float-r text-r'>
            <span className='payAction' onClick={(e) => this.toPay(e,order.orderNo)}>
              <Text id='order.pay.action' />
            </span>
          </div>
          <div className='clear'></div>
        </div>
      )
    } else {
      return (
        <div className='items'>
          <img src={address} width='18' />
          <span className="pd-l-4">{order.from.address} {order.from.details}</span>
        </div>
      )
    }
  }

  orderListPanel(orders) {
    return _.map(orders, order => {
      return (
        <li className="dyLi" key={order.orderNo}>
          <Link to={`/order/details?orderNo=${order.orderNo}`}>
            <section className='order-bd'>
              <div className='float-l'>{order.statusText}</div>
              <div className='float-l mg-l-10 reserver'>{order.goodsTypeText}</div>
              <div className='float-r'>{this.payText(order)}</div>
              <div className='clear'></div>
              {this.payActionText(order)}
              <div className='items'>
                <img src={clock} width='18' />
                <span className="pd-l-4">{order.createTime}</span>
              </div>
            </section>
          </Link>
        </li>
      )
    })
  }

  pullText(pullStatus, pending) {
    return pullStatus ?
      <li className="pullUp">
        {pending && <img className="loadingImg w20" src={loadingImg} />}
        <Text id={pending?'loading':'order.list.refresh'} />
      </li> : <li />
  }

  renderOrders() {
    const {orders, pending} = this.props
    if (pending && orders.length === 0) {
      return (<div className="no-order" />)
    } else if (!pending && orders.length === 0) {
      return (
        <div className="no-order">
          <div>
            <img src={noOrders} width="32px" />
          </div>
          <div><Text id='order.not.list' /></div>
        </div>
      )
    } else {
      return (
        <ReactIScroll
          iScroll={iScroll}
          options={{ /**mouseWheel: true,**/probeType: 3,click:true}}
          onScroll={::this.scrollMove}
          onScrollEnd={::this.scrollEnd}>
          <ul>
            {this.pullText(this.state.pullUp, pending)}
            {this.orderListPanel(orders)}
            {this.pullText(this.state.pullDown, pending)}
          </ul>
        </ReactIScroll>
      )
    }
  }
  render() {
    return (
      <div>
        <TabNav index={this.state.tabIndex} action={::this.clickTabs} />
        <div className='order-list'>  {this.renderOrders()} </div>
      </div>
    )
  }
}

OrderListItem.propTypes = {
  orders: PropTypes.array.isRequired,
  orderList: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  hasData: PropTypes.bool.isRequired,
  toPay: PropTypes.func.isRequired
}

OrderListItem.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    pending: state.orderList.pending,
    hasData: state.orderList.hasData,
    orders: state.orderList.orders || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    orderList: function (data, active) {
      dispatch(orderList(data, active))
    },
    toPay: (path) => {
      dispatch(push({pathname: path}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListItem)
