// pages/main_in/main_in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    productList: [],
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
    this.queryProductList();
  },
  toProductDetail(e) {
    var number = e.currentTarget.dataset.number;
    console.log(number)
    wx.navigateTo({
      url: '../opt_store/opt_store?storeSta=1&number=' + number,
    })
  },
  queryProductList() {
    var productList = this.data.productList;
    productList = [];
    var that = this;
    wx.request({
      url: 'https://iis.gxuann.cn/queryProductList.php',
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          var obj = {
            id: i,
            name: res.data[i].productName,
            number: res.data[i].regNumber,
            factroy: res.data[i].factroyName,
            repo: res.data[i].repoName,
            store: res.data[i].store,
          }
          productList.push(obj);
        }
        that.setData({ productList: productList })
      }
    })
  },
  queryProduct(e) {
    var searchValue = e.detail;
    var productList = this.data.productList;
    productList = [];
    var that = this;
    wx.request({
      url: 'https://iis.gxuann.cn/queryProductByName.php',
      data: {
        productName: searchValue
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ productList: [] });
        for (var i = 0; i < res.data.length; i++) {
          var obj = {
            id: i,
            name: res.data[i].productName,
            number: res.data[i].regNumber,
            factroy: res.data[i].factroyName,
            repo: res.data[i].repoName,
            store: res.data[i].store,
          }
          productList.push(obj);
        }
        that.setData({
          productList: productList,
          searchValue: ''
        });
      }
    })
  }
})
