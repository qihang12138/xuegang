// pages/orderWait/orderWait.js
import Dialog from '../../vant/dialog/dialog'

const app = getApp()
Page({
    data: {
        type: 0,
        never: [],
        tips: ''
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
    rebate(e) {
        var oid = e.currentTarget.dataset.oid;
        wx.navigateTo({
            url: '../orderRebate/orderRebate?oid=' + oid
        })
    },
    evaluate(e) {
        var oid = e.currentTarget.dataset.oid;
        wx.navigateTo({
            url: '../orderComment/orderComment?oid=' + oid
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var type = options.type - 0;
        if (type === 0) {
            this.setData({ tips: '等待买家付款' })
        } else if (type === 1) {
            this.setData({ tips: '等待卖家发货' })
        } else if (type === 2) {
            this.setData({ tips: '等待买家取货' })
        } else if (type === 4) {
            this.setData({ tips: '交易成功' })
        }
        this.setData({ type: type })
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