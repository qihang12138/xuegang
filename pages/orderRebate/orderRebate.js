// pages/orderRebate/orderRebate.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        order: '',
        oid: '',
        child: '',
        cause: '',
        causes: ''
    },
    cause() {
        this.setData({ show: true });
    },
    onClose() {
        this.setData({ show: false });
    },

    onSelect(event) {
        this.setData({
            cause: event.detail.name,
            show: false
        })
    },
    getData(oid) {
        app.http({
            url: app.api.ApiTuiView,
            data: { oid: oid }
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    order: res.data.order,
                    child: res.data.child[0],
                    causes: res.data.cause
                })
            }
        })
    },
    submit() {
        app.http({
            url: app.api.ApiTui,
            data: { oid: this.data.oid, reason: this.data.cause },
            method: 'POST'
        }).then(res => {
            if (res.error_code === 0) {
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var oid = options.oid
        this.setData({ oid: oid })
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