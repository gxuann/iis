// pages/addUser/addUser.js
import Toast from '../../vantui/toast/toast.js';
import Notify from '../../vantui/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingSta: false,
    reshidden: true,
    resname: '',
    resnum: '',
    resadmin: '',
    name: '',
    num: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  toUpdate(e) {
    var name = e.detail.value.name;
    var num = e.detail.value.num;
    var adminSta = e.detail.value.adminSta;
    var resname = this.data.resname;
    var resnum = this.data.resnum;
    var resadmin = this.data.resadmin;
    var that = this;
    if (name == "" || num == "") {
      Notify({
        text: '请完善信息！',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#f44'
      });
    } else {
      console.log(name, num, adminSta)
      wx.request({
        url: 'https://iis.gxuann.cn/addUser.php',
        data: {
          name: name,
          num: num,
          admin: adminSta
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
          console.log(res.data)
          that.setData({
            reshidden: false,
            resname: res.data.relName,
            resnum: res.data.num,
            name: '',
            num: ''
          })
          if (res.data.admin == 1) {
            that.setData({
              resadmin: '管理员'
            })
          } else {
            that.setData({
              resadmin: '无权限'
            })
          }
        }
      })
    }
  },
})