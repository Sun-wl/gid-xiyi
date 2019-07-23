/**
 * Created by evan on 2016/5/17.
 */
import {sleep} from "common"

const NativeJsBridge = {
  /**
   * @param next 回调函数
   * 获取联系信息 调用成功后需要返回执行next函数
   * 返回结构
   *  {
   *    city:城市
   *    name：联系人
   *    mobile：手机号
   *    address：联系地址
   *    details:联系地址详情
   *    id：联系信息数据库ID
   *   }
   */
  selectContact: (id,next) => {
    sleep(2000).then(()=>next(
        '{ "city": "上海", ' +
        '"name": "测试", ' +
        '"mobile": "13524101988",' +
        '"address": "愚园路1107号弘基/创邑国际园",' +
        '"details": { "detail":"1号楼4层403室", "floor":"12", "building":"1", "room":"13"},' +
        '"id": 1000' +
        '}'
      )
    )
  },
  /**
   *
   * @param orderNo
   * @param next
   */
  pay: (orderNo, payType, amount) => {
    sleep(2000).then(()=>
      window.gPush(`/order/pay/result?amont=${amount}&orderNo=${orderNo}&status=success`)
    )
  }

};


export default  NativeJsBridge
