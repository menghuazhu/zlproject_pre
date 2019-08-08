var { monthFormatList, dayFormatList, APIS } = require('../../const');

var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');

Page({
  data: {
    defaultText:'欢迎查看产品展示',
    defaultButton:'开始使用'
  },


  onLoad: function (options) {
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
                //用户已经授权过
                wx.redirectTo({
                //  url: '../products/products',
                //
                });
              }
            })
          }
        }
      })
  },

    getUserInfoTap(event) {
      // 点击同意
      if (event.detail.userInfo) {
        wx.reLaunch({
          url: '../products/products',
        })
      } else {
        this.setData({
          defaultText: '为保证您的正常使用,请进行授权!',
          defaultButton: '重新授权'
        })
      }
    }  
})