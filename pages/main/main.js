// pages/main/main.js
const app = getApp();
const UNBIND = 0;
const ISBIND = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    checkSta: '',
    noticeText: '',
    elements: [
      {
        title: '添加',
        name: 'main_add',
        color: 'cyan',
        icon: 'add'
      },
      {
        title: '查询',
        name: 'main_query',
        color: 'orange',
        icon: 'https://iis.gxuann.cn/images/main_query.png'
      },
      {
        title: '入库',
        name: 'main_in',
        color: 'olive',
        icon: 'descending'
      },
      {
        title: '出库',
        name: 'main_out',
        color: 'green',
        icon: 'ascending'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  onShow: function() {
    console.log("onShow******")
    this.checkBindStatus();
    this.checkNotice();
  },
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

  checkBindStatus() {
    var openID = wx.getStorageSync("openID");
    console.log(openID)
    var that = this;
    var checkSta = this.data.checkSta;
    wx.request({
      url: 'https://iis.gxuann.cn/checkBindStatus.php',
      data: {
        openID: openID
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var rs = res.data[0];
        console.log(rs)
        if (rs.num == null) {
          that.setData({
            checkSta: UNBIND
          })
        } else {
          that.setData({
            checkSta: ISBIND
          });
        }
      }
    });
  },
  checkNotice() {
    var that = this;
    var noticeText = this.data.noticeText;

    wx.request({
      url: 'https://iis.gxuann.cn/checkNotice.php',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var rs = res.data[0]
        that.setData({
          noticeText: rs.noticeText
        })
      }
    })
  },
  
})