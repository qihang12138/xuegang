// pages/errandPay/errandPay.js
const app = getApp()
import Toast from '../../vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentValue: 30,
        money: '',

    },
    onInput(e) {
        var money = e.detail;
        this.setData({ money: money })
    },
    getData() {
        app.api.ApiWallet().then(res => {
            if (res.error_code === 0) {
                var alone = res.data.user_alone;
                if (alone.level_create != 0) {
                    alone.level_create = app.util.YMD(new Date(alone.level_create * 1000));
                }
                this.setData({
                    alone: alone,
                    goal: res.data.goal
                })
            }
        })
    },
    submit() {
        var postObj = {
            type: 1,
            price: this.data.money
        }
        app.api.ApiAddVipOrder(postObj).then(res => {
            if (res.error_code === 0) {
                app.http({
                    url: app.api.ApiVipPay,
                    data: {
                        id: res.data.id
                    }
                }).then(data => {
                    wx.requestPayment({
                        timeStamp: data.timeStamp,
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: 'MD5',
                        paySign: data.paySign,
                        success(res) {
                            Toast.success('充值成功');
                        },
                        fail(res) {
                            Toast.fail('充值失败');
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