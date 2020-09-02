const db = wx.cloud.database()
//Page Object
Page({
  data: {
    res:[]
  },
  getData(){
        db.collection('order')
        .get().then(res=>{
          res = res.data
          console.log(res)
         this.setData({
           res
         })
        })
  },
  changeTap(){
const res = this.data.res
 res.forEach(v=>{
    const moblie = v.moblie
    const zhekou = v.zhekou
    const juanGai = v.juanGai
    const totalPrice = v.totalPrice
    const order = v.order
  order.forEach((v,index)=>{
    v.goodsInfo.moblie=moblie
    v.goodsInfo.zhekou=zhekou
    v.goodsInfo.juanGai=juanGai
    v.goodsInfo.totalPrice=totalPrice
      db.collection("excel").add({
    data:{
     height:v.goodsInfo.height,
     width0:v.goodsInfo.width0,
     width1:v.goodsInfo.width1,
     width2:v.goodsInfo.width2,
     juanGai:v.goodsInfo.juanGai,
     moblie:v.goodsInfo.moblie,
     num:v.goodsInfo.num,
     partsPriceSumCon:v.goodsInfo.partsPriceSumCon,
     square:v.goodsInfo.square,
     standardParts:v.goodsInfo.standardParts,
     standardPriceSum:v.goodsInfo.standardPriceSum,
     title:v.goodsInfo.title,
     totalPrice:v.goodsInfo.totalPrice,
     zhekou:v.goodsInfo.zhekou,
partsArr :v.goodsInfo.partsArr.join('-')
    }
  }).then(goodsInfo=>{

  })
  })
    
  })
  },
  onLoad: function(options){
    this.getData()
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