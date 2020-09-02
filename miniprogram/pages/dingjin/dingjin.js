//Page Object
Page({

  gopay(){
    wx.cloud.callFunction({
      name: 'payment',
      data: {
        // weRunData: wx.cloud.CloudID(e.detail.cloudID),
        money:10000
      },
      success: res => {
        console.log("支付参数成功",res)
        const payment = res.result.payment
        wx.requestPayment({
          ...payment,
          success (res) {
            console.log('支付成功', res)
          },
          fail (res) {
            console.error('支付失败', res)
          }
        })
      },
      fail: res=>{
        console.log("支付参数失败",res)
      },
    })
  },

onLoad: function(options){
  
},
onReady: function(){
  
},
onShow: function(){
  
},
onHide: function(){

},
onUnload: function(){

},
onPullDownRefresh: function(){

},
onReachBottom: function(){

},
onShareAppMessage: function(){

},
onPageScroll: function(){

},
//item(index,pagePath,text)
onTabItemTap:function(item){

}
});
