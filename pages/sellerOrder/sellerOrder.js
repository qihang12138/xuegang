// pages/sellerOrder/sellerOrder.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tag: '交易成功',
        leftBtn: '收货完成',
        centerBtn: '取货完成',
        rightBtn: '取货完成',
        type: 0
    },

    getData() {
        app.http({
            url: app.api.ApiSiteGetUserOrder,
            data: { type: this.data.type }
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    pageData: res.data.lot
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var type = options.type,
            titles = ['今日订单', '本月订单', '待提货订单', '快捷报单'],
            title = titles[type]
        this.setData({ type: type });
        wx.setNavigationBarTitle({
            title: title
        })
        this.getData();
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