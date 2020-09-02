const db = wx.cloud.database()
Page({
  data: {
    
    word:[],

  },
  onLoad: function (options) {
 
    db.collection('wenzhang').get().then(res=>{
   
      const word = res.data[0].zhishi[0][options.id]
      this.setData({
        word
      })
    })
  },
})