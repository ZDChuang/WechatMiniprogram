//logs.js

Page({
  data: {
    hupuUrl: []
  },
  onLoad: function (options) {
    this.setData({
      hupuUrl: 'https://m.hupu.com/bbs' + options.pp
    });
  }
})
