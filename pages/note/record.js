const util = require('../../utils/util.js')
var app = getApp();
Page({
  onLoad: function() {

  },
  data: {
    all: {},
    category: [{
        name: 'all',
        value: '所有',
        checked: false,
        color: '#CC0066',
      },
      {
        name: 'recent',
        value: '最近五条',
        checked: false,
        color: '#CC0066',
      },
      {
        name: 'add',
        value: '新增备注',
        checked: false,
        color: '#32CD32',
      },
    ],
  },
  query: function (e) {
    var v = ''
    for (var j = 0; j < this.data.category.length; j++) {
      if (e.detail.value == this.data.category[j].name) {
        v = 'category[' + j + "].checked"
        this.setData({
          [v]: true,
        })
      } else {
        v = 'category[' + j + "].checked"
        this.setData({
          [v]: false,
        })
      }
    }

    if (e.detail.value == 'all') {
      this.findall()
    } else if (e.detail.value == 'recent'){
      this.first()
    } else if (e.detail.value == 'add') {
      wx.navigateTo({
        url: './add'
      })
    }
  },

  findall: function() {
    var t = this
    
    this.info = wx.getStorageSync('userinfo2')
    wx.request({
      url: app.globalData.address + '/receive/note/findall',
      data: {
        openid: t.info.openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        // console.log(res.data)
        t.setData({
          all: res.data,
        })
      }
    })
  },

  first: function () {
    var t = this
    
    this.info = wx.getStorageSync('userinfo2')
    wx.request({
      url: app.globalData.address + '/receive/note/findfirst5',
      data: {
        openid: t.info.openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        t.setData({
          all: res.data,
        })
      }
    })
  },
})