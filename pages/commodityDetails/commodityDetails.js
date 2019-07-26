// pages/commodityDetails/commodityDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 5,
    pageData: {},
    // discounts: false,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    collect: 0,
    ticketShow: false,
    cartShow: false,
    stepper: 1,
    sid: 0,
    sidIndex: 0,
  },
  getData() {
    app.http({
      url: app.api.ApiGoodsDetail,
      data: { gid: '18' }
    }).then(res => {
      let { error_code, data } = res;
      if (error_code === 0) {
        data.goods.g_content = data.goods.g_content.replace(/style=""/gi, '<img style="max-width:100%;height:auto" ')
        data.comment.forEach(item => {
          item.create = app.util.formatTime(new Date(item.create * 1000))
        })
        data.buy_record.forEach(item => {
          item.create = app.util.formatTime(new Date(item.create * 1000))
        })
        this.setData({
          pageData: data,
          collect: data.goods.collect
        })
      }
    })
  },
  chengeCollect(e) {
    var gid = e.currentTarget.dataset.gid;
    var collect = this.data.collect;
    app.http({
      url: app.api.ApiCollect,
      data: { gid: gid }
    }).then(res => {
      this.setData({
        collect: !collect
      })
    })
  },
  changeSpec(e) {
    var sid = e.currentTarget.dataset.sid;
    this.setData({ sid: sid });
    console.log(this.data.sid)
  },
  ticketShow() {
    this.setData({ ticketShow: true });
  },
  onClose() {
    this.setData({
      ticketShow: false,
      cartShow: false
    });
  },
  stepper(event) {
    this.setData({ stepper: event.detail });
  },
  addCart() {
    this.setData({ cartShow: true });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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