import area from '../../utils/area.js'
// pages/receiving/receiving.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msgObj: {
            name: '',
            phone: '',
            place: [],
            home: '',
            default: 0,
        },
        areaList: area,
        show: false,
        confirm: false,
        operate: false,
        id: 0,
        flag: 0
    },
    onChange({ detail }) {
        // 需要手动对 checked 状态进行更新
        var msgObj = "msgObj.default";
        this.setData({
            [msgObj]: detail
        });
    },
    site() {
        this.setData({ show: true });
    },
    onClose() {
        this.setData({ show: false });
    },
    changeMsgObj(e) {
        var kind = e.currentTarget.dataset.kind;
        var msgObj = "msgObj." + kind;
        this.setData({
            [msgObj]: e.detail.value
        });
    },
    confirm(e) {
        var msgObj = "msgObj.place";
        var place = ''
        e.detail.values.forEach(item => {
            place += item.name + ' '
        })
        this.setData({
            [msgObj]: place,
            confirm: true
        });
        this.onClose();
        console.log(this.data.msgObj)
    },
    save() {
        this.postData();
    },
    delete() {
        app.http({
            url: app.api.ApiDeleteAddr,
            data: { id: this.data.id }
        }).then(res => {
            if (res.error_code === 0) {
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },
    postData() {
        var url = this.data.operate ? app.api.ApiUpdateAddr : app.api.ApiSaveAddr;
        var msgObj = this.data.msgObj;
        app.http({
            url: url,
            data: msgObj,
            method: 'POST'
        }).then(res => {
            if (res.error_code === 0) {
                if (this.data.flag) {
                    wx.navigateBack({
                        delta: 1
                    })
                } else {
                    // wx.redirectTo({
                    //     url: '/pages/receivingList/receivingList?select=1'
                    // })
                    wx.navigateBack({
                        delta: 1
                    })
                }

            }
        })
    },
    getData() {
        app.http({
            url: app.api.ApiAddrLister
        }).then(res => {
            if (res.error_code === 0) {
                var id = +this.data.id;
                var data = res.data.list
                data.forEach(item => {
                    if (item.id === id) {
                        this.setData({ msgObj: item })
                        return;
                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.id) {
            this.setData({
                operate: true,
                id: options.id,
                flag: options.flag
            });
            this.getData();
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