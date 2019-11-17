
Page({
  data: {
    open_id: '',
    session_key: ''
  },
  onLoad2: function () {
    var that = this
    wx.login({
      success: function (data) {
        console.log(data);
        console.log("----123-----")
        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session?appid=wx7d2be53e59324611&secret=5570a01af552b6d9ab80e08686c746d3&js_code=" + data.code +"&grant_type=authorization_code",
          data: {},
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            console.log(res.data.openid)
            // that.setData({
            //   open_id = res.data.openid, //获取到的openid 
            //   session_key = res.data.session_key //获取到session_key 
            // })
            console.log(res.data.openid)
          }
        })
      }
    })
  }
})