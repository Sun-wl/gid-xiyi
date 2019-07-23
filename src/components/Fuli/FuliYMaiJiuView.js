/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {connect } from 'react-redux'
import {getProtCode} from 'reducers/Fuli'

class FuliYMaiJiuView extends Component {

  constructor(props, context) {
    super(props, context)
  }

  getCode() {
    this.props.getCodeAction('ymj')
  }

  render() {
    const { pending,msg, code} = this.props
    return (
      <div className="bk-bg">
        <section>
          <div>
            百分百原装进口, 650万平安保险
            <br/> 800万用户见证,全球领先葡萄酒电商
          </div>
          <img src="/img/ymj.jpg" className="mainImg"/>
          <div className="name">菲兰特利骑士干红葡萄酒</div>
          <div>也买酒赠送价值<span className="lvs">138 元</span>进口葡萄酒一瓶</div>
          <div>运费自理(运费20元)，或购买活动页产品包邮</div>
          <div>
            <button onClick={::this.getCode}>{msg && !code ? msg : (code ? code : '点击领取优惠码')}</button>
          </div>
          <div className="txt-red text-c">
            {code ? '注：请自行保存好优惠码' : ''}
          </div>
        </section>

        <section>
          <div>微信领取方式</div>
          <hr />
          <div className="item">
            <div>手 机 关 注 也 买 酒 订 阅 号</div>
            <div>"<span className="lvs">也买酒 Yesmywine</span>"</div>
            <img width="170px" src="/img/qrcode.jpg"/>
          </div>
          <div>
            <img src="/img/array.png"/>
          </div>
          <div className="item">
            <div>
              点击底部菜单里 " 福利社 " 专区的
              <br />
              "<span className="lvs">免 费 领 酒 区</span>"
            </div>
          </div>
          <div>
            <img src="/img/array.png"/>
          </div>
          <div className="item">
            <div>
              将 "我 爱 红 酒" 商品点击加入购物车
            </div>
          </div>
          <div>
            <img src="/img/array.png"/>
          </div>
          <div className="item">
            <div>
              在购物车界面里点击 "<span className="lvs">优 惠 券</span>" 进入,
              <br /> 输入优惠券号, 即可0元进行下单,
              <br /> 只需支付20元快递费
            </div>
          </div>
          <div className="item">
            <div>
              <span className="lvs">
              特别说明
                <br />若您在也买酒合作专区再购买一瓶, <br />
						满99元立即享受包邮优惠
              </span>
            </div>
            <hr />
            <div>
              每 个 手 机 号 限 领 一 瓶
            </div>
          </div>
        </section>
      </div>
    )
  }
}

FuliYMaiJiuView.propTypes = {
  getCodeAction: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  msg: PropTypes.string,
  code: PropTypes.string
}

const mapStateToProps = (state) => {
  if(state.fuli.proType === 'ymj'){
    return {
      pending: state.fuli.pending || false,
      msg: state.fuli.msg,
      code: state.fuli.code
    }
  }else{
    return {
      pending:  false,
      msg: null,
      code: null
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCodeAction: function (type) {
      dispatch(getProtCode(type))
    }
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(FuliYMaiJiuView)
