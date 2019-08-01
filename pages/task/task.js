// pages/task/task.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: '',
        types: [{
                id: 0,
                name: '普通'
            },
            {
                id: 1,
                name: '加急'
            }
        ],
        show: false,
        msgObj: {
            g_name: '',
            type: '',
            gain_phone: '',
            phone: '',
            obtain: '',
            end: '',
            profit: '',
            time: '',
            content: ''
        },
        status: ''
    },
    changeMsg(e) {
        var id = e.currentTarget.dataset.id,
            msgObj = 'msgObj.' + id;
        this.setData({
            [msgObj]: e.detail
        })
    },
    changeShow() {
        var show = this.data.show;
        this.setData({ show: !show })
    },
    changeType(e) {
        this.setData({
            ['msgObj.type']: e.detail.id,
            type: e.detail.name
        })
        this.changeShow();
    },
    submit() {
        var msgObj = this.data.msgObj;
        app.http({
            url: app.api.ApiPublish,
            data: msgObj,
            method: 'POST'
        }).then(res => {

        })
    },
    task(e) {
        var index = e.detail.index;
        if (index === 1) {
            app.http({
                url: app.api.ApiTask
            }).then(res => {
                if (res.error_code === 0) {
                    var status = ['待抢单', '待取货', '配送中', '已完成'];
                    var data = res.data
                    this.setData({
                        task: data.lot,
                        status: status[data.status]
                    })
                }
            })
        }
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