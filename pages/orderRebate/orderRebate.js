// pages/orderRebate/orderRebate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        cause: '请选择退款原因',
        actions: [{
                name: '我不想买了'
            },
            {
                name: '信息填写错误，重新买'
            },
            {
                name: '卖家缺货'
            },
            {
                name: '运费不合适'
            },
            {
                name: '其他'
            },
        ]
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