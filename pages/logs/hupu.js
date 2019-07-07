//logs.js

Page({
  data: {
    hupuUrl: []
  },
  onLoad: function (options) {
    // var that = this
    console.log("begin...zdc")
    console.log(options)
    this.setData({
      hupuUrl: 'https://bbs.hupu.com' + options.pp
    });
  }
})
