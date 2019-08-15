// pages/productDetails/productDetails.js
var { monthFormatList, dayFormatList, APIS } = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // orderList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var posId=options.id;
    // console.log(posId)
    request({
      url: APIS.PRODUCT_LIST,
      data: {
        sid: wx.getStorageSync('sid'),
      },
      method: 'POST',
      realSuccess: function (resultData) {
        var orderList = resultData.dataList[posId];
        console.log(orderList)
        that.setData({
          orderList: orderList
        })
      },
    }, false,that);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})