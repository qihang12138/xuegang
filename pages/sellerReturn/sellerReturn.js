// pages/sellerReturn/sellerReturn.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        lot: [],
        actions: [],
        oid: 0
    },
    getData() {
        app.api.ApiReject().then(res => {
            if (res.error_code === 0) {
                res.data.lot.forEach(item => {
                    item.t_create = app.util.formatTime(new Date(item.t_create * 1000))
                });
                this.setData({
                    lot: res.data.lot,
                    actions: res.data.cause,
                })
            }
        })
    },
    pass(e) {
        var oid = e.currentTarget.dataset.oid;
        app.api.ApiPass(oid).then(res => {
            if (res.error_code === 0) {
                app.util.toast({
                    title: '操作成功'
                }).then(() => {
                    this.getData();
                })
            }
        })
    },
    cause(e) {
        var oid = e.currentTarget.dataset.oid;
        this.setData({
            show: true,
            oid: oid
        });
    },
    onClose() {
        this.setData({ show: false });
    },

    onSelect(e) {
        var msg = {
            oid: this.data.oid,
            cause: e.detail.name
        }
        app.api.ApiTurnDown(msg).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    show: false
                })
                app.util.toast({
                    title: '操作成功'
                }).then(() => {
                    this.getData();
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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