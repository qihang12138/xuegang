// pages/orderComment/orderComment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: 3,
        assess: []
    },
    onChange(event) {
        this.setData({
            value: event.detail
        });
    },
    getData(oid) {
        app.http({
            url: app.api.ApiCommentView,
            data: { oid: oid }
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({ order: res.data })

            }
        })
    },
    postData() {
        var data = this.data
        app.http({
            url: app.api.ApiSaveComment,
            data: { oid: data.oid }
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({ order: res.data })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({ oid: options.oid })
        this.getData(options.oid);
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