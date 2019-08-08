var { monthFormatList, dayFormatList, APIS } = require('../../const');

var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');

Page({
	data: {
	  	fromShare: 0
	},


	onLoad: function (options) {
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '../welcome/welcome',
          });
        }
      }
    });
  },
	onShow: function() {
		user.login(this.renderUI, this, true);
	},

	renderUI: function () {
			
		//	this.getBannerList();//获取banner
		 //   this.getNoticeList();//获取公告列表
		//	this.getProductTypes();//获取产品类 及 展示的产品
		//	wx.hideLoading();
    },


})