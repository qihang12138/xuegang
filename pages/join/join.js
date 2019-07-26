// pages/join/join.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData:'',
    flag: 1,
    schedule: 1,
    band: [],
    name: '',
    phone: '',
    community: '',
    addr: '',
    positive: '',
    reverse: '',
    steps: [{
      text: '我的申请'
    },
    {
      text: '已接受'
    },
    {
      text: '正在审核'
    },
    {
      text: '成功'
    }
    ],
    active: 2,
    hintShow: false
  },
  name(event) {
    this.setData({ name: event.detail.value });
  },
  phone(event) {
    this.setData({ phone: event.detail.value });
  },
  community(event) {
    this.setData({ community: event.detail.value });
  },
  addr(event) {
    this.setData({ addr: event.detail.value });
  },
  change(event) {
    var band = this.data.band;
    this.setData({
      flag: event.detail.index + 1,
      name: '',
      phone: '',
      community: '',
      addr: ''
    })

    this.schedule(band);
  },
  submit() {
    var msgObj = {
      type: this.data.flag,
      name: this.data.name,
      phone: this.data.phone,
      community: this.data.community,
      addr: this.data.addr,
      positive: this.data.positive,
      reverse: this.data.reverse
    }
    console.log(msgObj);
    app.http({
      url: app.api.ApiApply,
      data: msgObj,
      method: 'POST'
    }).then(res => {

    })
  },
  getData() {
    app.http({
      url: app.api.ApiGetApply
    }).then(res => {
      if (res.error_code === 0) {
        var band = res.data.band;
        this.setData({
          pageData: res.data
        })
        if (band !== []) {
          this.setData({
            band: band
          })
          this.schedule(band);
        }
      }
    })
  },
  schedule(band) {
    var data = this.data
    band.forEach(item => {
      if (item.type === data.flag) {
        this.setData({
          schedule: 0
        })
        if (item.status === 0) {
          this.setData({ active: 2 });
        } else if (item.status === 1) {
          this.setData({ active: 4 });
        } else if (item.status === 2) {
          this.setData({
            active: 3,
            hintShow: true
          })
        }
      }

    });
  },
  changeHint() {
    this.setData({ hintShow: false });
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