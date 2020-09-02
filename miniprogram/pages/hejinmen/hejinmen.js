const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju:[],
    parts:[],
    standardPriceSum:0,
    partsPriceSum:0,
    width:0,
    height:0,
    square:0,
    num:1,
    current:0,
    standardPrice:0,
    partsPrice:0,
    subID:0,
    parts1:0,
    parts1Price:0,
    parts1PriceSum:0,
    shan:'扇窗',
    xing:'',
    partsArr:[],
    parts1Arr:[],
    goodsInfo:{},
    arr:[],
    imageIndex:0,
    scrollImg:["https://6266-bfxy-hpbml-1302612614.tcb.qcloud.la/%E4%BA%A7%E5%93%81/%E9%97%A8%E7%AA%97%E6%B5%B7%E6%8A%A52.jpg?sign=005c4b92c0a36a448e1412aa15a47d9c&t=1597112626"]
  },
  noShowData:{

 
  },
  getData(){
    db.collection('hejinmen').where({_id:"hejinmen"}).get().then(res=>{
      const shuju = res.data[0].shuju
      // const parts = res.data[0].parts
      // const parts1 = res.data[0].parts1

      this.setData({
        shuju,
        // parts,
        // parts1

      })
    })
  },
  swiperTap(e){
    
    const subID = this.data.subID
    const current = e.detail.current
    const standardPrice = this.data.shuju[0].scrollimg[subID][current].price
    // const title = this.data.shuju[0].scrollimg[subID][current].title
    // console.log(title)
    const shan = this.data.shuju[0].scrollimg[subID][current].title
    const square = this.data.square
    let standardPriceSum = this.data.standardPriceSum
    standardPriceSum = Math.round(square*standardPrice) 
    this.setData({
      standardPrice,
      standardPriceSum,
      shan,
      current,
     
    })
  },
  imgTap(e){
    const keyID = e.currentTarget.dataset.keyid
    const subID =e.currentTarget.dataset.subid
    let scrollImg = this.data.scrollImg
    let shan = this.data.shan
    let xing = this.data.xing
    const current = this.data.current
    let shuju = this.data.shuju
    let standardPriceSum = this.data.standardPriceSum
    const square = this.data.square
    let product = shuju[keyID].xuanze

    let standardPrice = 0
 if(keyID==0){
  shan = this.data.shuju[0].scrollimg[0][0].title
  // console.log( this.data.shuju[0].scrollimg[subID])
 }
       


    if(keyID==1){
       xing = this.data.shuju[1].xuanze[subID].title
    }


    
   
    product.forEach((v, i) => i === subID ? v.isActive = true : v.isActive = false);
    for(let i = 0; i<shuju.length; i++){

      for(let y =0; y<shuju[i].xuanze.length; y++){
        if(shuju[i].xuanze[y].isActive){
  
          standardPrice+=shuju[i].xuanze[y].price
        }
      }
    }
   
    standardPriceSum = Math.round(standardPrice*square)
   
    if(keyID===0){
      scrollImg = []
      shuju[0].scrollimg[subID].forEach(v=> 
        scrollImg.push(v.img)
        )
    }
    
    let imageIndex = 0
    if(keyID==1){
      imageIndex = current
    }
    shuju[keyID].xuanze=product

    this.setData({
      shuju,
      standardPrice,
      standardPriceSum,
      scrollImg,
      subID,
      shan,
      xing,
      imageIndex

    })
  },

widthTap(e){
  let width = e.detail.value
  const height = this.data.height
  let num = this.data.num
  if(width>0&&width<1){
    width=1
  }
  let square = width*height
  // if(square<1&&square>0){
  //   square= 1
  // }  

  console.log(width)
  const standardPriceSum =Math.round(square*this.data.standardPrice) *num
  const partsPriceSum =Math.round(square*this.data.partsPrice) *num
  this.setData({
    standardPriceSum,
    partsPriceSum,
    width,
    square
  })
},
heightTap(e){
  let height = e.detail.value
  const width = this.data.width
  let num = this.data.num
  if(height>0&&height<2){
    height=2
  }
  let square = width*height
  // if(square<2&&square>0){
  //   square= 2
  // }  

  const standardPriceSum =Math.round(square*this.data.standardPrice) *num
  const partsPriceSum =Math.round(square*this.data.partsPrice) *num

  this.setData({
    standardPriceSum,
    partsPriceSum,
    height,
    square
  })
},
  
wordTap(e){
  const keyID = e.currentTarget.dataset.keyid
  const subID = e.currentTarget.dataset.subid
  const square = this.data.square
  
  const num = this.data.num
  let parts = this.data.parts
let partsArr = []
  let product = parts[keyID].xuanze
  let partsPrice =0

  product.forEach((v, i) => i == subID ? v.isActive = true : v.isActive = false);

  for(let i = 0; i<parts.length; i++){

    for(let y =0; y<parts[i].xuanze.length; y++){
      if(parts[i].xuanze[y].isActive){

          partsPrice+=parts[i].xuanze[y].price

          partsArr.push(parts[i].xuanze[y].title)
      }
    }
  }
  
    const partsPriceSum  = Math.round(square*partsPrice*num)

  parts[keyID].xuanze=product

  this.setData({
    parts,
    partsPrice,
    partsPriceSum,
    partsArr,
    

  })
},

parts1Tap(e){
  const keyID = e.currentTarget.dataset.keyid
  const subID = e.currentTarget.dataset.subid

  const num = this.data.num
  let parts1 = this.data.parts1

  let product = parts1[keyID].xuanze
  let parts1Price =0
  let parts1Arr = []
  product.forEach((v, i) => i == subID ? v.isActive = true : v.isActive = false);

  for(let i = 0; i<parts1.length; i++){

    for(let y =0; y<parts1[i].xuanze.length; y++){
      if(parts1[i].xuanze[y].isActive){

          parts1Price+=parts1[i].xuanze[y].price
          parts1Arr.push(parts1[i].xuanze[y].title)
        
      }
    }
  }

    const parts1PriceSum  = parts1Price*num

  parts1[keyID].xuanze=product

  this.setData({
    parts1,
    parts1Price,
    parts1PriceSum,
    parts1Arr

  })
},

touchStart(e){
  const keyID = e.currentTarget.dataset.keyid
  const subID = e.currentTarget.dataset.subid
 
  

  let parts = this.data.parts

  let product = parts[keyID].xuanze


  product.forEach((v, i) => i == subID ? v.imgVisible = true : v.imgVisible = false);


  parts[keyID].xuanze=product

  this.setData({
    parts,

  })
},
touchChend(e){
  const keyID = e.currentTarget.dataset.keyid
  const subID = e.currentTarget.dataset.subid

  

  let parts = this.data.parts

  let product = parts[keyID].xuanze


  product.forEach((v, i) => i == subID ? v.imgVisible = false : v.imgVisible = false);


  parts[keyID].xuanze=product

  this.setData({
    parts,

  })
},
touchStart1(e){
  const keyID = e.currentTarget.dataset.keyid
  const subID = e.currentTarget.dataset.subid

  

  let parts1 = this.data.parts1

  let product = parts1[keyID].xuanze


  product.forEach((v, i) => i == subID ? v.imgVisible = true : v.imgVisible = false);


  parts1[keyID].xuanze=product

  this.setData({
    parts1,

  })
},
touchChend1(e){
  const keyID = e.currentTarget.dataset.keyid
  const subID = e.currentTarget.dataset.subid

  

  let parts1 = this.data.parts1

  let product = parts1[keyID].xuanze


  product.forEach((v, i) => i == subID ? v.imgVisible = false : v.imgVisible = false);


  parts1[keyID].xuanze=product

  this.setData({
    parts1,

  })
},
jia(){

let num = this.data.num
let standardPriceSum = this.data.standardPriceSum/num
let partsPriceSum = this.data.partsPriceSum/num
let parts1PriceSum = this.data.parts1PriceSum/num

num = num+1
standardPriceSum = standardPriceSum*num
partsPriceSum = partsPriceSum*num
parts1PriceSum = parts1PriceSum*num
this.setData({
num,
standardPriceSum,
partsPriceSum,
parts1PriceSum
})
},
jian(){

let num = this.data.num
if(num<=1){
num=1
return num
}
let standardPriceSum = this.data.standardPriceSum/num
let partsPriceSum = this.data.partsPriceSum/num
let parts1PriceSum = this.data.parts1PriceSum/num
num = num-1
standardPriceSum = standardPriceSum*num
partsPriceSum = partsPriceSum*num
parts1PriceSum = parts1PriceSum*num
this.setData({
  num,
  standardPriceSum,
  partsPriceSum,
  parts1PriceSum
})
},


urlTap(){

  wx.reLaunch({
    url:'../dongkou/dongkou'
  })
  
},
carTap(){

  wx.reLaunch({    

    url:"../car/car"
})
},
dingdanTap (e) {

    let goodsInfo = this.data.goodsInfo
    const scrollImg = this.data.scrollImg
    const shan = this.data.shan
    const xing = this.data.xing
    let partsArr = this.data.partsArr
    let parts1Arr = this.data.parts1Arr
    partsArr = partsArr.concat(parts1Arr)
    goodsInfo.title = xing+shan
    goodsInfo.partsArr = partsArr
    goodsInfo.time = new Date()
    const parts = this.data.parts
    goodsInfo.standardPriceSum = this.data.standardPriceSum
    goodsInfo.partsPriceSumCon = this.data.partsPriceSum+this.data.parts1PriceSum
    goodsInfo.standardParts = this.data.standardPriceSum+this.data.partsPriceSum+this.data.parts1PriceSum
    goodsInfo.square =(this.data.square).toFixed(2)
    goodsInfo.width =this.data.width
    goodsInfo.height =this.data.height
    goodsInfo.num = this.data.num
    goodsInfo.img = scrollImg[0]
    goodsInfo.checked = true
   
    db.collection("car").add({
       data:{
        goodsInfo:this.data.goodsInfo,
   
       }
     }).then(res=>{
    
     })
     wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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