const app = getApp()
Page({
  data: {
    days: 0,
    hours: 0,
    arm: 0,
    leg: 0,
    back: 0,
    belly: 0,
    chest: 0,
    gym: 0,
    park: 0,
    home: 0,
  },
  push: function(e) {
    this.getFormId(e)
    wx.navigateTo({
      url: '../charts/exercise',
    })
  },
  getFormId: function(e) {
    if (e.detail.formId != null && typeof(e.detail.formId) != "undefined") {
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
  },
  onLoad: function(options) {
    var json = JSON.parse(options.data)
    this.setData({
      days: json.days,
      hours: json.hours,
      arm: json.arm,
      leg: json.leg,
      back: json.back,
      belly: json.belly,
      chest: json.chest,
      gym: json.gym,
      park: json.park,
      home: json.home,
    })
  },
})