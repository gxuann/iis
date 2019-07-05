// pages/opt_store/opt_store.js
import Notify from '../../vantui/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastNumber: '',
    lastStoreSta: '',
    titleSta: '',
    optBg: '',
    notifyBg: '',
    productDetail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var lastNumber = this.data.lastNumber;
    var lastStoreSta = this.data.lastStoreSta;
    this.setData({
      lastNumber: options.number,
      lastStoreSta: options.storeSta
    });
    this.setTitleSta();
    this.queryProductDetail();
  },
  queryProductDetail() {
    var regNumber = this.data.lastNumber;
    var productDetail = this.data.productDetail;
    productDetail = [];
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
        productDetail.push({
          name: rs.productName,
          number: rs.regNumber,
          factory: rs.factoryName,
          repo: rs.repoName,
          store: rs.store
        });
        that.setData({
          productDetail: productDetail
        })
        console.log(productDetail[0])
      }
    })
  },
  setTitleSta() {
    var lastStoreSta = this.data.lastStoreSta;
    var titleSta = this.data.titleSta;
    var optBg = this.data.optBg;
    var notifyBg = this.data.notifyBg;
    if (lastStoreSta == 1) {
      this.setData({
        titleSta: '入库',
        notifyBg: '#8dc63f',
      });
    } else {
      this.setData({
        titleSta: '出库',
        notifyBg: '#39b54a',
      });
    }
  },
  inOptSubmit(e) {
    var regNumber = this.data.lastNumber;
    var inputStore = e.detail.value.store;
    var storeSta = this.data.lastStoreSta;
    var optName = wx.getStorageSync("relName");
    var notifyBg = this.data.notifyBg;
    var lastStore = this.data.productDetail[0].store;
    var that = this;
    if (inputStore == "") {
      Notify({
        text: '请完善数据！',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#f44'
      });
    } else {
      var newStore = Number(lastStore) + Number(inputStore);
      wx.request({
        url: 'https://iis.gxuann.cn/optSubmit.php',
        data: {
          regNumber: regNumber,
          inputStore: inputStore,
          storeSta: storeSta,
          optName: optName,
          newStore: newStore,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(inputStore, newStore, lastStore)
          that.queryProductDetail();
          wx.redirectTo({
            url: '../product_detail/product_detail?storeSta=1&number=' + regNumber,
          })
        }
      });
    }
  },
  outOptSubmit(e) {
    var regNumber = this.data.lastNumber;
    var inputStore = e.detail.value.store;
    var storeSta = this.data.lastStoreSta;
    var optName = wx.getStorageSync("relName");
    var notifyBg = this.data.notifyBg;
    var lastStore = this.data.productDetail[0].store;
    var that = this;
    if (inputStore == "") {
      Notify({
        text: '请完善数据！',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#f44'
      });
    } else {
      if (Number(inputStore) > Number(lastStore)) {
        Notify({
          text: '出库操作的数量大于当前库存，请检查！',
          duration: 2000,
          selector: '#custom-selector',
          backgroundColor: '#f44'
        });
      } else {
        var newStore = Number(lastStore) - Number(inputStore);
        wx.request({
          url: 'https://iis.gxuann.cn/optSubmit.php',
          data: {
            regNumber: regNumber,
            inputStore: inputStore,
            storeSta: storeSta,
            optName: optName,
            newStore: newStore,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(inputStore, newStore, lastStore)
            that.queryProductDetail();
            wx.redirectTo({
              url: '../product_detail/product_detail?storeSta=0&number=' + regNumber,
            })
          }
        });
      }
    }
  }
})