const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        name: "留言询问",
        isActive: true
      },
      {
        id: 1,
        name: "意见反馈",
        isActive: false
      }   
    ],
    chooseImgs: [],
    textVal: ""
  },

  handleItemChange(e) {
    // 接收传递过来的参数
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
    // 点击 “+” 选择图片
    handleChooseImg() {
      // 2 调用小程序内置的选择图片api
      wx.chooseImage({
        // 同时选中的图片的数量
        count: 9,
        // 图片的格式  原图  压缩
        sizeType: ['original', 'compressed'],
        // 图片的来源  相册  照相机
        sourceType: ['album', 'camera'],
        success: (result) => {
          console.log(result)
          this.setData({
            // 图片数组 进行拼接 
            chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
          })
        }
      });
  
    },
      // 点击 自定义图片组件
  handleRemoveImg(e) {
    // 2 获取被点击的组件的索引
    const { index } = e.currentTarget.dataset;
    // 3 获取data中的图片数组
    let { chooseImgs } = this.data;
    // 4 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  }, 
      handleFormSubmit(){
        let textVal = this.data.textVal;
        let  chooseImgs = this.data.chooseImgs;
        chooseImgs.forEach((v, i) => {
          wx.cloud.uploadFile({
            cloudPath: "img/" + new Date().getTime() +"-"+i+".png",
            filePath:v, // 文件路径
          }).then(res => {
            // get resource ID
            console.log(res.fileID)
          }).catch(error => {
            // handle error
          })
        })
        db.collection("liuyan").add({
          data:{
          //  res:this.data.res,
          //  title,phone,site
          textVal,
          }
        }).then(res=>{
      
        })
        wx.showToast({
         title: '提交成功',
         icon: 'success',
         // true 防止用户 手抖 疯狂点击按钮 
         mask: true
       });
       textVal = ""
       chooseImgs = []
       this.setData({
        textVal,
        chooseImgs
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