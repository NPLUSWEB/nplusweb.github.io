const app = getApp()
Page({
  data: {
    identity: null,
    password: null
  },
  onLoad: function () {
    const _this = this
    _this.setData({
      identity: wx.getStorageSync('identity')
    })
  },
  bindPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindIdentity: function (e) {
    this.setData({
      identity: e.detail.value
    })
  },
  login() {
    var _this = this
    if (!app.isEmpty(_this.data.identity) && !app.isEmpty(_this.data.password)) {
      let data = { identity: _this.data.identity, password: _this.data.password }
      app.ajax(app.globalData.api.login, function (result) {
        if (result.status === 'true' || result.status === true) {
          app.globalData.userInfo = result.data
          app.globalData.userId = result.data.id
          app.globalData.sessionToken = result.data.sessionToken
          wx.setStorageSync('userId', result.data.id)
          wx.setStorageSync('identity', _this.data.identity)
          wx.setStorageSync('sessionToken', result.data.token)
          wx.setStorageSync('accessState', result.data.accessState)
          wx.navigateTo({
            url: '../index/index'
          })
        } else {
          wx.navigateTo({
            url: '../login/login'
          })
        }
      }, data, 'post')
    } else {
      wx.showToast({
        title: '账号密码错误',
        icon: 'success',
        image: '../../img/fail.png',
        duration: 3000
      })
    }
  }
})
