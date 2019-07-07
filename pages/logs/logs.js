//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad2: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onLoad: function () {
    var that = this
    // console.log("begin...")
    wx.request({
      url: 'http://dech.tech/blog2/first',
      data: {
        user: '001',
        pwd: 'abc'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        console.log('----log---onLoad---')
        that.setData({ logs: res.data})
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  }
})
