/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {getProtCode} from 'reducers/Fuli'

class FuliIncakeView extends Component {

  getCode() {
    this.props.getCodeAction('incake')
  }

  render() {
    const {msg, code} = this.props
    return (
      <div className="bk-bg">
        <section>
          <div>
            甄选世界优质食材
            <br/>
            上海印克传承纯正英式风味
          </div>
          <img src="/img/incake.png" className="mainImg"/>
          <div>INCAKE 赠送价值<span className="lvs">50元</span>抵用券</div>
          <div className="name">有效期截止至: 2016年6月30日</div>
          <div>
            <button onClick={:: this.getCode}>{msg && !code
                ? msg
                : (code
                  ? code
                  : '点击领取优惠码')}</button>
          </div>
          <div className="txt-red text-c">
            {code
              ? '注：请自行保存好优惠码'
              : ''}
          </div>
        </section>

        <section>
          <div>使用须知</div>
          <hr/>
          <div className="item">
            <div>
              本券可拨打
              <span className="lvs">400-921-5757</span>
              <br/>
              INCAKE官网
              <span className="lvs">www.incake.net</span>
              <br/>
              <span className="lvs">微信商城</span>
              订购蛋糕时使用
            </div>
          </div>
          <div>(节日产品、主题蛋糕及下午茶系列除外)</div>
          <div className="item">
            <div>
              本券仅限
              <br/>
              <span className="lvs">上海、苏州、昆山、福州、厦门使用
              </span>
              <br/>
              配送范围详情拨打400-921-5757
              <br/>
              或INCAKE官网咨询.
            </div>
          </div>

          <div className="item">
            <div>
              每个订单<span className="lvs">仅限使用一张</span>
              不累计使用,
              <br/>
              不参加INCAKE积分累计奖励,<br/>
              不与其他优惠同时使用
            </div>
          </div>

          <div className="item">
            <div>
              本券售出
              <span className="lvs">
                恕不退款, 不兑换现金, 不找零,
                <br/>
                复印无效
              </span>
            </div>
          </div>
          <div className="item">
            <div>
              非INCAKE授权单位或个人,
              <br/>
              <span className="lvs">不可对本券进行二次销售,</span><br/>
              否则INCAKE有权停止该券使用
            </div>
          </div>
          <div className="item">
            <div className="lvs">
              INCAKE为确保给您带来上乘的蛋糕品质, 所有磅数蛋糕请提前24小时预订
            </div>
          </div>
        </section>
      </div>
    )
  }

}

FuliIncakeView.propTypes = {
  getCodeAction: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  msg: PropTypes.string,
  code: PropTypes.string
}

const mapStateToProps = (state) => {
  if (state.fuli.proType === 'incake') {
    return {
      pending: state.fuli.pending || false,
      msg: state.fuli.msg,
      code: state.fuli.code
    }
  } else {
    return {pending: false, msg: null, code: null}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCodeAction: function(type) {
      dispatch(getProtCode(type))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuliIncakeView)
