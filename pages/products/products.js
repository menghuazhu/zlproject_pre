var {
  monthFormatList,
  dayFormatList,
  APIS
} = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var {
  request
} = require('../../libs/request');

Page({
  data: {
    imgUrls: [
      '/images/switch_img01.png',
      '/images/switch_img02.png',
      '/images/switch_img03.png'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: 'white',
    indicatorActivecolor: '#1E90FF',
    left: "33.3%",
    right: "66.3%",
    orderList: [], //存放数据的数组
    pageNo: 1, // 当前页数
    pageSize: 10, //每页条数
    loadingHidden: false, //控制提示文字的显示隐藏
    hasMore: true, //是否还有数据 true 有，false没有
    productDetailLogo: 'http://zl.haiyunzy.com/crowdweb/',
    whole_id: 0, //全部
    whole_txt: '',
    tar_id: 0, //焦油
    tar_txt: '',
    price_id: 0, //价格
    price_txt: '',
    //新品热门图
    newproductsImg: '/images/new_products.png',
    popularImg: '/images/popular.png',
    // 筛选
    tabTxt: ['全部', '焦油', '价格'], //分类
    tab: [true, true, true],
    wholeList: [{
        'id': '1',
        'type': '0',
        'title': '特色烟嘴棒'
      },
      {
        'id': '2',
        'type': '1',
        'title': '低焦卷烟'
      },
      {
        'id': '3',
        'type': '2',
        'title': '细支卷烟'
      },
      {
        'id': '4',
        'type': '3',
        'title': '扫码得龙币'
      },
      {
        'id': '5',
        'type': '4',
        'title': '扫码的乐豆'
      }
    ],
  },
  // 选项卡
  filterTab: function(e) {
    var data = [true, true, true],
      index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function(e) {
    // console.log(e)
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
        self.setData({
          tab: [true, true, true],
          tar_id: id,
        });
        break;
      case '2':
        self.setData({
          tab: [true, true, true],
          price_id: id,
        });
        break;
    }
  },
  gettarContentSort(e) {
    var that = this;
    var orderList = []
    let curTarg = e.currentTarget.dataset.tarcontentsort;
    let curPrice = e.currentTarget.dataset.price;
    let type = e.currentTarget.dataset.type;
    let whole = e.currentTarget.dataset.whole;
    // console.log(whole)
    request({
      url: APIS.PRODUCT_LIST,
      data: {
        sid: wx.getStorageSync('sid'),
        productBean: {
          pageNo: 1,
          pageSize: 10,
          tarContentSort: curTarg, //焦油量排序 desc asc
          priceSort: curPrice, //价格排序 desc asc
          // productType: '1',//商品类型（0：普通，1：新品，2：人气，3：成熟）
          type: type, //类型（0：特色嘴棒，1：低焦卷烟，2：细支卷烟，3：扫码得龙币，4：扫码的乐豆）
          whole: whole
        }
      },
      method: 'POST',
      realSuccess: function(resultData) {
        // console.log(resultData)
        if (resultData.dataList.length != 0) {
          if (resultData.pageNo == 1) { //当页数为1时，定义的数组为空
            orderList = []
          }
          //如果后台返回的数组长度小于我每页要取的数据的长度，说明已经是最后一页了，所以不需要后台返回page和total
          orderList = resultData.dataList
          if (orderList.length < resultData.pageSize) {
            that.setData({
              orderList: orderList,
              hasMore: false, //是否还有更多数据：没有
              loadingHidden: true, //隐藏加载框
              curTarg: curTarg,
            })
          } else {
            that.setData({
              orderList: orderList,
              hasMore: true, //是否还有更多数据：有
              pageNo: resultData.pageNo + 1, //页数加1
              loadingHidden: true, //隐藏加载框
              curTarg: curTarg,
            })
          }
        }
      },
      realFail: function (resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      },
      realComplete: function(resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      }
    }, false, that);
  },
  getProductList() {
    var that = this;
    var orderList = []
    request({
      url: APIS.PRODUCT_LIST,
      data: {
        sid: wx.getStorageSync('sid'),
      },
      method: 'POST',
      realSuccess: function(resultData) {
        //  productDetailLogo = APIS.REQ_IMG_HOST +'/upload/icon/4927229033617721.png';
        if (resultData.dataList.length != 0) {
          if (resultData.pageNo == 1) { //当页数为1时，定义的数组为空
            orderList = []
          }
          //如果后台返回的数组长度小于我每页要取的数据的长度，说明已经是最后一页了，所以不需要后台返回page和total
          orderList = resultData.dataList
          if (orderList.length < resultData.pageSize) {
            that.setData({
              orderList: orderList,
              hasMore: false, //是否还有更多数据：没有
              loadingHidden: true, //隐藏加载框
              // productDetailLogo
            })
          } else {
            that.setData({
              orderList: orderList, //合并数组
              hasMore: true, //是否还有更多数据：有
              pageNo: resultData.pageNo + 1, //页数加1
              loadingHidden: true //隐藏加载框
            })
          }
        }
      },
      realFail: function (resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      },
      realComplete: function(resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      }
    }, false, that);
  },
  searchScrollLower() {
    this.getProductList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMore) {
      this.searchScrollLower()
    } else {
      wx.showToast({
        title: "已加载完了"
      });
    }
  },
  onLoad: function(options) {
    // if (!user.checkAuthor()) {
    //   用户已经授权过
    //   wx.redirectTo({
    //     url: '../welcome/welcome',
    //   });
    // }
    wx.getSetting({
      success: function(res) {
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
  onProductTap: function(event) {
    var productId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../productDetails/productDetails?id=' + productId
    })
  },
  renderUI: function() {
    this.getProductList();
    //	this.getBannerList();//获取banner
    //   this.getNoticeList();//获取公告列表
    //	this.getProductTypes();//获取产品类 及 展示的产品
    //	wx.hideLoading();
  },


})