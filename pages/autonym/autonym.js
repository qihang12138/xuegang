// pages/autonym/autonym.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    frontImg: 'https://s2.ax1x.com/2019/07/24/eATq3T.png',
    contraryImg: 'https://s2.ax1x.com/2019/07/24/eATq3T.png',
    positive: '',
    reverse:''
  },
  postData() {
    app.http({
      url: app.api.ApiIndex,
      method: 'POST'
    }).then(res => {
      if (res.error_code === 0) {
        this.setData({
          pageData: res.data
        })
      }
    })
  },
  frontImg() {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths,
          tempImg = tempFilePaths[0];

        _this.setData({
          frontImg: tempImg
        });

        app.upload({
          url: app.api.ApiUploadFile,
          filePath: tempImg,
          name: 'file',
        }).then(res => {
          _this.setData({ positive: res.data.file_data })
        })
      }
    })
  },
  contraryImg() {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths,
          tempImg = tempFilePaths[0];

        _this.setData({
          contraryImg: tempImg
        });

        app.upload({
          url: app.api.ApiUploadFile,
          filePath: tempImg,
          name: 'file',
        }).then(res => {
          _this.setData({ reverse: res.data.file_data })
        })

      }
    })
  },
  submit() {
    let pages = getCurrentPages();//获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];//prevPage 是获取上一个页面的js里面的pages的所有信息。
    prevPage.setData({
      positive: this.data.positive,
      reverse: this.data.reverse
    })
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.postData();
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