// pages/sign/sign.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        roles: '',
        signTxt: '立即签到',
        speciallist: [],
        isSingn: Boolean,
        quanData: []
    },
    signIn(e) {
        app.http({
                url: app.api.ApiSign
            }).then(res => {
                if (res.error_code === 1) {
                    wx.showToast({
                        title: '亲，您已签到过了哦~',
                        icon: 'none'
                    })
                } else if (res.error_code === 0) {
                    let todayDate = app.util.formatDate(new Date())
                    wx.showToast({
                        title: '签到成功'
                    })

                    speciallist.push({
                        date: todayDate,
                        background: '#3C93FF',
                        color: '#fff'
                    })

                    this.setData({
                        speciallist: speciallist,
                        signTxt: '签到成功'
                    })
                }
            })
            // let todayDate = app.util.formatDate(new Date())
            // if (this.data.isSingn) {
            //     wx.showToast({
            //         title: '亲，您已签到过了哦~',
            //         icon: 'none'
            //     })
            //     return
            // }

        // let speciallist = this.data.speciallist
        // app.http({
        //         url: app.api.ApiSign
        //     }).then(res => {
        //         if (res.error_code === 0) {
        //             wx.showToast({
        //                 title: res.msg
        //             })

        //             speciallist.push({
        //                 date: todayDate,
        //                 background: '#EB4949',
        //                 color: '#fff'
        //             })

        //             this.setData({
        //                 speciallist: speciallist,
        //                 signTxt: '签到成功'
        //             })

        //         }
        //     })


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
        // this.getData();
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