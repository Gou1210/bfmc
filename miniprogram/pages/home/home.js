const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    zhonglei:{},
    tabs: [
      {
        id: 0,
        name: "安装案例",
        isActive: true
      },
      {
        id: 1,
        name: "购买需知",
        isActive: false
      } ,  
      {
        id: 2,
        name: "门窗知识",
        isActive: false
      }   
    ],
    hb:true,
    anli:[],
    zhishi:[],
    menchuang:[]
  },
  getData(){
    db.collection('home').get().then(res=>{
      
      const banner = res.data[3].swiper
      const zhonglei = res.data[2].zhonglei
      const anli = res.data[1].anli
      const zhishi = res.data[4].zhishi
      const menchuang= res.data[5].menchuang
      
      this.setData({
        banner,
        zhonglei,
        anli,
        zhishi,
        menchuang
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  handleItemChange(e) {
    // 接收传递过来的参数
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  clearTap(){
    let hb = this.data.hb
    hb = true
    this.setData({
      hb
    })
  },
  reLaunch(){

    wx.reLaunch({
      url:'../dongkou/dongkou'
    })
    
  },
  onLoad: function (options) {
    this.getData()
    let hb = this.data.hb
    hb = false
    this.setData({
      hb
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