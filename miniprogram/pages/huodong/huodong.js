// miniprogram/pages/huodong/huodong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    response:[
      {
        id:0,
        price:100,
        shiyong:1000,
        lingqu:"点击领取",
        yanse:false
      },
      {
        id:1,
        price:200,
        shiyong:2000,
        lingqu:"点击领取",
        yanse:false
      },
      {
        id:2,
        price:300,
        shiyong:3000,
        lingqu:"点击领取",
        yanse:false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  juanArr:[],
  lingquTap(e){
    const index = e.currentTarget.dataset.index
    const lingqu = "已领取"
    let response = this.data.response
    response[index].lingqu = lingqu
    response[index].yanse = true
const juan = response[index].price

this.juanArr.push(juan)
let juanArr1 = [...new Set(this.juanArr)]
function sortNumber(a,b){//升序
  return a - b
}
juanArr1.sort(sortNumber);
console.log(juanArr1)
wx.setStorageSync(
  "juan",juanArr1
  )

    this.setData({
      response
    })
  },
  anniuTap(){
    wx.switchTab({
      url: '../pingkai/pingkai'
    })
  },
  onLoad: function (options) {
    
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