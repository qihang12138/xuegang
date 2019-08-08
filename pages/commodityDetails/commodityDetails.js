// pages/commodityDetails/commodityDetails.js
const app = getApp()
import Toast from '../../vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: 5,
        pageData: {},
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        collect: 0,
        ticketShow: false,
        cartShow: false,
        stepper: 1,
        sid: 0,
        sidIndex: 0,
        gid: 18,
        siteId: 0,
        btnShow: true,
        type: 0,
        price: 0
    },
    getData() {
        app.http({
            url: app.api.ApiGoodsDetail,
            data: { gid: this.data.gid }
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                data.goods.g_content = data.goods.g_content.replace(/style=""/gi, '<img style="max-width:100%;height:auto" ')
                data.comment.forEach(item => {
                    item.create = app.util.formatTime(new Date(item.create * 1000))
                })
                data.coupon.forEach(item => {
                    item.start = app.util.YMD(new Date(item.start * 1000));
                    item.end = app.util.YMD(new Date(item.end * 1000));
                })
                data.buy_record.forEach(item => {
                    item.create = app.util.formatTime(new Date(item.create * 1000))
                })
                this.setData({
                    pageData: data,
                    collect: data.goods.collect,
                    sid: data.spec[0].sid,
                    type: data.goods.distribution
                })
            }
        })
    },
    chengeCollect(e) {
        var gid = e.currentTarget.dataset.gid;
        var collect = this.data.collect;
        app.http({
            url: app.api.ApiCollect,
            data: { gid: gid }
        }).then(res => {
            this.setData({
                collect: !collect
            })
        })
    },
    changeSpec(e) {
        var sid = e.currentTarget.dataset.sid;
        this.setData({ sid: sid });
    },
    ticketShow() {
        this.setData({ ticketShow: true });
    },
    onClose() {
        this.setData({
            ticketShow: false,
            cartShow: false
        });
    },
    stepper(event) {
        this.setData({ stepper: event.detail });
    },
    addCart() {
        this.setData({
            cartShow: true,
            btnShow: true
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
    buy() {
        this.setData({
            cartShow: true,
            btnShow: false
        })
    },
    submit() {
        var data = this.data;
        app.http({
            url: app.api.ApiSaveCar,
            data: {
                gid: data.gid,
                sid: data.sid,
                num: data.stepper
            },
            method: 'POST'
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    cartShow: false,
                })
                app.util.toast({
                    title: '添加成功'
                })
            }
        })
    },
    toCart() {
        wx.switchTab({
            url: '../cart/cart'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            gid: options.gid,
            price: options.price - 0
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