const app = getApp()

Page({
  data: {
    notices: []
  },
  onLoad: function () {
    this.getNotices()
  },
  getNotices: function () {
    var _this = this
    let data = { offset: 1, pageSize: 5, tempUserId: app.globalData.userId, sessionToken: app.globalData.sessionToken }
    app.ajax(app.globalData.api.getNotices, function (result) {
      console.log(result)
      if (result.status === 'true' || result.status === true) {
        _this.setData({
          notices: result.data.rows
        })
      } else {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    }, data, 'post')
  },
  toInfoPage: function (event) {
    let id = event.target.dataset.noticeId;
    console.log(id)
    wx.navigateTo({
      url: '../noticeInfo/noticeInfo?id=' + id
    })
  }
})
