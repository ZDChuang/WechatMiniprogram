//logs.js
const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    logs: [],
    mess:'message'
  },
  onLoad2: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onLoad3: function () {
    var that = this
    wx.request({
      url: app.globalData.address + '/blog2/first',
      data: {
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({ 
          mess: res.statusCode,
          logs: res.data
          })
      },
      fail: function (res) {
        that.setData({
          mess: res.statusCode,
          logs: res.request
        })
        console.log(".....fail.....");
      }
    })
  }
})
