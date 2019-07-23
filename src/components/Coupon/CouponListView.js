/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import CouponListItem from './CouponListItem'
import {exchangeCoupon, couponList} from 'reducers/Coupon'
import {connect} from 'react-redux'
import {FormattedMessage as Text} from 'react-intl'
import classnames from 'classnames'
import './assets/Coupon.scss'
import {toastr} from 'components/toastr'

class CouponListView extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {inputCode: ''}
  }

  componentWillMount() {
    this.props.couponList()
  }

  componentWillUnmount() {
    toastr.clean()
  }

  componentWillUpdate(nextProps) {
    if (this.props.exchangeStatus === 'exchange' && nextProps.exchangeStatus === 'success') {
      this.props.couponList()
      this.setState({inputCode:''})
      toastr.success('completed')
    } else if (this.props.exchangeStatus === 'exchange' && nextProps.exchangeStatus === 'error') {
      this.setState({inputCode:''})
      toastr.error(nextProps.errorMsg)
    }
  }

  exchange() {
    if(this.state.inputCode.length <2){
       return
    }
    this.props.exchange(this.state.inputCode)
  }

  inputCodeChange(e) {
    this.setState({inputCode: e.target.value.trim()})
  }

  selectedCoupon(coupons) {
     if(this.props.selectedCoupon){
       this.props.selectedCoupon(coupons)
     }
  }
  render() {
     let {data, selected, isLoading} = this.props
     if(!this.props.selectedCoupon){
       selected = {}
     }
    return (
      <div>
        <div className="coupon-wallpaper">
          <div>
            <Text id='order.coupon.promocode.hint'>
              {(text) =>
                <input type="text" value={this.state.inputCode}
                  placeholder={text} onChange={::this.inputCodeChange}
                  className={classnames({'couponInput':true})} />
              }
            </Text>
            <button className="get-btn float-r" onClick={::this.exchange}><Text id='collect' /></button>
          </div>
          <div>
            <CouponListItem
              data={data}
              selectedCoupon={::this.selectedCoupon}
              selected={selected}
              isLoading={isLoading} />
          </div>
        </div>
      </div>
    )
  }
}

CouponListView.propTypes = {
  exchange: PropTypes.func.isRequired,
  selected: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  exchangeStatus: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  couponList: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  selectedCoupon: PropTypes.func,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.coupon.isLoading || false,
    exchangeStatus: state.coupon.exchangeStatus,
    errorMsg: state.coupon.msg || '',
    data: state.coupon.data || [],
    selected: state.coupon.selected
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const city = props.location.query.city
  return {
    couponList: function () {
      dispatch(couponList(city))
    },
    exchange: function (promotionCode, next) {
      dispatch(exchangeCoupon(promotionCode, next))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CouponListView)
