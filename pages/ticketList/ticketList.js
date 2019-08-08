// pages/ticketList/ticketList.js
const app = getApp()
import Toast from '../../vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: ''
    },
    getData() {
        app.http({
            url: app.api.ApiCouponList
        }).then(res => {
            if (res.error_code === 0) {
                res.data.lot.forEach(item => {
                    item.start = app.util.YMD(new Date(item.start * 1000));
                    item.end = app.util.YMD(new Date(item.end * 1000));
                })
                this.setData({
                    pageData: res.data.lot
                })
            }
        })
    },
    getCoupon(e) {
        var cid = e.currentTarget.dataset.cid;
        app.http({
            url: app.api.ApiGetCoupon,
            data: { cid: cid }
        }).then(res => {
            if (res.error_code === 0) {
                Toast.success(res.msg);
            } else {

                Toast.fail(res.msg);
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