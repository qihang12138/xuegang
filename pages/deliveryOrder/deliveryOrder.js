// pages/deliveryOrder/deliveryOrder.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        gid: 0,
        sid: 0,
        num: 0,
        commodity: '',
        site: { id: 0 },
        siteId: 0,
        siteBol: false,
        ticket: [],
        remark: '',
        cart: 0,
        order: '',
        type: 0,
        price_type: 0
    },
    getSite() {
        var siteId = this.data.siteId
        if (siteId !== 0) {
            // 获取地址
            app.http({
                url: app.api.ApiAddrLister
            }).then(res => {
                if (res.error_code === 0) {
                    if (res.data.list.length === 0) {
                        this.setData({ siteBol: true })
                    } else {
                        res.data.list.forEach(item => {
                            if (item.id === siteId) {
                                this.setData({
                                    site: item,
                                    siteBol: false
                                })
                            }
                        });
                    }
                }
            })
        }
    },
    getData() {
        var data = this.data,
            msgObjs = [{
                site_id: data.siteId,
                name: data.name,
                phone: data.phone,
                gid: data.gid,
                sid: data.sid,
                num: data.num,
                price_type: data.price_type
            }, {
                gid: data.gid,
                sid: data.sid,
                num: data.num
            }],
            type = data.type;

        app.http({
            url: type ? app.api.ApiQuerenToo : app.api.ApiQueren,
            data: msgObjs[type],
        }).then(res => {
            if (res.error_code === 0) {
                // this.setData({ commodity: res.data.goods })
                if (res.data.addr !== {}) {
                    this.setData({
                        siteBol: false,
                        site: type ? res.data.addr : { id: 1 },
                        commodity: res.data.return_data[0].goods_data[0],
                        price: res.data.return_data[0].price_detail[0]
                    })
                }
            }
        })
    },

    changeRemark(e) {
        this.setData({ remark: e.detail.value });
    },
    submit() {
        var _this = this,
            data = this.data,
            cart = data.cart,
            msgObjs = [
                [{
                    site_id: data.siteId,
                    name: data.name,
                    phone: data.phone,
                    gid: data.gid,
                    sid: data.sid,
                    num: data.num,
                    content: data.remark,
                    price_type: data.price_type
                }, {
                    site_id: data.siteId,
                    name: data.name,
                    phone: data.phone,
                    content: data.remark,
                }],
                [{
                    site_id: data.site.id,
                    content: data.remark,
                    sid: data.sid,
                    num: data.num,
                    gid: data.gid
                }, {
                    site_id: data.site.id,
                    content: data.remark
                }]
            ],
            Apis = [
                [app.api.ApiSubmitOrder, app.api.ApiSubmitCar],
                [app.api.ApiSubmitOrderToo, app.api.ApiSubmitCarToo]
            ],
            type = data.type,
            cart = data.cart;
        app.http({
            url: Apis[type][cart],
            data: msgObjs[type][cart],
            method: 'POST'
        }).then(res => {
            if (res.error_code === 0) {
                app.http({
                    url: app.api.ApiPay,
                    data: {
                        oid: res.data.oid
                    }
                }).then(data => {
                    wx.requestPayment({
                        timeStamp: data.timeStamp,
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: 'MD5',
                        paySign: data.paySign,
                        success(res) {
                            var price = cart ? _this.data.pageData.price_detail.all_price : _this.data.price.now_price;
                            console.log(price);
                            wx.reLaunch({
                                url: '../orderResult/orderResult?bol=1&price=' + price
                            })
                        },
                        fail(res) {
                            wx.reLaunch({
                                url: '../orderResult/orderResult?bol=0'
                            })
                        }
                    })

                })
            }
        })
    },
    cartTooData() {
        var data = this.data,
            msgObj = {
                name: data.name,
                phone: data.phone,
                site_id: data.siteId
            },
            type = data.type,
            gid = this.data.gid;

        app.http({
            url: type ? app.api.ApiCarQuerenToo : app.api.ApiCarQueren,
            data: type ? '' : msgObj
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({
                    pageData: res.data,
                    siteBol: false,
                    site: res.data.addr,
                    price: res.data.price_detail
                })
                console.log(this.data.price);
            }

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        var type = options.type - 0,
            cart = options.cart - 0;
        console.log(cart);

        this.setData({
            gid: options.gid,
            num: options.num,
            sid: options.sid,
            price: options.price - 0,
            type: type,
            cart: cart
        });
        if (!type) {
            this.setData({
                name: options.name,
                phone: options.phone,
                siteId: options.siteId
            })
        }
        if (cart) {
            // this.setData({ cart: 0 })
            this.cartTooData();
        } else {
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
        if (this.data.type == 1) {
            this.getSite();
        }
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