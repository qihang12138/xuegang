// pages/commoditySearch/commoditySearch.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        on: 0,
        tid: 0,
        pageData: {},
        id: 0
    },
    changeOn(event) {
        var id = event.currentTarget.dataset.id
        this.setData({
            on: id
        });
    },
    getData() {
        app.http({
            url: app.api.ApiGetBrandGoods,
            data: {
                tid: this.data.tid,
                distribution: this.data.id
            },
            method: 'POST'
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    pageData: res.data
                })
            }
            wx.stopPullDownRefresh()
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            tid: options.tid,
            id: options.id
        });
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
        this.getData()
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