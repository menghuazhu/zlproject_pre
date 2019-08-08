var { monthFormatList, dayFormatList, APIS } = require('../../const');

var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');

Page({
	data: {
		footerConfig:{
			isHiddenPush:true,
		},
	 	banerList:[],//banner图片
		notice: [],
		somkeList:[],// 酒列表
		scene:'',// 是否是扫码进入
     	hasMore:'',
    	loadText:'点击加载更多...',
		wineCategoryId:'',//酒分类id
		smokeCategoryId:'',//烟分类id
  	    indicatorDots: true,  
	    autoplay: true,  
	    interval: 5000,  
	    duration: 500,
   		scrollToId: 'J_detail',
	  	fromShare: 0
	},


	onLoad: function (options) {
    if(!user.checkAuthor()){
      //用户已经授权过
      wx.redirectTo({
        url: '../welcome/welcome',
      });
    }
  },
	onShow: function() {
		user.login(this.renderUI, this, true);
		var footerConfig = {
			isHiddenPush:user.isAllowPublish()
		};
		this.setData({
			footerConfig:footerConfig
		});
	},

	renderUI: function () {
			
		//	this.getBannerList();//获取banner
		 //   this.getNoticeList();//获取公告列表
		//	this.getProductTypes();//获取产品类 及 展示的产品
		//	wx.hideLoading();
    },


})