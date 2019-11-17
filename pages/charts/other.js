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
    url: app.globalData.address + '/receive/economy/other',
    data: {
      openid: this.info.openid,
    },
    method: 'GET',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {

      console.log(res.data)
      var option = {
        title: {
          text: '收入消费折线图',
          left: 'center'
        },
        color: ["#EE82EE", "#0000FF", "#008000", "#000000"],
        legend: {
          data: ['收入', '消费', "理财总收益", "净收入"],
          // top: 20,
          // left: 110,
          backgroundColor: '#FFDEAD',
          z: 100
        },
        grid: {
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          // extraCssText: 'transform: rotate(90deg)'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.data.date,
          show: true, 
          // position: 'top',
          // nameRotate: -90, //坐标轴名字旋转，角度值。
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
          max: 55000,
          scale: true,
          // show: false
          // inverse :'true',
          // axisLabel: {
          //   rotate: 90
          // },
        },
        series: [{
          name: '收入',
          type: 'line',
          smooth: false,
          data: res.data.income
        }, {
          name: '消费',
          type: 'line',
          smooth: false,
          data: res.data.consume
          }, {
            name: '理财总收益',
            type: 'line',
            smooth: false,
            data: res.data.benifit
          }, {
            name: '净收入',
            type: 'line',
            smooth: false,
            data: res.data.net
          }]
      };
      chart.setOption(option);
    }
  })
  return chart;
}
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },
});