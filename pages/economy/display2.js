var app = getApp();
var d = new Date();
Page({
  data: {
    date: d.toLocaleDateString(),
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    startYear: d.getFullYear() - 1,
    startMonth: d.getMonth() + 1,
    startDay: d.getDate(),
    endYear: d.getFullYear(),
    endMonth: d.getMonth() + 1,
    endDay: d.getDate(),
    start: "",
    end: "",
    flag: false,
    date2: 0,
    income: 0,
    benifit: 0,
    consume: 0,
    total: 0,
    callist: [],
    category: [{
        name: 'income',
        value: '收入',
        checked: false,
        color: '#CC0066',
      },
      {
        name: 'consume',
        value: '消费',
        checked: false,
        color: '#CC0066',
      },
      {
        name: 'benifit',
        value: '收益',
        checked: false,
        color: '#CC0066',
      },
      {
        name: 'total',
        value: '总额',
        checked: false,
        color: '#CC0066',
      },
    ],
    listData: [{
        "name": "微信零钱",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "理财通",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "支付宝",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "花呗",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "招商银行",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "信用卡",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "基金理财",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "招招理财",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "平安证券",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "现金",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "欠款",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "公积金",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "总金额",
        "money": 0,
        "benifit": 0
      },
      {
        "name": "总金额(含)",
        "money": 0,
        "benifit": 0
      },
    ],
    consume0: 0,
    consumeDate: 0,
    consume1: 0,
    note1: '',
    consume2: 0,
    note2: '',
    consume3: 0,
    note3: '',
    consume4: 0,
    note4: '',
    consume5: 0,
    note5: '',
    consume6: 0,
    note6: '',
    consume7: 0,
    note7: '',
  },

  itemSubmit: function(e) {
    wx.navigateTo({
      url: './display'
    })
  },
  inputReceive: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });

    this.findCurrent()
  },
  bindDateChange: function(e) {
    this.setData({
      year: e.detail.value.substr(0, 4),
      month: e.detail.value.substr(-2) % 13
    })

    this.findCurrent()
  },
  bindDateChange1: function(e) {
    var c1 = 'category[0].checked'
    var c2 = 'category[1].checked'
    var c3 = 'category[2].checked'
    var c4 = 'category[3].checked'
    this.setData({
      startYear: e.detail.value.substr(0, 4),
      startMonth: e.detail.value.substr(5, 2) % 13,
      startDay: e.detail.value.substr(-2) % 32,
      [c1]: false,
      [c2]: false,
      [c3]: false,
      [c4]: false,
      income: 0,
      benifit: 0,
      consume: 0,
      total: 0,
    })

    var v1 = this.data.startDay
    var v = this.data.startMonth
    if (v < 10) {
      v = "0" + v
    }
    if (v1 < 10) {
      v1 = "0" + v1
    }
    this.setData({
      start: this.data.startYear + "" + v + "" + v1,
    })

  },
  bindDateChange2: function(e) {
    var c1 = 'category[0].checked'
    var c2 = 'category[1].checked'
    var c3 = 'category[2].checked'
    var c4 = 'category[3].checked'
    this.setData({
      endYear: e.detail.value.substr(0, 4),
      endMonth: e.detail.value.substr(5, 2) % 13,
      endDay: e.detail.value.substr(-2) % 32,
      [c1]: false,
      [c2]: false,
      [c3]: false,
      [c4]: false,
      income: 0,
      benifit: 0,
      consume: 0,
      total: 0,
    })

    var v1 = this.data.endDay
    var v2 = this.data.endMonth
    if (v1 < 10) {
      v1 = "0" + v1
    }
    if (v2 < 10) {
      v2 = "0" + v2
    }
    this.setData({
      end: this.data.endYear + "" + v2 + "" + v1,
    })

  },

  calculate: function(e) {
    var v = ''

    for (var j = 0; j < this.data.category.length; j++) {
      v = 'category[' + j + "].checked"
      this.setData({
        [v]: false,
        callist: [],
      })
    }
    if (e.detail.value.length < 1) {
      return
    }

    for (var i = 0; i < e.detail.value.length; i++) {
      this.data.callist.push(e.detail.value[i])
      for (var j = 0; j < this.data.category.length; j++) {
        if (e.detail.value[i] == this.data.category[j].name) {
          v = 'category[' + j + "].checked"
          this.setData({
            [v]: true,
          })
        }
      }
    }

    var t = this;
    this.info = wx.getStorageSync('userinfo2')

    this.m1 = this.data.startMonth
    this.m2 = this.data.endMonth
    this.d1 = this.data.startDay
    this.d2 = this.data.endDay
    if (this.data.startMonth < 10) {
      this.m1 = "0" + this.data.startMonth
    }
    if (this.data.endMonth < 10) {
      this.m2 = "0" + this.data.endMonth
    }
    if (this.data.startDay < 10) {
      this.d1 = "0" + this.data.startDay
    }
    if (this.data.endDay < 10) {
      this.d2 = "0" + this.data.endDay
    }

    //待优化，每次实际最多只会查询1次数据库，本程序最多查4次！
    wx.request({
      url: app.globalData.address + '/receive/economy/calculate',
      data: {
        openid: this.info.openid,
        start: this.data.startYear + "" + this.m1 + "" + this.d1,
        end: this.data.endYear + "" + this.m2 + "" + this.d2,
        list: this.data.callist,
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

        if (typeof(res.data.income) != "undefined") {
          t.setData({
            income: res.data.income,
          })
        }
        if (typeof(res.data.consume) != "undefined") {
          t.setData({
            consume: res.data.consume,
          })
        }
        if (typeof(res.data.benifit) != "undefined") {
          t.setData({
            benifit: res.data.benifit,
          })
        }
        if (typeof(res.data.total) != "undefined") {
          t.setData({
            total: res.data.total,
          })
        }
      }
    })
  },

  onLoad: function() {
    var v = this.data.startMonth
    var v2 = this.data.endMonth
    var v3 = this.data.endDay
    var v4 = this.data.endDay
    if (v < 10) {
      v = "0" + v
    }
    if (v2 < 10) {
      v2 = "0" + v2
    }
    if (v3 < 10) {
      v3 = "0" + v3
    }
    if (v4 < 10) {
      v4 = "0" + v4
    }
    this.setData({
      start: this.data.startYear + "" + v + "" + v4,
      end: this.data.endYear + "" + v2 + "" + v3,
    })
    // console.log(this.data.start)

    this.findCurrent()

    this.findConsume()
  },

  findConsume: function() {
    var t = this;
    this.info = wx.getStorageSync('userinfo2')
    this.m = this.data.month
    if (this.data.month < 10) {
      this.m = "0" + this.data.month
    }

    wx.request({
      url: app.globalData.address + '/receive/economy/consumeQuery',
      data: {
        openid: this.info.openid,
        date: this.data.year + "" + this.m,
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
        }
        t.setData({
          consumeDate: res.data.date,
          consume0: res.data.consume,
          consume1: res.data.consume1,
          note1: res.data.note1,
          consume2: res.data.consume2,
          note2: res.data.note2,
          consume3: res.data.consume3,
          note3: res.data.note3,
          consume4: res.data.consume4,
          note4: res.data.note4,
          consume5: res.data.consume5,
          note5: res.data.note5,
          consume6: res.data.consume6,
          note6: res.data.note6,
          consume7: res.data.consume7,
          note7: res.data.note7,
        })
      }
    })
  },

  findConsume2: function() {
    var t = this;
    this.info = wx.getStorageSync('userinfo2')

    wx.request({
      url: app.globalData.address + '/receive/economy/consumeQuery2',
      data: {
        openid: this.info.openid,
        date: this.data.consumeDate,
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
        }
        t.setData({
          consumeDate: res.data.date,
          consume0: res.data.consume,
          consume1: res.data.consume1,
          note1: res.data.note1,
          consume2: res.data.consume2,
          note2: res.data.note2,
          consume3: res.data.consume3,
          note3: res.data.note3,
          consume4: res.data.consume4,
          note4: res.data.note4,
          consume5: res.data.consume5,
          note5: res.data.note5,
          consume6: res.data.consume6,
          note6: res.data.note6,
          consume7: res.data.consume7,
          note7: res.data.note7,
        })
      }
    })
  },

  findCurrent: function() {
    var t = this;
    this.info = wx.getStorageSync('userinfo2')
    this.m = this.data.month
    if (this.data.month < 10) {
      this.m = "0" + this.data.month
    }
    wx.request({
      url: app.globalData.address + '/receive/economy/month',
      data: {
        openid: this.info.openid,
        date: this.data.year + "" + this.m,
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
        if (typeof(res.data.wchange) == "undefined" || res.data == null) {
          t.setData({
            flag: false,
          })
          return;
        }

        var w1 = 'listData[0].money'
        var w2 = 'listData[1].money'
        var w22 = 'listData[1].benifit'

        var a1 = 'listData[2].money'
        var a11 = 'listData[2].benifit'
        var a2 = 'listData[3].money'

        var c1 = 'listData[4].money'
        var c11 = 'listData[4].benifit'
        var c2 = 'listData[5].money'
        var c3 = 'listData[6].money'
        var c33 = 'listData[6].benifit'

        var z1 = 'listData[7].money'
        var z2 = 'listData[8].money'
        var z22 = 'listData[8].benifit'

        var m1 = 'listData[9].money'
        var m2 = 'listData[10].money'
        var m3 = 'listData[11].money'

        var t1 = 'listData[12].money'
        var t11 = 'listData[12].benifit'
        var t2 = 'listData[13].money'
        var t22 = 'listData[13].benifit'

        t.setData({
          flag: true,
          [w1]: res.data.wchange,
          [w2]: res.data.wlicaitong,
          [w22]: res.data.wbenifit,
          [a1]: res.data.alipay,
          [a2]: res.data.ahuabei,
          [c1]: res.data.cmb,
          [c2]: res.data.credit,
          [c3]: res.data.clicai,
          [z1]: res.data.zz,
          [z2]: res.data.pingan,
          [m1]: res.data.money,
          [m2]: res.data.debt,
          [m3]: res.data.fund,
          [a11]: res.data.abenifit,
          [c11]: res.data.cbenifit,
          [c33]: res.data.sbenifit,
          [z22]: res.data.pbenifit,
          [t11]: res.data.benifitsum,
          [t1]: res.data.total,
          [t2]: res.data.fundsum,
          [t22]: res.data.benifitsum,
          date2: res.data.date,
        })
        // wx.navigateTo({
        //   url: 'display2?data=' + JSON.stringify(res.data),
        // })
      }
    })
  },

  percent: function() {
    wx.setStorageSync('consumeDate', this.data.consumeDate)
    wx.navigateTo({
      url: '../charts/pie',
      // url: '../charts/pie?data=' + JSON.stringify(this.data.consumeDate),
    })
  },

  save: function() {
    var t = this;
    this.info = wx.getStorageSync('userinfo2')

    wx.request({
      url: app.globalData.address + '/receive/economy/consumeSave',
      data: {
        openid: this.info.openid,
        date: this.data.consumeDate,
        consume: this.data.consume0,
        consume1: this.data.consume1,
        note1: this.data.note1,
        consume2: this.data.consume2,
        note2: this.data.note2,
        consume3: this.data.consume3,
        note3: this.data.note3,
        consume4: this.data.consume4,
        note4: this.data.note4,
        consume5: this.data.consume5,
        note5: this.data.note5,
        consume6: this.data.consume6,
        note6: this.data.note6,
        consume7: this.data.consume7,
        note7: this.data.note7,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.status == 400) {
          wx.showToast({
            title: '输入有误😥',
            icon: 'none',
          })
        } else if (res.data == 0) {
          wx.showToast({
            title: 'Success 😀',
            icon: 'success',
            duration: 2000
          })
          t.findConsume()

        } else if (res.data == -2) {
          wx.showToast({
            title: '请输入消费项',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == -1) {
          wx.showToast({
            title: '系统异常',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == -3) {
          wx.showToast({
            title: '日期有误',
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

      }
    })
  },
})