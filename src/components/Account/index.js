/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import coupons from 'static/img/account/coupons.png'
import address from 'static/img/account/address.png'
import wallet from 'static/img/account/wallet.png'
import arrow from 'static/img/arrow.png'
import './assets/Account.scss'
import Tappable from 'react-tappable'
import {push} from 'react-router-redux'
import FooterNav from 'components/FooterNav'
import {FormattedMessage as Text} from 'react-intl'
import {account} from 'reducers/Account'
import {connect} from 'react-redux'

class Account extends Component {

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    this.props.account()
  }

  isBind(){
    const {data, handleTapEvent} = this.props
    if(data.isBind){
      return (
        <div className="account-bindphone">
          <Text id='page.phone' values={{phoneno:data.username}}/>
        </div>
      )
    }else{
      return (
        <Tappable onTap={(e) => handleTapEvent('/recharge/bind')}  className="account-bindphone">
          <Text id='page.bindphone'/>
          <img src={arrow} />
        </Tappable>
      )
    }
  }

  render() {
    const {handleTapEvent} = this.props
    return (
      <div className="account chbody">
        <section className="account-btn">
          <Tappable onTap={(e) =>handleTapEvent('/recharge')} className='account-btn-item'>
            <img src={wallet}/>
            <p><Text id='page.wallet'/></p>
          </Tappable>
          <Tappable onTap={(e) =>handleTapEvent('/coupon/query')} className='account-btn-item'>
            <img src={coupons}/>
            <p><Text id='page.coupons'/></p>
          </Tappable>
          <Tappable onTap={(e) => handleTapEvent('/contact/query')} className='account-btn-item border-right-none'>
            <img src={address}/>
            <p><Text id='page.address'/></p>
          </Tappable>
        </section>
        {this.isBind()}
        <FooterNav index={3}/>
      </div>
    )
  }

}

Account.propTypes = {
  account: PropTypes.func.isRequired,
  handleTapEvent: PropTypes.func.isRequired,
  data: PropTypes.object || {},
  isLoading:PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.account.isLoading,
    data: state.account.data
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    account:() => dispatch(account()),
    handleTapEvent:(path) => dispatch(push({pathname: path}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)

