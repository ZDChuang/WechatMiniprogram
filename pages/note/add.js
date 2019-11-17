const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    focus: false,
    openid: '',
    text: '',
  },
  input: function(e) {
    this.setData({
      text: e.detail.value
    })
  },

  itemSubmit: function(e) {
    this.info = wx.getStorageSync('userinfo2')
    wx.request({
        url: app.globalData.address + '/receive/note/add',
        data: {
          openId: this.info.openid,
          content: this.data.text
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          if (res.data == 0) {
            wx.showToast({
              title: '记录成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: './record'
            })

          } else if (res.data == -2) {
            wx.showToast({
              title: '内容不能为空',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '系统异常',
              icon: 'none',
              duration: 2000
            })
          }
        }
      }),
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
  },
})