// pages/main_add/main_add.js
const app = getApp();
import Notify from '../../vantui/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeNameList: {},
    storeName: [],
    index: null,
    show: false,
    defaultStoreName: '',
    placeholder: '请点击来选择仓库',
    regNumberSta: 0
  },
  onClose() {
    this.setData({ show: false });
  },
  onPciker() {
    this.setData({ show: true });
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
    this.checkStoreNameList();
  },
  checkStoreNameList() {
    var storeName = this.data.storeName;
    var storeNameList = this.data.storeNameList;
    var that = this;

    wx.request({
      url: 'https://iis.gxuann.cn/checkStoreNameList.php',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        for(var i=0;i<res.data.length;i++) {
          storeName.push(res.data[i].storeName)
          storeNameList = storeName
        }
        console.log(storeNameList)
        that.setData({storeNameList: storeNameList})
      }
    })
  },
  onChange(e) {
    const { picker, value, index } = e.detail;
    var defaultStoreName = this.data.defaultStoreName;
    this.setData({ 
      show: false,
      defaultStoreName: e.detail.value
    });
  },
  mainAdd(e) {
    var regNumberSta = this.data.regNumberSta;
    var productName = e.detail.value.maName;
    var regNumber = e.detail.value.maNumber;
    var factoryName = e.detail.value.maFactory;
    var repoName = e.detail.value.maRepo;
    var store = e.detail.value.maStore;
    var that = this;
    if (productName=="" || regNumber=="" || factoryName=="" || repoName=="") {
      Notify({
        text: '请完善数据！',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#f44'
      });
    }else{
      wx.request({
        url: 'https://iis.gxuann.cn/mainAdd.php',
        data: {
          productName: productName,
          regNumber: regNumber,
          factoryName: factoryName,
          repoName: repoName,
          store: store
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          Notify({
            text: '添加成功！',
            duration: 2000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          });
          setTimeout(function () {
            wx.navigateBack({
              url: '../main/main'
            })
          }, 2000);
        }
      })
    }
  },
  checkRegNumber(e) {
    var regNumber = e.detail.value;
    var regNumberSta = this.data.regNumberSta;
    var that = this;
    wx.request({
      url: 'https://iis.gxuann.cn/checkRegNumber.php',
      data: {
        regNumber: regNumber
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var rs = res.data[0].regNumber;
        if (rs == 1) {
          that.setData({regNumberSta: 0})
          Notify({
            text: '登记编号重复！请检查…',
            duration: 2000,
            selector: '#custom-selector',
            backgroundColor: '#f44'
          });
        } else {
          that.setData({ regNumberSta: 1})
        }
      }
    })
  }
})