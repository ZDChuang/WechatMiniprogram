const util = require('../../utils/util.js')
var app = getApp();
Page({
  onLoad: function() {},
  data: {
    body: 'arm',
    minutes: 60,
    addr: 'home',
    weight: 66,
    nowTime: util.formatTime(new Date()),
    items: [{
        name: 'chest',
        value: '胸肌'
      },
      {
        name: 'arm',
        value: '二三头肌',
        checked: true
      },
      {
        name: 'belly',
        value: '腹肌'
      },
      {
        name: 'back',
        value: '背'
      },
      {
        name: 'leg',
        value: '腿'
      },
      {
        name: 'run',
        value: '跑步'
      },
      {
        name: 'football',
        value: '足球'
      },
      {
        name: 'other',
        value: '其它'
      },
    ],
    addresses: [{
        name: 'home',
        value: '家',
        checked: true
      },
      {
        name: 'gym',
        value: '健身房',
      },
      {
        name: 'park',
        value: '公园'
      },
      {
        name: 'other',
        value: '其它'
      }
    ]
  },
  exerciseBody: function(e) {
    this.setData({
      body: e.detail.value,
    })
  },
  exerciseTime: function(e) {
    this.setData({
      minutes: e.detail.value,
    })
  },
  exerciseType: function(e) {
    this.setData({
      addr: e.detail.value,
    })
  },
  exerciseWeight: function(e) {
    this.setData({
      weight: e.detail.value,
    })
  },
  findall: function(e) {
    console.log(e.detail)
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
    if (e == true || e.detail.value == true) {
      
      wx.request({
        url: app.globalData.address + '/receive/findall',
        data: {
          openid: this.info.openid
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          if (res.statusCode == 502) {
            wx.showToast({
              title: 'CONNECTION ERROR 😟',
              icon: 'none',
              duration: 2000
            })
            return
          }
          wx.navigateTo({
            url: 'display?data=' + JSON.stringify(res.data),
          })
        }
      })
    }
  },
  itemSubmit: function(e) {
    var t = this
    this.info = wx.getStorageSync('userinfo2')
    wx.request({
        url: app.globalData.address + '/receive/exercise',
        data: {
          openid: this.info.openid,
          type: this.data.addr,
          time: this.data.minutes,
          weight: this.data.weight,
          body: this.data.body,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '打卡成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '今日已打卡，每天只可打卡一次哦^_^',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function() {
              t.findall(true)
            }, 2000)
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