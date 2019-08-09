var { monthFormatList, dayFormatList, APIS } = require('../../const');

var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
       
Page({
	data: {
    imgUrls: [
      '/images/switch_img01.png',
      '/images/switch_img02.png',
      '/images/switch_img03.png'
    ],
    //
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: 'white',
    indicatorActivecolor: '#1E90FF',
    left: "33.3%",
    right: "66.3%",
    // 筛选
    tabTxt: ['全部', '焦油', '价格'], //分类
    tab: [true, true, true],
    wholeList: [{
      'id': '1',
      'title': '品牌1'
    }, {
      'id': '2',
      'title': '品牌2'
    }],
    whole_id: 0, //全部
    whole_txt: '',
    tar_id: 0, //焦油
    tar_txt: '',
    price_id: 0, //价格
    price_txt: '',
    dataList: [{
      goods_id: 1,
      goods_title: '真龙巴马天成',
      details_title: '详细内容',
      goods_img: '/images/genuine_ dragon.png',
      newp_img: '/images/new_ products.png',
      popular_img: '/images/popular.png'
    }, {
      goods_id: 2,
      goods_title: '真龙巴马天成',
      details_title: '详细内容',
      goods_img: '/images/switch_img02.png',
      newp_img: '/images/new_ products.png',
      popular_img: '/images/popular.png'
    }, {
      goods_id: 3,
      goods_title: '真龙巴马天成',
      details_title: '详细内容',
      goods_img: '/images/switch_img03.png',
      newp_img: '/images/new_ products.png',
      popular_img: '/images/popular.png'
    }, {
      goods_id: 4,
      goods_title: '商品标题4',
      details_title: '详细内容',
      goods_img: '/images/switch_img02.png',
      newp_img: '/images/new_ products.png',
      popular_img: '/images/popular.png'
    }, {
      goods_id: 5,
      goods_title: '商品标题5',
      details_title: '详细内容',
      goods_img: '/images/switch_img01.png',
      newp_img: '/images/new_ products.png',
      popular_img: '/images/popular.png'
    }],
	},
  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true],
      index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function (e) {
    var self = this,
      id = e.currentTarget.dataset.id,
      txt = e.currentTarget.dataset.txt,
      tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          whole_id: id,
          whole_txt: txt
        });
        break;
      case '1':
        // tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          // tabTxt: tabTxt,
          tar_id: id,
          // tar_txt: txt
        });
        break;
      case '2':
        // tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
          // tabTxt: tabTxt,
          price_id: id,
          // price_txt: txt
        });
        break;
    }
  },

	onLoad: function (options) {
    if(!user.checkAuthor()){
      //用户已经授权过
      wx.redirectTo({
        // url: '../welcome/welcome',
      });
    }
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