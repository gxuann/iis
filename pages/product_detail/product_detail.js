// pages/product_detail/product_detail.js
import Notify from '../../vantui/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastNumber: '',
    storeSta: '',
    productDetail: [],
    optList: [],
    noOpt: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var lastNumber = this.data.lastNumber;
    var storeSta = this.data.storeSta;
    this.setData({ 
      lastNumber: options.number, 
      storeSta: options.storeSta,
    });
    this.queryProductDetail();
    this.queryProductStoreSta();
    this.showNotify();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  queryProductDetail() {
    var regNumber = this.data.lastNumber;
    var productDetail = this.data.productDetail;
    var that = this;
    wx.request({
      url: 'https://iis.gxuann.cn/queryProductDetail.php',
      data: {
        regNumber: regNumber
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var rs = res.data[0];
        productDetail.push({ name: rs.productName, number: rs.regNumber, factory: rs.factoryName, repo: rs.repoName, store: rs.store});
        that.setData({productDetail: productDetail})
      }
    })
  },
  queryProductStoreSta() {
    var num = this.data.lastNumber;
    var optList = this.data.optList;
    optList = [];
    var that = this;
    wx.request({
      url: 'https://iis.gxuann.cn/queryProductStoreSta.php',
      data: {
        regNumber: num,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        for (var i = 0; i < res.data.length; i++) {
          var obj = {
            id: i,
            name: res.data[i].optName,
            date: res.data[i].date,
            storeSta: res.data[i].storeSta,
            store: res.data[i].store,
          }
          optList.push(obj);
        };
        that.setData({ optList: optList });
        if (optList.length == 0) {
          var noOpt = that.data.noOpt;
          that.setData({noOpt: 1})
        }
      }
    })
  },
  showNotify() {
    var storeSta = this.data.storeSta;
    if (storeSta == 1) {
      Notify({
        text: '操作成功！',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#8dc63f'
      });
    };
    if (storeSta == 0) {
      Notify({
        text: '操作成功！',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#39b54a'
      });
    }
  }
})