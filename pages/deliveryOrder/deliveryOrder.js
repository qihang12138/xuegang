// pages/deliveryOrder/deliveryOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid: 0,
    sid: 0,
    num: 0,
    commodity: '',
    site: '',
    siteId: 0,
    siteBol: false,
    ticket: [],
    remark: '',
    cart: false,
    order: ''
  },
  getSite() {
    var siteId = this.data.siteId
    if (siteId !== 0) {
      // 获取地址
      app.http({
        url: app.api.ApiAddrLister
      }).then(res => {
        if (res.error_code === 0) {
          if (res.data.list.length === 0) {
            this.setData({ siteBol: true })
          } else {
            res.data.list.forEach(item => {
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
  postData() {
    var msgObj = {
      gid: this.data.gid,
      sid: this.data.sid,
      num: this.data.num
    }
    app.http({
      url: app.api.ApiQuerenToo,
      data: msgObj
    }).then(res => {
      if (res.error_code === 0) {
        // this.setData({ commodity: res.data.goods })
        if (res.data.addr !== {}) {
          this.setData({
            siteBol: false,
            site: res.data.addr,
            commodity: res.data.return_data[0].goods_data[0],
            price: res.data.return_data[0].price_detail[0]
          })
        }
      }
    })


  },
  changeRemark(e) {
    this.setData({ remark: e.detail.value });
  },
  submit() {
    var data = this.data,
      cart = data.cart,
      msgObj = {
        site_id: data.site.id,
        content: data.remark
      },
      userInfo = {
        site_id: data.site.id,
        content: data.remark,
        sid: data.sid,
        num: data.num,
        gid: data.gid
      }

    app.http({
      url: cart ? app.api.ApiSubmitCarToo : app.api.ApiSubmitOrderToo,
      data: cart ? msgObj : userInfo,
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
  cartData() {
    app.http({
      url: app.api.ApiCarQuerenToo,
      data: { gid: this.data.gid }
    }).then(res => {
      if (res.error_code === 0) {
        this.setData({
          pageData: res.data
        })
        if (res.data.addr !== {}) {
          this.setData({
            siteBol: false,
            site: res.data.addr,
            price: res.data.order_data.price_detail
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gid: options.gid,
      num: options.stepper,
      sid: options.sid
    });
    if (options.cart) {
      this.setData({ cart: true })
      this.cartData();
    } else {
      this.postData();
    }
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