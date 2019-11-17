const util = require('../../utils/util.js')
var app = getApp();
Page({
  onLoad: function() {
    var t = this
    this.info = wx.getStorageSync('userinfo2')
    wx.request({
      url: app.globalData.address + '/send/rule',
      data: {
        openid: this.info.openid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data[0][0])
      },
      fail: function(res) {}
    })
  },
  data: {
    type2: '',
    period2: '',
    status: 'A',
    days: '',
    type: [{
        name: 'drink',
        value: '喝水',
        checked: false
      },
      {
        name: 'run',
        value: '运动',
        checked: false
      },
      {
        name: 'sleep',
        value: '睡觉',
        checked: false
      },
      {
        name: 'read',
        value: '阅读',
        checked: false
      },
      {
        name: 'other',
        value: '其它',
        checked: false
      },
    ],
    period: [{
        name: 'week',
        value: '每周',
        checked: false
      },
      {
        name: 'day',
        value: '每天',
        checked: false
      },
    ],
    dayPeriod: [{
        name: 'fix',
        value: '固定时间',
        checked: false,
      },
      {
        name: 'every',
        value: '每隔一定时间',
        checked: false
      },
    ],
    weekPeriod: [{
        name: 'Monday',
        value: '周一',
        checked: false
      },
      {
        name: 'Tuesday',
        value: '周二',
        checked: false
      },
      {
        name: 'Wednesday',
        value: '周三',
        checked: false
      },
      {
        name: 'Thursday',
        value: '周四',
        checked: false
      },
      {
        name: 'Friday',
        value: '周五',
        checked: false
      },
      {
        name: 'Saturday',
        value: '周六',
        checked: false
      },
      {
        name: 'Sunday',
        value: '周日',
        checked: false
      },
    ],
    timeChecked: false,
    fixTime: '00:00',
    every: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    everyHours: 0,
    input: ''
  },

  bindDateChange: function(e) {
    this.setData({
      fixTime: e.detail.value
    })
  },

  bindinput: function(e) {
    this.setData({
      input: e.detail.value
    })
  },

  bindHourChange: function(e) {
    this.setData({
      // 字符串转数字
      everyHours: parseInt(e.detail.value) + 1
    })
  },


  pushType: function(e) {
    this.setData({
      type2: e.detail.value
    })
  },

  pushPeriod: function(e) {
    this.setData({
      period2: e.detail.value,
      fixTime: '24:00',
      everyHours: 0,
      days: '',
    })

    var ww = ''
    for (var i = 0; i < this.data.weekPeriod.length; i++) {
      ww = 'weekPeriod[' + i + '].checked'
      this.setData({
        [ww]: false,
      })
    }

    var w = 'period[0].checked'
    var d = 'period[1].checked'
    var t1 = 'dayPeriod[0].checked'
    var t2 = 'dayPeriod[1].checked'
    if (e.detail.value == 'week') {
      this.setData({
        [w]: true,
        [d]: false,
        [t1]: false,
        [t2]: false,
        timeChecked: false,
      })
    } else if (e.detail.value == 'day') {
      w = 'period[0].checked'
      d = 'period[1].checked'
      this.setData({
        [d]: true,
        [w]: false,
        [t1]: false,
        [t2]: false,
        timeChecked: true,
      })
    } else {
      this.setData({
        [d]: false,
        [w]: false,
        [t1]: false,
        [t2]: false,
        timeChecked: false,
      })
    }
  },


  weekPush: function(e) {
    var w = ''
    var flag = false
    for (var i = 0; i < this.data.weekPeriod.length; i++) {
      w = 'weekPeriod[' + i + '].checked'
      this.setData({
        [w]: false,
        timeChecked: false,
      })
    }
    for (var i = 0; i < this.data.weekPeriod.length; i++) {

      for (var j = 0; j < e.detail.value.length; j++) {
        if (this.data.weekPeriod[i].name == e.detail.value[j]) {
          w = 'weekPeriod[' + i + '].checked'
          flag = true
          this.setData({
            [w]: true,
            timeChecked: true,
          })
        }
      }
    }
    if (flag) {
      this.setData({
        timeChecked: true,
      })
    }

    this.setData({
      days: e.detail.value.join("-")
    })

  },

  dayPush: function(e) {
    var v = 'dayPeriod[0].checked'
    var v1 = 'dayPeriod[1].checked'
    if (e.detail.value == 'fix') {
      this.setData({
        [v]: true,
        [v1]: false,
      })
    } else if (e.detail.value == 'every') {
      this.setData({
        [v]: false,
        [v1]: true,
      })
    } else {
      this.setData({
        [v]: false,
        [v1]: false,
      })
    }
  },


  pushStatus: function(e) {
    if (e.detail.value == true) {
      this.setData({
        status: "A",
      })
    } else {
      this.setData({
        status: "C",
      })
    }
  },
  itemSubmit: function(e) {
    this.info = wx.getStorageSync('userinfo2')

    wx.request({
      url: app.globalData.address + '/receive/rule',
      data: {
        openid: this.info.openid,
        type: this.data.type2,
        info: this.data.input,
        period: this.data.period2,
        periodweek: this.data.days,
        fixtime: this.data.fixTime,
        hours: this.data.everyHours,
        status: this.data.status,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data == 0) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == 1) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == -2) {
          wx.showToast({
            title: '信息不完整',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
})