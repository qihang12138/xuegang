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
        status: '',
        flag: 1
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
        var msgObj = this.data.msgObj,
            flag = true
        for (const key in msgObj) {
            if (msgObj.hasOwnProperty(key)) {
                const element = msgObj[key];
                if (element === '' || element.length === 0) {
                    flag = false;
                    break;
                }
            }
        }

        if (!flag) {
            app.util.toast({
                title: '请填写完整资料',
                icon: 'none'
            }).then(() => {
                flag = true
            })
            return
        }
        if (flag) {
            this.setData({ flag: 0 })
            app.util.verifyPhone(msgObj.gain_phone).then(res => {
                app.util.verifyPhone(msgObj.phone).then(res => {
                    app.http({
                        url: app.api.ApiPublish,
                        data: msgObj,
                        method: 'POST'
                    }).then(res => {
                        if (res.error_code === 0) {
                            app.util.toast({
                                title: '任务发布成功'
                            }).then(() => {
                                wx.navigateBack({
                                    delta: 1
                                })
                            })
                        }
                        this.setData({
                            flag: 1
                        })
                    })
                })

            })
        }

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
                        status: status[data.lot[0].status]
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