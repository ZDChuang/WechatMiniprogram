import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  
  // this.info = wx.getStorageSync('userinfo2')
  // console.log(wx.getStorageSync('consumeDate'))
  wx.request({
    url: app.globalData.address + '/receive/economy/percent',
    data: {
      openid: wx.getStorageSync('userinfo2').openid,
      date: wx.getStorageSync('consumeDate')
    },
    method: 'GET',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {

      var option = {
        backgroundColor: "#ffffff",
        color: ["#EEA9B8", "#BFEFFF", "#9BCD9B", "#C1CDCD"],
        series: [{
          label: {
            normal: {
              fontSize: 14,
              formatter: '{b}\n{d}%',
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['25%', '60%'],
          data: [{
            value: res.data.current,
            name: '现金'
          }, {
              value: res.data.fund,
            name: '基金'
          }, {
              value: res.data.hfund,
            name: '货基'
          }, {
              value: res.data.stock,
            name: '理财'
          },  ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 2, 2, 0.3)',
            },   
          }
        }]
      };

      chart.setOption(option);
    }
  })
  return chart;
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    date: 0,
    ec: {}
  },

  // onLoad(options) {
  //   var json = JSON.parse(options.data)
  //   // console.log(json)
  //   this.setData({
  //     date: json,
  //   })
  // },

  echartInit(e) {
    initChart(e.detail.canvas, e.detail.width, e.detail.height);
  }
});