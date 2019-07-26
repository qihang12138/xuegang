// pages/deliveryOrder/deliveryOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid: 0,
    sid: 0,
    stepper: 0,
    commodity: '',
    site: '',
    siteId: 0,
    siteBol: true,
    ticket: [],
    remark: ''

  },
  getSite() {
    console.log('显示');
    
    var siteId = this.data.siteId
    if (siteId !== 0) {
      // 获取地址
      app.http({
        url: app.api.ApiAddrLister
      }).then(res => {
        if (res.error_code === 0) {
          if (res.data.list.length === 0) {
            console.log('无');
            this.setData({ siteBol: true })
          } else {
            res.data.list.forEach(item => {
              console.log('有');
              if (item.id === siteId) {
                this.setData({
                  site: item,
                  siteBol: false
                })
              }
            });
          }

        }
      })
    }
  },
  getData() {
    app.http({
      url: app.api.ApiGoodsDetail,
      data: { gid: this.data.gid }
    }).then(res => {
      if (res.error_code === 0) {
        this.setData({ commodity: res.data.goods })
      }
    })

    // 获取地址
    app.http({
      url: app.api.ApiAddrLister
    }).then(res => {
      if (res.error_code === 0) {
        if (res.data.list.length === 0) {
          this.setData({ siteBol: true })
        } else {
          res.data.list.forEach(item => {
            if (item.default === 1) {
              this.setData({
                site: item,
                siteId: item.id,
                siteBol: false
              })
            }
          });
        }

      }
    })
  },
  changeRemark(e) {
    this.setData({ remark: e.detail.value });
  },
  submit() {
    var data = this.data
    app.http({
      url: app.api.ApiSubmitOrderToo,
      data: {
        site_id: data.siteId,
        sid: data.sid,
        num: data.stepper,
        gid: data.gid
      },
      method: 'POST'
    }).then(res => {
      if (res.error_code === 0) {
        app.util.toast({
          title: '下单成功'
        }).then(() => {
          wx.navigateBack({
            delta: 2
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gid: options.gid,
      stepper: options.stepper,
      sid: options.sid
    });
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
    this.getSite();
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