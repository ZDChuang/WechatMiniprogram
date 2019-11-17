//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  getTotal: function () {
    wx.navigateTo({
      url: '../charts/total',
    })
  },
  exercise: function (e) {
    this.getFormId(e)
    wx.navigateTo({
      url: '../exercise/record',
    })
  },
 
  onLoad: function () {
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
            hasUserInfo: true
          })
          console.log(app.data)
        }
      })
    }
  },
  getUserInfo: function (e) {
    // console.log(e)
    console.log("getUserInfo...")
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.hasInfo = true
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
    wx.setStorageSync('userinfo1', e.detail.userInfo)
    if (wx.getStorageSync('userinfo2')) {
      app.sendUserInfo(app.globalData.address)
    }
  },
  getFormId: function (e) {
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
      success: function (res) { },
      fail: function (res) { }
    })
  }
})