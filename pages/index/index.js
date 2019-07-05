//index.js
import Toast from '../../vantui/toast/toast';
const app = getApp();
const UNLOGIN = 0;
const ISLOGIN = 1;
Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    loginType: UNLOGIN,
  },
  onLoad: function() {
  },
  onShow: function() {},
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    this.toLogin();
  },
  toLogin() {
    var loginType = this.data.loginType;
    wx.login({
      success: function(res) {
        var that = this;
        var code = res.code;
        var userNick = app.globalData.userInfo.nickName;
        var avataUrl = app.globalData.userInfo.avatarUrl;
        if (code) {
          wx.request({
            url: 'https://iis.gxuann.cn/login.php',
            data: {
              code: code,
              nick: userNick,
              avaurl: avataUrl,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              var rs = res.data;
              console.log(rs)
              Toast('登录成功！');
              wx.setStorage({ key:'nickName', data:rs.nickName });
              wx.setStorage({ key: 'imgUrl', data: rs.imgUrl });
              wx.setStorage({ key: 'openID', data: rs.openID });
            }
          })
        }
      }
    });
    this.setData({ loginType: ISLOGIN });
  },
  toMainPage() {
    var that = this;
    var loginType = this.data.loginType;
    var openID = wx.getStorageSync("openID");
    if( openID == null) {
      this.toLogin();
    }
    wx.checkSession({
      success: function (res) {
        console.log(res)
        wx.switchTab({
          url: '../main/main',
        });
      },
      fail() {
        that.setData({ loginType: UNLOGIN })
      }
    })
  },
})