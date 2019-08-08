// pages/orderWait/orderWait.js
import Dialog from '../../vant/dialog/dialog'

const app = getApp()
Page({
    data: {
        type: 0,
        never: []
    },
    /**
     * 页面的初始数据
     */
    getData() {
        var never = [],
            type = this.data.type;
        app.http({
            url: app.api.ApiGetUserOrder,
            data: { type: type },
            method: 'POST'
        }).then(res => {
            if (res.error_code === 0) {
                // res.data.never.forEach(item => {
                //     if (item.type === type) {
                //         never.push(item)
                //     }
                // });
                this.setData({
                    never: res.data.never
                })
                console.log(never, type);

            }
        })
    },
    cancel(e) {
        Dialog.confirm({
            message: '确定要取消该订单吗?'
        }).then(() => {
            var oid = e.currentTarget.dataset.oid;
            app.http({
                url: app.api.ApiCancelOrder,
                data: { oid: oid }
            }).then(res => {
                if (res.error_code === 0) {
                    this.getData()
                }
            })
        }).catch(() => {
            // on cancel
        });
    },
    pay(e) {
        var oid = e.currentTarget.dataset.oid
        app.http({
            url: app.api.ApiPay,
            data: {
                oid: oid
            }
        }).then(data => {
            wx.requestPayment({
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: 'MD5',
                paySign: data.paySign,
                success(res) {
                    wx.reLaunch({
                        url: '../orderResult/orderResult?bol=1'
                    })
                },
                fail(res) {
                    wx.reLaunch({
                        url: '../orderResult/orderResult?bol=0'
                    })
                }
            })

        })
    },
    reciving(e) {
        var oid = e.currentTarget.dataset.oid;
        app.http({
            url: app.api.ApiReciving,
            data: { oid: oid }
        }).then(res => {
            if (res.error_code === 0) {
                this.getData()
            }
        })
    },
    evaluate(e) {
        var oid = e.currentTarget.dataset.oid;
        app.http({
            url: app.api.ApiSaveComment,
            data: { oid: oid }
        }).then(res => {
            if (res.error_code === 0) {
                this.getData()
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);

        var type = options.type - 0;
        this.setData({ type: type })
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