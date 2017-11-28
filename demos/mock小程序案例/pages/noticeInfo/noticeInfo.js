const app = getApp()

Page({
  data: {
    noticesInfo: [],
    noticeId: null
  },
  onLoad: function (options) {
    this.setData({
      noticeId: options.id
    })
    this.getNoticeMessage()
  },
  getNoticeMessage: function () {
    var _this = this
    let data = { noticeId: _this.noticeId, userId: app.globalData.userId, sessionToken: app.globalData.sessionToken }
    app.ajax(app.globalData.api.getNoticeMessage, function (result) {
      if (result.status === 'true' || result.status === true) {
        _this.setData({
          noticesInfo: result.data
        })
      } else {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    }, data, 'post')
  }
})
