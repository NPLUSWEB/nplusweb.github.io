//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    text: '',
    str: '多少v,,,煎熬ewe了肯dd***err德基123多rrr久啊ewwedsjkyyy的花洒惊恐地6889999000fsd大---的手机卡jjj',
    breakNum: [],
    h: 1
  },
  onLoad: function () {
    this.aa(1)
  },
  aa (len) {
    var _this = this
    var t = _this.data.str.substring(0, len)
    _this.setData({
      text: t
    }, function () {
      wx.createSelectorQuery().select('#the-id').boundingClientRect(function (rect) {
        let w = rect.width
        console.log(w)
        if (w > _this.data.h*150) {
          _this.data.h++
          _this.data.breakNum.push(len)
        }
        if (len < _this.data.str.length) {
          _this.aa(len + 1)
        }else{
          console.log(_this.data.breakNum)
          _this.draw()
        }
      }).exec()
    })
  },
  draw() {
    var _this = this;
    let arr = []
    var n = _this.data.breakNum
    for (let i = 0; i < n.length; i++) {
      if(i == 0){
        arr.push(_this.data.str.substring(0, n[i]))
      }else{
        arr.push(_this.data.str.substring(n[i-1], n[i]))
      }
    }
    arr.push(_this.data.str.substring(n[n.length-1]))
    console.log(arr)
    var ctx = wx.createCanvasContext('firstCanvas');
    var startleft = 10;
    var starttop = 50;
    var lineheight = 30;

    ctx.setFontSize(16)
    for (var j = 0; j < arr.length; j++) {
      var t = arr[j];
      console.log(t)
      ctx.fillText(t, startleft, j * lineheight + starttop);
    }
    ctx.draw()
  }
})
