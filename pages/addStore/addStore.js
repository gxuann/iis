// pages/addStore/addStore.js
const app = getApp();
import Toast from '../../vantui/toast/toast.js';
import Notify from '../../vantui/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  addStoreName(e) {
    var store = e.detail.value.store;
    var that = this;
    if (store == '') {
      Notify({
        text: '请完善信息！',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#f44'
      });
    } else {
      wx.request({
        url: 'https://iis.gxuann.cn/addStoreNameList.php',
        data: {
          storeName: store,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          Notify({
            text: '添加成功！',
            duration: 2000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          });
          console.log(res)
          that.setData({ store: ''})
        }
      })
    }
  }
})