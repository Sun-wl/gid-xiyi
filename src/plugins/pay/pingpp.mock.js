/**
 * Created by evan on 2016/5/17.
 */
import {sleep} from "common"

const pingpp = {
  createPayment: (data, next) => {
    sleep(2000).then(()=>next('success'))
  }
};

export default  pingpp
