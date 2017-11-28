//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    userType: 1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toNotice: function () {
    wx.navigateTo({
      url: '../notice/notice'
    })
  },
  toCheck: function () {
    wx.navigateTo({
      url: '../check/check'
    })
  },
  toStudy: function () {
    wx.navigateTo({
      url: '../study/study'
    })
  },
  toFeedBack: function () {
    wx.navigateTo({
      url: '../feedBack/feedBack'
    })
  },
  toPersonalCenter: function () {
    wx.navigateTo({
      url: '../personalCenter/personalCenter'
    })
  },
  onLoad: function () {
    let _this = this
    if (app.globalData.userInfo) {
      _this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
    _this.userType = app.globalData.userType
    console.log(app.globalData.userInfo)
  },
  getUserInfo: function () {
    const _this = this
    let data = { tempUserId: _this.globalData.userId, sessionToken: _this.globalData.sessionToken }
    app.ajax(app.globalData.api.getUserInfo, function (result) {
      if (result.status === 'true' || result.status === true) {
        app.globalData.userInfo = result.data
        _this.setData({
          userInfo: result.data
        })
      } else {
        console.log(2)
        wx.navigateTo({
          url: '../login/login'
        })
      }
    }, data, 'post')
  },
  chooseUserType: function (event) {
    let t = event.target.dataset.type
    app.globalData.userType = t
    this.setData({
      userType: t
    })
  }
})
