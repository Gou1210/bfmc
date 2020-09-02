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
    width0:0,
    width1:0,
    width2:0,
    height:0,
    square:0,
    num:1,
    current:0,
    standardPrice:0,
    shanPrice:0,
    partsPrice:0,
    shujuSubID:0,
    shujuKeyID:0,
    keyID:0,
    subID:0,
    parts1:0,
    parts1Price:0,
    parts1PriceSum:0,
    shan:'扇窗',
    xing:'',
    chuang:'',
    partsArr:[],
    parts1Arr:[],
    goodsInfo:{},
    arr:[],
    shanL:[],
    shanU:[],
    imageIndex:0,
    subNum:0,
    jiaoPrice2:0,
    scrollImg:["https://6266-bfxy-hpbml-1302612614.tcb.qcloud.la/%E4%BA%A7%E5%93%81/%E9%97%A8%E7%AA%97%E6%B5%B7%E6%8A%A52.jpg?sign=005c4b92c0a36a448e1412aa15a47d9c&t=1597112626"]
  },
  noShowData:{

 
  },
  getData(){
    db.collection('yangtai').where({_id:"yangtai"}).get().then(res=>{
      const shuju = res.data[0].shuju
      const shanL = res.data[0].shanL
      const shanU = res.data[0].shanU
      const parts = res.data[0].parts
      const parts1 = res.data[0].parts1

      this.setData({
        shuju,
        parts,
        parts1,
        shanL,
        shanU,

      })
    })
  },
  swiperTap(e){
    
    const subID = this.data.subID
    const keyID = this.data.keyID
    const standardPrice= this.data.standardPrice
    const current = e.detail.current
    const num = this.data.num
    const subNum = this.data.subNum

    const jiaoPrice2= this.data.jiaoPrice2
    let shanPrice = this.data.shanPrice
    let shan = this.data.shan
    if(keyID==0){
      shanPrice = this.data.shanL[0].scrollimg[subID][current].price
      shan = this.data.shanL[0].scrollimg[subID][current].title
    }
    if(keyID==1){


      shanPrice = this.data.shanU[0].scrollimg[subID][current].price
      shan = this.data.shanU[0].scrollimg[subID][current].title
    }

    const square = this.data.square
    let standardPriceSum = this.data.standardPriceSum
    standardPriceSum = Math.round((standardPrice+shanPrice)*square*num)+jiaoPrice2
    if((square+0.5)/3.3<(subNum)&&square>0){
      standardPriceSum = standardPriceSum+300
    } 

    this.setData({
    
      shanPrice,
      standardPriceSum,
      shan,
      current,
      
     
    })
  },
  imgTap(e){
    const imgKeyID = e.currentTarget.dataset.keyid
    const imgSubID = e.currentTarget.dataset.subid
    const jiaoPrice = e.currentTarget.dataset.jiaoprice
    const subNum = this.data.subNum
    const num = this.data.num
    let xing = this.data.xing
    let jiaoPrice2= this.data.jiaoPrice2
    let chuang = this.data.chuang
    const shanPrice = this.data.shanPrice
    let shuju = this.data.shuju
    let standardPriceSum = this.data.standardPriceSum
    const square = this.data.square
    let  shanU = this.data.shanU
    let  shanL = this.data.shanL
    let product = shuju[imgKeyID].xuanze
 
    let standardPrice = 0
    
    console.log(e.currentTarget.dataset)
    if(jiaoPrice!=undefined){
      jiaoPrice2 = jiaoPrice
      
    }

    if(imgKeyID==0){
      shanU[0].xuanze.forEach(v=>v.isActive=false)
      shanL[0].xuanze.forEach(v=>v.isActive=false)

      chuang = this.data.shuju[0].xuanze[imgSubID].title

   }else{
     xing = this.data.shuju[1].xuanze[imgSubID].title
   }

   
    product.forEach((v, i) => i === imgSubID ? v.isActive = true : v.isActive = false);
    for(let i = 0; i<shuju.length; i++){
      for(let y =0; y<shuju[i].xuanze.length; y++){
        if(shuju[i].xuanze[y].isActive){
  
          standardPrice+=shuju[i].xuanze[y].price

        }
      }
    }
    

    standardPriceSum = Math.round((standardPrice+shanPrice)*square*num)+jiaoPrice2

    if((square+0.5)/3.3<(subNum)&&square>0){
      standardPriceSum = standardPriceSum+300
    } 
 

    
    shuju[imgKeyID].xuanze=product
    let shujuSubID = this.data.shujuSubID
    if(imgKeyID==0){
     shujuSubID = imgSubID
    }

    this.setData({
      shuju,
      standardPrice,
      standardPriceSum,
      imageIndex:0,
      shujuSubID,
      jiaoPrice2,
      xing,
      chuang,
      shanU,
      shanL
    })
  },
  shanUTap(e){
  
    const subID = e.currentTarget.dataset.subid
    const keyID = e.currentTarget.dataset.keyid
    const subNum = e.currentTarget.dataset.subnum
    const jiaoPrice2= this.data.jiaoPrice2
    let scrollImg = this.data.scrollImg
    const num= this.data.num
    let shanU = this.data.shanU
    
    let standardPriceSum = this.data.standardPriceSum
    const standardPrice = this.data.standardPrice
    const square = this.data.square
    let product = shanU[0].xuanze
    let shanPrice = 0

    const shan = this.data.shanU[0].scrollimg[subID][0].title
  
    product.forEach((v, i) => i === subID ? v.isActive = true : v.isActive = false);
    for(let i = 0; i<shanU.length; i++){
      for(let y =0; y<shanU[i].xuanze.length; y++){
        if(shanU[i].xuanze[y].isActive){
  
          shanPrice+=shanU[i].xuanze[y].price
        }
      }
    }

    standardPriceSum = Math.round((shanPrice+standardPrice)*square)*num+jiaoPrice2
      scrollImg = []
      shanU[0].scrollimg[subID].forEach(v=> 
        scrollImg.push(v.img)
        )


        shanU[0].xuanze=product
        if((square+0.5)/3.3<(subNum)&&square>0){
          standardPriceSum = standardPriceSum+300
        } 

    this.setData({
      shanU,
      shanPrice,
      standardPriceSum,
      scrollImg,
      subID,
      keyID,
      subNum,
      shan,
      imageIndex:0
    })
  },
  shanLTap(e){
    
    const subID = e.currentTarget.dataset.subid
    const keyID = e.currentTarget.dataset.keyid
    const subNum = e.currentTarget.dataset.subnum
    const jiaoPrice2= this.data.jiaoPrice2
    const num= this.data.num
    // let scrollImg = this.data.scrollImg
    // const current = this.data.current
    let shanL = this.data.shanL
    let standardPriceSum = this.data.standardPriceSum
    const standardPrice = this.data.standardPrice
    const square = this.data.square
    let product = shanL[0].xuanze
    let shanPrice = 0

    const shan = this.data.shanL[0].scrollimg[subID][0].title

    product.forEach((v, i) => i === subID ? v.isActive = true : v.isActive = false);
    for(let i = 0; i<shanL.length; i++){
      for(let y =0; y<shanL[i].xuanze.length; y++){
        if(shanL[i].xuanze[y].isActive){
  
          shanPrice+=shanL[i].xuanze[y].price
        }
      }
    }

    standardPriceSum = Math.round((shanPrice+standardPrice)*square)*num+jiaoPrice2
      let scrollImg = []
      shanL[0].scrollimg[subID].forEach(v=> 
        scrollImg.push(v.img)
        )

        shanL[0].xuanze=product
        if((square+0.5)/3.3<(subNum)&&square>0){
          standardPriceSum = standardPriceSum+300
        }  
       
    this.setData({
      shanL,
      shanPrice,
      standardPriceSum,
      scrollImg,
      subID,
      keyID,
      subNum,
      shan,
      imageIndex:0
    })
  },

widthTap(e){
  const width0 = e.detail.value*1
  const width1 = this.data.width1*1
  const width2 = this.data.width2*1
  const width = width0 +width1+width2
  const height = this.data.height
  const subNum = this.data.subNum
  const jiaoPrice2= this.data.jiaoPrice2
  const standardPrice = this.data.standardPrice
  const shanPrice = this.data.shanPrice
  let num = this.data.num
  let square = width*height
  if(square<1.5&&square>0){
    square= 1.5
  }

  let standardPriceSum =Math.round(square*(standardPrice+shanPrice)) *num+jiaoPrice2
  const partsPriceSum =Math.round(square*this.data.partsPrice) *num
  if((square+0.5)/3.3<(subNum)&&square>0){
    standardPriceSum = standardPriceSum+300
  } 
  if(standardPriceSum==null){
    standardPriceSum=0
  }
  this.setData({
    standardPriceSum,
    partsPriceSum,
    width0,
    square
  })
},
widthTap1(e){
  const width1 = e.detail.value*1
  const width0 = this.data.width0*1
  const width2 = this.data.width2*1
  const width = width0 +width1+width2
  const height = this.data.height
  const subNum = this.data.subNum
  const jiaoPrice2= this.data.jiaoPrice2
  const standardPrice = this.data.standardPrice
  const shanPrice = this.data.shanPrice
  const num = this.data.num
  let square = width*height
  if(square<1.5&&square>0){
    square= 1.5
  }
 
  let standardPriceSum =Math.round(square*(standardPrice+shanPrice)) *num+jiaoPrice2
  const partsPriceSum =Math.round(square*this.data.partsPrice) *num
  if((square+0.5)/3.3<(subNum)&&square>0){
    standardPriceSum = standardPriceSum+300
  } 
  if(standardPriceSum==null){
    standardPriceSum=0
  }
  this.setData({
    standardPriceSum,
    partsPriceSum,
    width1,
    square
  })
},
widthTap2(e){
  const width2 = e.detail.value*1
  const width1 = this.data.width1*1
  const width0 = this.data.width0*1
  const width = width0 +width1+width2
  const height = this.data.height
  const subNum = this.data.subNum
  const jiaoPrice2= this.data.jiaoPrice2
  const standardPrice = this.data.standardPrice
  const shanPrice = this.data.shanPrice
  const num = this.data.num
  let square = width*height
  if(square<1.5&&square>0){
    square= 1.5
  }

  let standardPriceSum =Math.round(square*(standardPrice+shanPrice)) *num+jiaoPrice2
  const partsPriceSum =Math.round(square*this.data.partsPrice) *num
  if((square+0.5)/3.3<(subNum)&&square>0){
    standardPriceSum = standardPriceSum+300
  } 
  if(standardPriceSum==null){
    standardPriceSum=0
  }
  this.setData({
    standardPriceSum,
    partsPriceSum,
    width2,
    square
  })
},
heightTap(e){
  let height = e.detail.value
  const width = this.data.width
  const subNum = this.data.subNum
  const jiaoPrice2= this.data.jiaoPrice2
  let standardPrice = this.data.standardPrice
  const shanPrice = this.data.shanPrice
  const num = this.data.num
  let square = width*height
  if(square<1.5&&square>0){
    square= 1.5
  }  

  let standardPriceSum =Math.round(square*(standardPrice+shanPrice)) *num+jiaoPrice2
  const partsPriceSum =Math.round(square*this.data.partsPrice) *num

  if((square+0.5)/3.3<(subNum)&&square>0){
    standardPriceSum = standardPriceSum+300
  } 
  if(standardPriceSum==null){
    standardPriceSum=0
  }
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
    partsArr

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



carTap(){

  wx.reLaunch({    

    url:"../car/car"
})
},
dingdanTap (e) {

    let goodsInfo = this.data.goodsInfo
    const scrollImg = this.data.scrollImg
    const current = this.data.current
    
    const shan = this.data.shan
    const xing = this.data.xing
    const chuang = this.data.chuang
    let partsArr = this.data.partsArr
    let parts1Arr = this.data.parts1Arr
    partsArr = partsArr.concat(parts1Arr)
    goodsInfo.title =chuang+xing+shan
    goodsInfo.partsArr = partsArr
    goodsInfo.time = new Date()
    const parts = this.data.parts
    goodsInfo.standardPriceSum = this.data.standardPriceSum
    goodsInfo.partsPriceSumCon = this.data.partsPriceSum+this.data.parts1PriceSum
    goodsInfo.standardParts = this.data.standardPriceSum+this.data.partsPriceSum+this.data.parts1PriceSum
    goodsInfo.square =(this.data.square).toFixed(2)
    goodsInfo.width1 =this.data.width1
    goodsInfo.width0 =this.data.width0
    goodsInfo.width2 =this.data.width2
    goodsInfo.height =this.data.height
    goodsInfo.num = this.data.num
    goodsInfo.img = scrollImg[current]
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
urlTap(){

  wx.reLaunch({
    url:'../dongkou/dongkou'
  })
  
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