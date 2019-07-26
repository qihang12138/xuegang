// pages/receivingList/receivingList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 0,
  },
  getData() {
    app.http({
      url: app.api.ApiAddrLister
    }).then(res => {
      if (res.error_code === 0) {
        this.setData({
          pageData: res.data.list
        })
      }
    })
  },
  editSite(e) {
    wx.navigateTo({
      url:'/pages/receiving/receiving?id='+e.currentTarget.dataset.id
    })
  },
  select(e) {
    if (this.data.select) {
      let pages = getCurrentPages();//获取当前页面js里面的pages里的所有信息。
      let prevPage = pages[pages.length - 2];//prevPage 是获取上一个页面的js里面的pages的所有信息。
      prevPage.setData({
        siteId: e.currentTarget.dataset.id
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.select) {
      this.setData({ select: 1 })
    }
    this.getData();
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
    this.getData();
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