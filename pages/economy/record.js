const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    wchange: 0,
    wlicai: 0,
    alipay: 0,
    ahuabei: 0,
    cmb: 0,
    ccrd: 0,
    cjijin: 0,
    zz: 0,
    zpingan: 0,
    money: 0,
    mqian: 0,
    fund: 0,
    wbenifit: 0,
    abenifit: 0,
    cbenifit: 0,
    sbenifit: 0,
    pbenifit: 0,
    income: '',
    recentDate: 0,
    checked1: false,
    checked2: false,
  },
  onLoad: function() {
    var t = this
    this.info = wx.getStorageSync('userinfo2')
    wx.request({
      url: app.globalData.address + '/receive/economy/recentDate',
      data: {
        openid: this.info.openid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.status == 502) {
          wx.showToast({
            title: 'CONNECTION ERROR😥',
            icon: 'none',
          })
          return
        }
        t.setData({
          recentDate: res.data
        })
      }
    })
  },
  inputReceive: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });
  },
  itemSubmit2: function(e) {
    wx.navigateTo({
      url: './display2'
    })
  },
  getTotal: function(e) {
    if (e == true || e.detail.value == true) {
      wx.navigateTo({
        url: '../charts/total',
      })
      this.setData({
        checked1: false,
      })
    }
  },
  getOther: function(e) {
    if (e == true || e.detail.value == true) {
      wx.navigateTo({
        url: '../charts/other',
      })
      this.setData({
        checked2: false,
      })
    }
  },
  itemSubmit: function(e) {
    this.info = wx.getStorageSync('userinfo2')
    wx.request({
      url: app.globalData.address + '/receive/economy',
      data: {
        openid: this.info.openid,
        wchange: this.data.wchange,
        wlicaitong: this.data.wlicai,
        alipay: this.data.alipay,
        ahuabei: this.data.ahuabei,
        cmb: this.data.cmb,
        credit: this.data.ccrd,
        clicai: this.data.cjijin,
        zz: this.data.zz,
        pingan: this.data.zpingan,
        money: this.data.money,
        debt: this.data.mqian,
        fund: this.data.fund,
        wbenifit: this.data.wbenifit,
        abenifit: this.data.abenifit,
        cbenifit: this.data.cbenifit,
        sbenifit: this.data.sbenifit,
        pbenifit: this.data.pbenifit,
        income: this.data.income,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.status == 400) {
          wx.showToast({
            title: '输入有误（仅支持数字、小数点和加减号）😥',
            icon: 'none',
          })
        } else if (res.data == 0) {
          wx.showToast({
            title: '登记成功',
            icon: 'success',
            duration: 2000
          })
        } else if (res.data == -2) {
          wx.showToast({
            title: '【收入】输入有误',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '今日已登记^_^',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res) {}
    })
  }
})