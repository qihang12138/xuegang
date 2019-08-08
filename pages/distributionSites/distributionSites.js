// pages/distributionSites/distributionSites.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        site: ''
    },
    getData(lng, lat) {
        app.http({
            url: app.api.ApiGetNearSite,
            data: {
                lng: lng,
                lat: lat
            },
            method: 'POST'
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({ site: res.data.site })
            }
        })
    },
    confirm(e) {
        var item = e.currentTarget.dataset.item;
        console.log(item);

        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
        let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。
        prevPage.setData({
            site: item.community,
            ['msgObj.site_id']: item.uid
        })
        wx.navigateBack({
            delta: 1
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        wx.getLocation({
            success(res) {
                var lng = res.longitude,
                    lat = res.latitude
                _this.getData(lng, lat);
            }
        })
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