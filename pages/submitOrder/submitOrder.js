// pages/submitOrder/submitOrder.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msgObj: {
            site_id: '',
            name: '',
            phone: ''
        },
        site: '请选择自提站点',
        cart: 0
    },
    change(e) {
        var value = e.detail.value,
            id = e.currentTarget.dataset.id,
            msgObj = 'msgObj.' + id;
        this.setData({
            [msgObj]: value
        })
    },
    next() {
        var msgObj = this.data.msgObj,
            data = this.data,
            flag = true;
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
            app.util.verifyPhone(msgObj.phone).then(res => {
                wx.navigateTo({
                    url: '/pages/deliveryOrder/deliveryOrder?type=0&gid=' + data.gid + '&sid=' + data.sid + '&num=' + data.num + '&type=0&siteId=' + data.msgObj.site_id + '&name=' + data.msgObj.name + '&phone=' + data.msgObj.phone + '&cart=' + data.cart
                })
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            gid: options.gid,
            num: options.num,
            sid: options.sid,
        });
        if (options.cart) {
            this.setData({ cart: options.cart })
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