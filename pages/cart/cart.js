// pages/cart/cart.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        price: 0,
        checked: true,
        stepper: 1,
        type: 2,
        del: false,
        distribution: 0
    },
    changeCart(e) {
        this.setData({ distribution: e.detail.index });
        this.getData();
    },
    getData() {
        app.http({
            url: app.api.ApiCarLister,
            data: {
                distribution: this.data.distribution
            },
            method: 'POST'
        }).then(res => {
            this.setData({ type: 2 });
            if (res.error_code === 0) {
                var data = res.data.car_list;
                this.setData({ pageData: data });
                this.editData();
                if (data.length === 0) {
                    this.setData({ type: 1 })
                }
            }
        })
    },
    editData(e) {
        var data = this.data.pageData;
        var price = 0;
        if (e) {
            var id = e.currentTarget.dataset.id;
        }
        this.setData({ del: false });
        data.forEach(item => {
            if (e) {
                if (id === item.id) {
                    item.num = e.detail
                    this.setData({ pageData: data });
                }
            }
            if (item.status === 1) {
                this.setData({ del: true });
                price += item.g_xprice * item.num
            } else {
                this.setData({ type: 1 })
            }
        })
        this.setData({
            pageData: data,
            price: price * 100
        })


    },
    changeNum(e) {
        app.http({
            url: app.api.ApiIncreaseReduce,
            data: {
                id: e.currentTarget.dataset.id,
                num: e.detail
            },
        }).then(res => {
            if (res.error_code === 0) {
                this.editData(e);
            }
        })
    },
    status() {
        var price = 0,
            type = 2,
            data = this.data.pageData;
        data.forEach(item => {
            if (item.status === 0) {
                type = 1;
            }
        })

        app.http({
            url: app.api.ApiCancel,
            data: {
                status: 1,
                type: type
            },
            method: 'POST'
        }).then(res => {
            this.setData({ type: 2 });
            data.forEach(item => {
                item.status = type === 2 ? 0 : 1
            })
            this.editData();
        })
    },
    checked(e) {
        var price = 0,
            id = e.currentTarget.dataset.id,
            data = this.data.pageData,
            type = 2;

        data.forEach(item => {
            if (item.id === id) {
                type = item.status + 1
                item.status = item.status ? 0 : 1
                this.setData({ pageData: data });
            }
        })
        app.http({
            url: app.api.ApiCancel,
            data: {
                status: 0,
                id: id,
                type: type
            },
            method: 'POST'
        }).then(res => {
            this.setData({
                type: 2,
                del: false
            });
            data.forEach(item => {
                if (item.status === 1) {
                    this.setData({ del: true });
                    price += item.g_xprice * item.num
                } else {
                    this.setData({ type: 1 })
                }
            })
            this.setData({ price: price * 100 });
        })
    },

    del() {
        app.http({
            url: app.api.ApiDeleteCar
        }).then(res => {
            if (res.error_code === 0) {
                this.getData();
            }
        })
    },
    buy() {
        var cart = this.data.distribution;

        wx.navigateTo({
            url: cart ? '/pages/deliveryOrder/deliveryOrder?cart=1&type=1' : '/pages/submitOrder/submitOrder?cart=1'
        })
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