/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import IndexTitle from './IndexTitle'
import IndexBody from './IndexBody'
import './assets/Recharge.scss'
import {connect} from 'react-redux'
import {queryRechargeList,queryAccount,changeState} from 'reducers/Recharge'
import _ from 'lodash'
import {push} from 'react-router-redux'
import Tappable from 'react-tappable'
import {FormattedMessage as Text} from 'react-intl'
import {toastr} from 'components/toastr'
class RechargeIndex extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
  }

  componentDidMount() {
    const {tag,amount} = this.props
    if(tag===1&&amount!==0) {
      this.refs.inbo.getElementsByTagName("input")[0].value=amount/100.00
    }
    if (/Android/gi.test(navigator.userAgent)) {
      window.addEventListener('resize', function () {
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
          window.setTimeout(function () {
            document.activeElement.scrollIntoViewIfNeeded();
          }, 0);
        }
      })
    }
  }

  selectItem(amount){
    if(amount === 0){
      this.props.changeState({
        amount:amount,
        tag:1
      });
    }else{
      this.refs.inbo.getElementsByTagName("input")[0].value='';
      this.refs.inbo.getElementsByTagName("input")[0].blur();
      this.props.changeState({
        amount:amount,
        tag:0
      });
    }
  }

  otherItem(e){
   if(!isNaN(e.target.value)){
     this.props.changeState(
       {
         amount:e.target.value*100,
         tag:1
       });
   }
  }

  confirm(){
    //判断输入值
    const {list,confirmAction,amount} = this.props
    if(amount <100 || amount> 500000 ){
       toastr.error('recharge.suggest')
       return
    }

    const data =  _.last(_.filter(list.data,item=> item.amount <= amount))
    if(data){
      confirmAction({amount:amount, reward:data.reward})
    }else{
      confirmAction({amount:amount,reward:0})
    }
  }
  componentWillMount() {
     this.props.queryAccount()
     this.props.queryRechargeList()
  }

  render() {
    const {list,account,tag,amount} = this.props
    return (
      <div ref="inbo" className="recharge">
        <IndexTitle account={account} />
        <IndexBody tag={tag}
                   list={list}
                   selectItem = {::this.selectItem}
                   otherItem = {::this.otherItem}
                   amount={amount}/>
        <div className="inbu">
          <Text id="recharge.now" >
            {
              (text) => <Tappable className="btn-recharge" onTap={::this.confirm} >{text}</Tappable>
            }
          </Text>
        </div>
      </div>
    )
  }
}

RechargeIndex.propTypes = {
  queryRechargeList: PropTypes.func.isRequired,
  queryAccount: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  amount:PropTypes.number.isRequired,
  tag:PropTypes.number.isRequired
}

RechargeIndex.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    list:state.recharge.list,
    account:state.recharge.account,
    amount:state.recharge.initState.amount,
    tag:state.recharge.initState.tag
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    queryRechargeList:() => dispatch(queryRechargeList()),
    queryAccount:() => dispatch(queryAccount()),
    changeState:(action) => dispatch(changeState(action)),
    confirmAction:(data) => dispatch(push({pathname:'/recharge/confirm',query:data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeIndex)
