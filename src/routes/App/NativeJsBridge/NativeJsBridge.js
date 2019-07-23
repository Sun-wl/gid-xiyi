
/**
 * Created by evan on 2016/5/12.
 */

const NativeJsBridge = {

  wrapperJavascriptBridge:(callback) => {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
  },

  /**
   * @param next 回调函数
   * 获取联系信息 调用成功后需要返回执行next函数
   * 返回结构
   *  {
   *    city:城市 required
   *    name：联系人 required
   *    mobile：手机号 required
   *    address：联系地址 required
   *    details:联系地址详情 required
   *    id：联系信息数据库ID  required
   *   }
   */
  selectContact: (id, next) => NativeJsBridge.wrapperJavascriptBridge(
    bridge => bridge.callHandler('selectContact', {'id':id}, next)
  ),


  /**
   * 支付接口
   * @param orderNo
   * @param next
   * 返回接果
   * status: success/fail/cancel/other required
   * msg: 失败原因  Option
   * amount:支付金额单位(分) required
   * orderNo:订单号  required
   */


  pay:(orderNo,payType,amount)=> NativeJsBridge.wrapperJavascriptBridge(
    bridge => bridge.callHandler('orderPay',
         {
           'orderNo': orderNo,
           'channel':payType,
           'amount':amount
         }
    )
  )
}


export default  NativeJsBridge
