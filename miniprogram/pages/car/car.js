const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:[],
    allChecked:true,
    totalPrice:0,
    juanGai:0
  },
  // juan:[],
  getData(){
    let totalPrice = 0

   const juan = wx.getStorageSync('juan')
   let juanGai = this.data.juanGai
    db.collection('car')

    .get().then(res=>{
      
      (res.data).forEach(item => {
        
      for ( let x in item.goodsInfo.partsArr){
        if(typeof(item.goodsInfo.partsArr[x])=='string'){
         const strIndex = (item.goodsInfo.partsArr[x].indexOf("+")) 

         if(strIndex!=-1){
           
            item.goodsInfo.partsArr[x]=((item.goodsInfo.partsArr[x]).slice(0,strIndex))

         }

        }
        if(item.goodsInfo.partsArr[x]==='不需要'){
          delete item.goodsInfo.partsArr[x]
        }
      }

      if(item.goodsInfo.checked){
        totalPrice = item.goodsInfo.standardParts+totalPrice
      }
      
    });

      if(juan[0]==100&&totalPrice>1000&&totalPrice<2000){
        juanGai = juan[0]
      }
      if(juan[1]==200&&totalPrice>2000&&totalPrice<3000){
        juanGai = juan[1]
      }
      if(juan[2]==300&&totalPrice>3000){
        juanGai = juan[2]
      }
      if(totalPrice<1000){
        juanGai = 0
      }

    res = res.data

      this.setData({
        res,
        totalPrice,
        juanGai
      })
    })
  },
 deleteTap(e){
  db.collection('car').doc(e.currentTarget.dataset.id).remove({
    success: function(res) {
     
    }
  })
  this.getData()

 },
 btnsub(e){
  const {title,phone,site} = e.detail.value
  db.collection("order").add({
    data:{
     res:this.data.res,
     title,phone,site
    }
  }).then(res=>{

  })
  wx.showToast({
   title: '提交成功',
   icon: 'success',
   // true 防止用户 手抖 疯狂点击按钮 
   mask: true
 });
 },
 handeItemChange(e){
const cart =   this.data.res
let allChecked = this.data.allChecked
const index = e.currentTarget.dataset.index
 this.data.res[index].goodsInfo.checked = !this.data.res[index].goodsInfo.checked
let totalPrice =   0
const juan = wx.getStorageSync('juan')
let juanGai = this.data.juanGai
cart.forEach(v=>{

      if(v.goodsInfo.checked){
        totalPrice = v.goodsInfo.standardParts+totalPrice
      }

    })

    allChecked = cart.every(v=>v.goodsInfo.checked)
    if(juan[0]==100&&totalPrice>1000&&totalPrice<2000){
      juanGai = juan[0]
    }
    if(juan[1]==200&&totalPrice>2000&&totalPrice<3000){
      juanGai = juan[1]
    }
    if(juan[2]==300&&totalPrice>3000){
      juanGai = juan[2]
    }
    if(totalPrice<1000){
      juanGai = 0
    }
    this.setData({
      totalPrice,
      allChecked,
      juanGai
    })
 },
 handleItemAllCheck(){
  const cart =   this.data.res
  let allChecked =   this.data.allChecked
  let totalPrice =   0
  const juan = wx.getStorageSync('juan')
  let juanGai = this.data.juanGai
   allChecked =   !allChecked


cart.forEach(v => {
  v.goodsInfo.checked = allChecked
  if(v.goodsInfo.checked){
    totalPrice = v.goodsInfo.standardParts+totalPrice
  }
}
  
  
  );
  if(juan[0]==100&&totalPrice>1000&&totalPrice<2000){
    juanGai = juan[0]
  }
  if(juan[1]==200&&totalPrice>2000&&totalPrice<3000){
    juanGai = juan[1]
  }
  if(juan[2]==300&&totalPrice>3000){
    juanGai = juan[2]
  }
  if(totalPrice<1000){
    juanGai = 0
  }
  console.log(juan)
    const res = cart
    this.setData({
      res,
      allChecked,
      totalPrice,
      juanGai
    })
 },
 handleContact (e) {
  // console.log(e.detail.path)
  // console.log(e.detail.query)
},
 getPhoneNumber(e) {

 const resData=   this.data.res
 const totalPrice=   this.data.totalPrice
 const juanGai  = this.data.juanGai
 const zhekou = totalPrice-juanGai
 const date= Math.round(new Date() / 1000)
let height = 0
let width0 = 0
let width1 = 0
let width2 = 0
let num = 0
let partsPriceSumCon = 0
let square = 0
let standardParts = 0
let standardPriceSum = 0
let title = ""
let partsArr = []
//   resData.forEach(v=>{
//      height=v.goodsInfo.height
//      width0=v.goodsInfo.width0
//      width1=v.goodsInfo.width1
//      width2=v.goodsInfo.width2
//      num=v.goodsInfo.num
//      partsPriceSumCon=v.goodsInfo.partsPriceSumCon
//      square=v.goodsInfo.square
//      standardParts=v.goodsInfo.standardParts
//      standardPriceSum=v.goodsInfo.standardPriceSum
//      title=v.goodsInfo.title
//   })
   

//  let order = []
//  cart.forEach(v =>{
//    if(v.goodsInfo.checked){
//     order.push (v) 
//    }
//  })
  wx.cloud.callFunction({
    name: 'getPhone',
    data: {
      weRunData: wx.cloud.CloudID(e.detail.cloudID),
    }
  }).then(res => {

    const moblie = res.result
  resData.forEach(v=>{
     height=v.goodsInfo.height
     width0=v.goodsInfo.width0
     width1=v.goodsInfo.width1
     width2=v.goodsInfo.width2
     num=v.goodsInfo.num
     partsPriceSumCon=v.goodsInfo.partsPriceSumCon
     square=v.goodsInfo.square
     standardParts=v.goodsInfo.standardParts
     standardPriceSum=v.goodsInfo.standardPriceSum
     title=v.goodsInfo.title
     partsArr = v.goodsInfo.partsArr.join('||')
        db.collection("order").add({
      data:{
       moblie,
       totalPrice,
       juanGai,
       zhekou,
       date,
       height,
       width0,
       width1,
       width2,
       juanGai,
       num,
       partsPriceSumCon,
       square,
       standardParts,
       standardPriceSum,
       title,
       totalPrice,
       zhekou,
       partsArr
      }
    }).then(res=>{
   
    })
  })

 
    wx.showToast({
     title: '提交成功',
     icon: 'success',
     mask: true
   });
  }).catch(err => {
    console.error(err);
  });
},
imgTap(e){

  wx.makePhoneCall({
    phoneNumber: '13911394971', 
})
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData()
  
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
    this.getData()
    

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