const db = wx.cloud.database()
Page({
  data: {
    anli:{},
  },
  getData(e){
    db.collection('wenzhang').get().then(res=>{
      const anli = res.data[1].anli[e]
      this.setData({
        anli
      })
    })
  },

  onLoad: function(options){
    this.getData(options.id)
    // console.log(options.id)
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