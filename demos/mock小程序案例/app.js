//app.js
const Mock = require('utils/mock.js')
let API_HOST = 'http://oppo8.nplusgroup.net'
let DEBUG = true
App({
  onLaunch: function () {
    const _this = this
    wx.setStorageSync('identity', '123')
    _this.globalData.userId = wx.getStorageSync('userId')
    _this.globalData.sessionToken = wx.getStorageSync('sessionToken')
    if (_this.isEmpty(_this.globalData.userId) || _this.isEmpty(_this.globalData.sessionToken)) {
      wx.navigateTo({
        url: 'pages/login/login'
      })
    } else {
      _this.getUserInfo();
    }
  },
  isEmpty (value) {
    if (typeof (value) === 'undefined' || value === null || value === '') {
      return true
    } else {
      return false
    }
  },
  getUserInfo: function () {
    const _this = this
    let data = { tempUserId: _this.globalData.userId, sessionToken: _this.globalData.sessionToken }
    _this.ajax(_this.globalData.api.getUserInfo, function (result){
      if (result.status === 'true' || result.status === true) {
        _this.globalData.userInfo = result.data
      } else {
        wx.navigateTo({
          url: 'pages/login/login'
        })
      }
    }, data, 'post')
  },
  globalData: {
    sessionToken: null,
    userId: null,
    userInfo: null,
    userType: 1,
    accessState: null,
    api: {
      login: API_HOST + '/phone/tempLogin/login.json',
      getUserInfo: API_HOST + '/phone/tempUser/getUserInfo.json',
      getNotices: API_HOST + '/phone/tempUser/getNotices.json',
      getNoticeMessage: API_HOST + '/phone/tempUser/getNoticeMessage.json'
    }
  },
  ajax: function (url, fn, data = {}, method = "get", header = {}) {
    var _this = this
    if (!DEBUG) {
      wx.request({
        url: url,
        method: method ? method : 'get',
        data: data,
        header: header ? header : { "Content-Type": "application/json" },
        success: function (res) {
          fn(res);
        }
      });
    } else {
      let res = ''
      if (url == _this.globalData.api.login) {
        res = Mock.mock({
          "status": true,
          "msg": "登录成功",
          "data":
          {
            "id": 49012,
            "userName": "刘舒丹",
            "password": "6419D97E57DA38DE61B37CE38CF66DE9",
            "headImage": "http://opponplusgroup.oss-cn-hangzhou.aliyuncs.com/oppotemp/images/defaultHeadImage.jpeg",
            "phone": "18907276913",
            "birthDay": "2017-05-13",
            "sex": 2,
            "age": 1,
            "identity": "420621199905130648",
            "college": "",
            "diploma": "",
            "grade": "",
            "major": "",
            "bank": "",
            "bankNo": "",
            "deleteState": 1,
            "starLevel": 0,
            "tempStarLevel": null,
            "accessState": 2,
            "workDays": 0,
            "salePhones": 0,
            "bigArea": null,
            "agent": null,
            "district": null,
            "paperType": null,
            "productBase": null,
            "productJunior": null,
            "productMiddle": null,
            "productSenior": null,
            "productAccessState": null,
            "postBase": null,
            "postJunior": null,
            "postMiddle": null,
            "postSenior": null,
            "postAccessState": null,
            "parentId": 3550,
            "regionId": 3062,
            "regionName": "襄阳市区",
            "token": "490121500033059018",
            "expireTime": "2017-07-14 20:50:59",
            "createTime": "2017-07-14 10:23:12",
            "updateTime": "2017-07-14 10:30:30"
          }
        })
      } else if (url == _this.globalData.api.getUserInfo) {
        res = Mock.mock({
          "status": true,
          "msg": "获取当前用户信息",
          "data":
          {
            "id|1-100": 1,
            "userName": Mock.Random.cname(),
            "password": "E10ADC3949BA59ABBE56E057F20F883E",
            "headImage": 'http://opponplusgroup.oss-cn-hangzhou.aliyuncs.com/oppotemp/images/defaultHeadImage.jpeg',
            "phone": "15152238958",
            "birthDay": "2011-11-11",
            "sex|1-2": 1,
            "age|1-99": 29,
            "identity": "5a",
            "college": "安道尔学院",
            "diploma": "本科",
            "grade": "大三",
            "major": "软件专业",
            "bank": "江苏银行",
            "bankNo": "32228877181928822222",
            "deleteState": 1,
            "starLevel|0-5": 1,
            "tempStarLevel": null,
            "accessState|1-2": 1,
            "workDays|1-100": 6,
            "salePhones|1-100": 60,
            "bigArea": Mock.Random.region(),
            "agent": Mock.Random.province(),
            "district": Mock.Random.city(),
            "paperType": null,
            "productBase": "88",
            "productJunior": null,
            "productMiddle": null,
            "productSenior": "81",
            "productAccessState": 1,
            "postBase": "90",
            "postJunior": null,
            "postMiddle": null,
            "postSenior": null,
            "postAccessState": 1,
            "parentId": 37,
            "createTime": "2017-03-21 16:18:38",
            "updateTime": "2017-03-26 18:07:08"
          }
        })
      } else if (url == _this.globalData.api.getNotices) {
        res = Mock.mock({
          "status": true,
          "msg": "获取公告",
          "data":
          {
            "offset": 0,
            "pageSize": 5,
            "realSize": 3,
            "total": 3,
            "rows|1-5":
            [
              [
                1,
                Mock.Random.ctitle(),
                Mock.Random.cparagraph(),
                "http://opponplusgroup.oss-cn-hangzhou.aliyuncs.com/oppotemp/images/upload/1489425497599_bHxodikz.jpg",
                Mock.Random.datetime()
              ],
              [
                2,
                Mock.Random.ctitle(),
                Mock.Random.cparagraph(),
                "http://opponplusgroup.oss-cn-hangzhou.aliyuncs.com/oppotemp/images/upload/1489425497599_bHxodikz.jpg",
                Mock.Random.datetime()
              ]
            ],
            "totalPage": 1,
            "currentPage": 1
          }
        })
      } else if (url == _this.globalData.api.getNoticeMessage) {
        res = Mock.mock({
          "status": true,
          "msg": "查询成功",
          "data":
          {
            "content": Mock.Random.cparagraph(),
            "title": Mock.Random.ctitle(),
            "date": Mock.Random.datetime(),
            "readNum|+1": 1,
            "userMessage|1-5":
            [
              {
                "id": 3,
                "fUserID": 99,
                "isgood": 0,
                "headImage": "http://opponplusgroup.oss-cn-hangzhou.aliyuncs.com/oppotemp/images/defaultHeadImage.jpeg",
                "fState": 1,
                "fTime": "2017-07-25 14:10:50",
                "fGoodNum": 0,
                "userName": "姜赞",
                "fIsReply": true,
                "fContent": "爱妃去 欺负请问",
                "adminMessage":
                {
                  "id": 55,
                  "fUserID": 8841,
                  "isgood": 0,
                  "fState": 2,
                  "fGoodNum": 0,
                  "fTime": "2017-07-28 10:19:53",
                  "fContent": "4262346",
                  "fIsReply": null
                }
              }
            ],
            "goodNum": 0,
            "noticegood": false
          }
        })
      }
      fn(res)
    }
  }
})