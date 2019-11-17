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
    url: app.globalData.address + '/receive/exercise/days',
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
          text: '锻炼次数/月',
          left: 'center'
        },
        color: ["#008000"],
        legend: {
          data: ['总次数'],
          top: 50,
          left: 60,
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
          data: res.data.months,
          show: true
        },
        yAxis: {
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }, 
          scale: false,
          // show: false
        },
        series: [{
          name: '总次数',
          type: 'line',
          smooth: false,
          data: res.data.counts
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