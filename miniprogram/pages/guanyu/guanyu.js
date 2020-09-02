// miniprogram/pages/guanyu/guanyu.js
Page({


  data: {
    nickName:"登录",
    avatarUrl:'https://6266-bfxy-hpbml-1302612614.tcb.qcloud.la/image/women/touxiang.png?sign=47a901d76bb4aa131663ad9c16e6869d&t=1594351727'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 // 查看是否授权
//  wx.getSetting({
//   success (res){
//     if (res.authSetting['scope.userInfo']) {
//       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
//       wx.getUserInfo({
//         success: function(res) {
//           console.log(res.userInfo)
//         }
//       })
//     }
//   }
// })
},
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
    const nickName = e.detail.userInfo.nickName
    const avatarUrl = e.detail.userInfo.avatarUrl
    this.setData({
      nickName,
      avatarUrl
    })
  },
  carTap(){
    console.log(11)
    wx.reLaunch({    
  
      url:"../car/car"
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})