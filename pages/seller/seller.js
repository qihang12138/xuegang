// pages/seller/seller.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        links: []
    },

    getData() {
        app.http({
            url: app.api.ApiSiteIndex
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    pageData: res.data
                })
            }
        })

        app.http({
            url: app.api.ApiGetUserData
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    profit: res.data.user.profit
                })
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        this.getData();
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