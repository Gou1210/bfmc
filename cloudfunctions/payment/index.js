const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
    const {money} = event
  const res = await cloud.cloudPay.unifiedOrder({
      
    "body" : "支付订金",
    "outTradeNo" : "121775250120140"+new Date().getTime(),
    "spbillCreateIp" : "127.0.0.1",
    "subMchId" : "1601110324",
    "totalFee" :money,
    "envId": "bfxy-hpbml",
    "functionName": "pay_cb",
    "nonceStr":"5K8264ILTKCH16CQ2502SI8ZNMTM67VS",
    "tradeType":"JSAPI",
    // "openid":"oUpF8uMuAJO_M2pxb1Q9zNjWeS6o"

  })
  return res
}