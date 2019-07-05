// pages/user/user.js
const app = getApp();
import Notify from '../../vantui/notify/notify';
import Toast from '../../vantui/toast/toast';
const UNBIND = 0;
const ISBIND = 1;
const ISADMIN = 1;
const NOADMIN = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    checkSta: UNBIND,
    relName: '',
    num: '',
    adminSta: NOADMIN
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo, 
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkBindStatus();
  },
  onPullDownRefresh() {
    this.checkRealInfo();
    wx.stopPullDownRefresh();
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
      success: function (res) {
        var rs = res.data[0];
        console.log(rs)
        if (rs.num == null) {
          that.setData({
            checkSta: UNBIND
          });
        } else {
          that.setData({
            checkSta: ISBIND
          });
          that.checkRealInfo();
        }
      }
    });
    
  },
  toBind(e){
    var name = e.detail.value.name;
    var num = e.detail.value.num;
    var openID = wx.getStorageSync("openID");
    var that = this;
    if (e.detail.value.name == '' || e.detail.value.num==''){
      Notify({
        text: '请完善数据！',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#f44'
      });
    }else{
      wx.setStorageSync('num', e.detail.value.num);
      console.log(name, num, openID)
      wx.request({
        url: 'https://iis.gxuann.cn/register.php',
        data: {
          name: name,
          num: num,
          openID: openID,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          Toast.success('绑定成功！');
          console.log(res)
          that.setData({checkSta: ISBIND});
          that.checkRealInfo();
        }
      })
    }
  },
  checkRealInfo(){
    var num = wx.getStorageSync("num");
    var that = this;
    wx.request({
      url: 'https://iis.gxuann.cn/checkRealInfo.php',
      data: {
        num: num
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var rs = res.data[0];//查询的真实信息
        console.log("checkrealInfo*****")
        console.log(rs)
        console.log("res.adminSta****"+rs.admin)
        var relName = that.data.relName;
        var adminSta = that.data.adminSta;
        var num = that.data.num;
        wx.setStorageSync('relName', rs.relName);
        that.setData({
          relName: rs.relName,
          num: rs.num
        });
        if(rs.admin == 1) {
          that.setData({
            adminSta: ISADMIN
          })
        } else{
          that.setData({
            adminSta: NOADMIN
          })
        }
      }
    });
  },
  proAddUser() {
    wx.navigateTo({
      url: '../addUser/addUser',
    })
  },
  proUpdateNotice() {
    wx.navigateTo({
      url: '../updateNotice/updateNotice',
    })
  },
  proAddStore() {
    wx.navigateTo({
      url: '../addStore/addStore',
    })
  },
  proMoreFunc() {
    Toast('更多高级功能待添加…');
  },
})