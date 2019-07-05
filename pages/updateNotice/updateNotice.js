// pages/updateNotice/updateNotice.js
import Toast from '../../vantui/toast/toast.js';
import Notify from '../../vantui/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue: '',
    resNoticeText: '',
    reshidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  textareaInput(e) {
    this.setData({
      textareaValue: e.detail.value
    })
  },
  toUpdate(e) {
    var noticeText = this.data.textareaValue;
    var resNoticeText = this.data.resNoticeText;
    var reshidden = this.data.reshidden;
    var that = this;

//!!!请更新server中updateNotice.php中sql语句的id=1以用于正式demo中!!!
    if (noticeText == "") {
      Notify({
        text: '请完善信息！',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#f44'
      });
    } else {
      wx.request({
        url: 'https://iis.gxuann.cn/updateNotice.php',
        data: {
          noticeText: noticeText
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          Notify({
            text: '更新成功！',
            duration: 2000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          });
          that.setData({
            resNoticeText:res.data.noticeText,
            reshidden: false,
          })

        }
      })
    }
  }
})