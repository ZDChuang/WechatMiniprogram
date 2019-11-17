Page({
  data: {
    days: 0,
    hours: 0,
    arm: 0,
    leg: 0,
    back: 0,
    belly: 0,
    chest: 0,
    gym: 0,
    park: 0,
    home: 0,
  },
  onLoad: function(options) {
    var json = JSON.parse(options.data)
    this.setData({
      days: json.days,
      hours: json.hours,
      arm: json.arm,
      leg: json.leg,
      back: json.back,
      belly: json.belly,
      chest: json.chest,
      gym: json.gym,
      park: json.park,
      home: json.home,
    })
  },
})