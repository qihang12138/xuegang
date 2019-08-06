// pages/retail/retail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        vipShow: false
    },
    getData() {
        app.http({
            url: app.api.ApiRetail
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    pageData: res.data.goods
                })
            }
        })
    },
    share() {
        app.api.ApiDiscountsList().then(res => {
            if (res.error_code === 0) {
                this.setData({
                    pageData: res.data.lot
                })
            }
        })
    },
    retail(e) {
        var gid = e.currentTarget.dataset.gid;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var id = options.id;
        if (id == 3) {
            this.setData({ vipShow: true })
            wx.setNavigationBarTitle({
                title: '团长直供'
            })
        } else if (id == 4) {
            wx.setNavigationBarTitle({
                title: '商品分享'
            })
            this.share()
        } else {
            this.getData()

        }

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