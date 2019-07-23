// pages/commodityDetails/commodityDetails.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData:{},
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        nodes: [{
            name: 'div',
            attrs: {
                class: 'div_class',
                style: 'margin-bottom: 100px; color: red;'
            },
            children: [{
                type: 'text',
                text: '富文本'
            }]
        }]
    },
    postData() {
        app.http({
          url: app.api.ApiGoodsDetail,
          data: {
            gid:'18'
          }
        }).then(res => {
          if (res.error_code === 0) {
            this.setData({
              pageData: res.data
            })
          }
        })
      },
    tap() {
        console.log('tap')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.postData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})