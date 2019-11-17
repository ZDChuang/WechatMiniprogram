import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  this.info = wx.getStorageSync('userinfo2')
  wx.request({
    url: app.globalData.address + '/receive/economy/total',
    data: {
      openid: this.info.openid,
    },
    method: 'GET',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {

      console.log(res.data)
      var option = {
        title: {
          text: '总资产折线图',
          left: 'center'
        },
        color: ["#37A2DA", "#008000"],
        legend: {
          data: ['总资产', '总（含公积金）'],
          top: 50,
          left: 110,
          backgroundColor: 'LightPink',
          z: 100
        },
        grid: {
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.data.date,
          show: true,
          axisLabel: {  //坐标轴刻度标签的相关设置。
            rotate: 90 //刻度标签旋转的角度，
          },
        },
        yAxis: {
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }, 
          scale: true,
          // show: false
        },
        series: [{
          name: '总资产',
          type: 'line',
          smooth: false,
          data: res.data.total
        }, {
          name: '总（含公积金）',
          type: 'line',
          smooth: false,
          data: res.data.fundsum
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
    ec: {
      onInit: initChart
    }
  },
});