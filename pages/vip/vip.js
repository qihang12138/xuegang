// pages/vip/vip.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        vip: '',
        typeOn: 0,
        vid: '',
        currentValue: 30,
        level: true
    },
    typeOn(e) {
        var on = e.currentTarget.dataset.on,
            id = e.currentTarget.dataset.id
        this.setData({
            typeOn: on,
            vid: id
        });

    },
    getData() {
        app.api.ApiVipTest().then(res => {
            if (res.error_code === 0) {
                var level = res.data.user_alone.level;
                if (level !== 0) {
                    this.setData({ level: false })
                } else {
                    this.setData({ level: true })
                }
                this.setData({
                    vip: res.data,
                    vid: res.data.vip_lot[0].id
                })
            }
        })
    },
    pay() {
        var _this = this,
            data = this.data,
            payObj = {
                type: 0,
                vid: data.vid
            }
        app.api.ApiAddVipOrder(payObj).then(res => {
            if (res.error_code === 0) {
                var id = {
                    id: res.data.id
                }
                app.api.ApiVipPay(id).then(data => {
                    wx.requestPayment({
                        timeStamp: data.timeStamp,
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: 'MD5',
                        paySign: data.paySign,
                        success(res) {
                            app.util.toast({
                                title: '充值成功'
                            }).then(() => {
                                _this.getData()
                            })
                        },
                        fail(res) {
                            app.util.toast({
                                title: '充值失败',
                                icon: 'none'
                            }).then(() => {
                                _this.getData()
                            })
                        }
                    })
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