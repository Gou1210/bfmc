// components/widget/widget.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isPopping: false,
    animPlus: {},
    animCollect: {},
    animTranspond: {},
    animInput: {},
    animCloud:{},
    aninWrite:{},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleContact (e) {
      console.log(e.detail.path)
      console.log(e.detail.query)
    },
    plus: function () {
      if (this.data.isPopping) {
       //缩回动画
       this.popp();
       this.setData({
        isPopping: false
       })
      } else if (!this.data.isPopping) {
       //弹出动画
       this.takeback();
       this.setData({
        isPopping: true
       })
      }
     },
     input: function () {
      wx.navigateTo({
        url: '../liuyan/liuyan'
      })
     },
     transpond: function () {
      console.log("transpond")
     },
     collect: function () {
      console.log("collect")
     },
     cloud:function(){
      wx.makePhoneCall({
        phoneNumber: '13381126571', 
    })
     },
     write: function () {
      console.log("cloud")
     },
     
     
     //弹出动画
     popp: function () {
      //plus顺时针旋转
      var animationPlus = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationcollect = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationTranspond = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationInput = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationCloud = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationWrite = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      animationPlus.rotateZ(360).step();
      animationcollect.translate(40, -100).rotateZ(180).opacity(1).step();
      animationTranspond.translate(30, 0).rotateZ(180).opacity(1).step();
      animationInput.translate(0, 60).rotateZ(180).opacity(1).step();
      animationCloud.translate(-70, -10).rotateZ(180).opacity(1).step();
      animationWrite.translate(70, -60).rotateZ(180).opacity(1).step();
      this.setData({
       animPlus: animationPlus.export(),
       animCollect: animationcollect.export(),
       animTranspond: animationTranspond.export(),
       animInput: animationInput.export(),
       animCloud: animationCloud.export(),
       animWrite: animationWrite.export(),
      })
     },
     //收回动画
     takeback: function () {
      //plus逆时针旋转
      var animationPlus = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationcollect = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationTranspond = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationInput = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationCloud = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      var animationWrite = wx.createAnimation({
       duration: 400,
       timingFunction: 'ease-out'
      })
      animationPlus.rotateZ(0).step();
      animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
      animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
      animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
      animationCloud.translate(0, 0).rotateZ(0).opacity(0).step();
      animationWrite.translate(0, 0).rotateZ(0).opacity(0).step();
      this.setData({
       animPlus: animationPlus.export(),
       animCollect: animationcollect.export(),
       animTranspond: animationTranspond.export(),
       animInput: animationInput.export(),
       animCloud: animationCloud.export(),
       animWrite: animationWrite.export(),
      })
     },
  }
})
