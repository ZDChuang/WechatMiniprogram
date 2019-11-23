//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: ' ，欢迎你',
    userInfo: {},
    display: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  exercise: function(e) {
    this.getFormId(e)
    wx.navigateTo({
      url: '../exercise/record',
    })
  },
  economy: function (e) {
    this.getFormId(e)
    wx.navigateTo({
      url: '../economy/record',
    })
  },
  todo: function (e) {
    this.getFormId(e)
    wx.navigateTo({
      url: '../todo/record',
    })
  },
  note: function (e) {
    this.getFormId(e)
    wx.navigateTo({
      url: '../note/record',
    })
  },
  push: function (e) {
    this.getFormId(e)
    wx.navigateTo({
      url: '../push/record',
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      wx.setStorageSync('userinfo1', app.globalData.userInfo)
      console.log("userinfo------iiiiii")
      // wx.minitest({
      //   success: res => {
      //     console.log("--------here---------")
      //     this.setData({
      //       girlInfo: res.data
      //     })
      //   }
      // })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("--------here2---------")
      console.log(app.data)
      app.userInfoReadyCallback = res => {
        console.log("--------callback---------")
        this.setData({
          userInfo: res.userInfo,
          display: res.userInfo.nickName + '，欢迎你',
          hasUserInfo: true
        })

      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log("--------here3---------")
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            display: res.userInfo.nickName + '，欢迎你',
            hasUserInfo: true
          })
          console.log(app.data)
        }
      })
    }
  },
  getUserInfo: function(e) {
    // console.log(e)
    console.log("getUserInfo...")
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.hasInfo = true
    if(e.detail.userInfo == null){
      return;
    }
    this.setData({
      userInfo: e.detail.userInfo,
      display: e.detail.userInfo.nickName + '，欢迎你',
      hasUserInfo: true,
    })
    wx.setStorageSync('userinfo1', e.detail.userInfo)
    if (wx.getStorageSync('userinfo2')) {
      app.sendUserInfo(app.globalData.address)
    }
  },
  getFormId: function(e) {
    this.info = wx.getStorageSync('userinfo2')
    wx.request({
      url: app.globalData.address + '/receive/formid',
      data: {
        openId: this.info.openid,
        formId: e.detail.formId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {},
      fail: function(res) {}
    })
  }
})