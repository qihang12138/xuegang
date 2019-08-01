// pages/orderDetails/orderDetails.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: '',
        goods: ''
    },
    getData(oid) {
        app.http({
            url: app.api.ApiOrderDetail,
            data: { oid: oid }
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    order: res.data.order,
                    goods: res.data.goods[0]
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var oid = options.oid;
        this.getData(oid);
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