var app = getApp();
const date = new Date();
const years = []
const months = []
const days = []

const years2 = []
const months2 = []
const days2 = []

for (let i = 2018; i <= date.getFullYear(); i++) {
  years.push(i)
  years2.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
  months2.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
  days2.push(i)
}
Page({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 1,
    days: days,
    day: 1,
    value: [0, 0, 0],

    years2: years,
    year2: date.getFullYear(),
    months2: months,
    month2: 1,
    days2: days,
    day2: 1,
    value2: [9999, 0, 0],

    income: 0,
    flag1: false,
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  bindChange2: function(e) {
    const val = e.detail.value
    this.setData({
      year2: this.data.years2[val[0]],
      month2: this.data.months2[val[1]],
      day2: this.data.days2[val[2]]
    })
  },

  itemSubmit1: function(e) {
    var t = this;
    this.info = wx.getStorageSync('userinfo2')

    this.m1 = this.data.month
    this.m2 = this.data.month2
    this.d1 = this.data.day
    this.d2 = this.data.day2
    if (this.data.month < 10) {
      this.m1 = "0" + this.data.month
    }
    if (this.data.month2 < 10) {
      this.m2 = "0" + this.data.month2
    }
    if (this.data.day < 10) {
      this.d1 = "0" + this.data.day
    }
    if (this.data.day2 < 10) {
      this.d2 = "0" + this.data.day2
    }
    wx.request({
      url: app.globalData.address + '/receive/economy/' + "",
      data: {
        openid: this.info.openid,
        start: this.data.year + "" + this.m1 + "" + this.d1,
        end: this.data.year2 + "" + this.m2 + "" + this.d2,
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
        t.setData({
          flag1:true,
          income: res.data
        })
      }
    })
  }
})