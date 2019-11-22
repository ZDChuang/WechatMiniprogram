//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var userinfo1 = wx.getStorageSync('userinfo1') || {}
    var userinfo2 = wx.getStorageSync('userinfo2') || {}
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("------getSetting--------------")
        
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("authSetting...")
          
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('userinfo1', res.userInfo)
              this.globalData.userInfo = res.userInfo
              console.log("UserInfo ...")
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }

              if (wx.getStorageSync('userinfo1') || wx.getStorageSync('userinfo2')){
                this.userinfo1 = wx.getStorageSync('userinfo1')
                this.userinfo2 = wx.getStorageSync('userinfo2')
                console.log("send---")
              }

              this.loginMini2(this.globalData.address)
            }
          })
        } else{
          this.loginMini2(this.globalData.address)
        }
      }
    })
  },
  loginMini2: function (v) {
    var t = this
    wx.login({
      success: function (res) {
        console.log(res.code)
        //发送请求
        wx.request({
          url: v + '/receive/openid',
          data: {
            code: res.code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            wx.setStorageSync('userinfo2', res.data)
            t.sendUserInfo(t.globalData.address)
          }
        })
      }
    })
  },
  sendUserInfo: function (v) {
    this.userinfo1 = wx.getStorageSync('userinfo1')
    this.userinfo2 = wx.getStorageSync('userinfo2')
    wx.request({
      url: v + '/receive/user',
      data: {
        openId: this.userinfo2.openid,
        unionId: '',
        sessionKey: this.userinfo2.session_key,
        nickName: this.userinfo1.nickName,
        country: this.userinfo1.country,
        city: this.userinfo1.city,
        gender: this.userinfo1.gender,
        telephone: '',
        formId: this.userinfo1.formId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      },
      fail: function (res) {
      }
    })

  },
  globalData: {
    userInfo: null,
    hasInfo: false,
    // address: 'http://localhost:8080',
    address: 'http://192.168.31.165:8080',
    // address: 'https://dech.tech',
  }
})