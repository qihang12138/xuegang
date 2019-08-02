// pages/join/join.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        flag: 1,
        schedule: 1,
        band: [],
        name: '',
        phone: '',
        community: '',
        addr: '',
        license: '',
        positive: '',
        reverse: '',
        steps: [{
                text: '我的申请'
            },
            {
                text: '已接受'
            },
            {
                text: '正在审核'
            },
            {
                text: '成功'
            }
        ],
        active: 2,
        hintShow: false
    },
    onInput(e) {
        var id = e.currentTarget.dataset.id,
            value = e.detail;
        this.setData({
            [id]: value
        })
        console.log(this.data);
    },
    change(event) {
        var band = this.data.band;
        this.setData({
            flag: event.detail.index + 1,
            name: '',
            phone: '',
            community: '',
            addr: ''
        })
        this.schedule(band);
    },
    singleUpload() {
        let _this = this;

        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths,
                    tempImg = tempFilePaths[0];
                _this.setData({ logoThumb: tempImg })
                app.upload({
                    url: app.api.ApiUploadFile,
                    filePath: tempImg,
                    name: 'file'
                }).then(res => {
                    _this.setData({ license: res.data.file_data })
                })
            }
        })
    },
    submit() {
        var data = this.data;
        var msgObj = {
            type: data.flag,
            name: data.name,
            phone: data.phone,
            community: data.community,
            addr: data.addr,
            positive: data.positive,
            reverse: data.reverse,
            license: data.license
        }
        app.http({
            url: app.api.ApiApply,
            data: msgObj,
            method: 'POST'
        }).then(res => {

        })
    },
    getData() {
        app.http({
            url: app.api.ApiGetApply
        }).then(res => {
            if (res.error_code === 0) {
                var band = res.data.band;
                this.setData({
                    pageData: res.data
                })
                if (band !== []) {
                    this.setData({
                        band: band
                    })
                    this.schedule(band);
                }
            }
        })
    },
    schedule(band) {
        var data = this.data
        this.setData({ schedule: 1 })
        band.forEach(item => {
            if (item.type === data.flag) {
                this.setData({
                    schedule: 0
                })
                if (item.status === 0) {
                    this.setData({ active: 2 });
                } else if (item.status === 1) {
                    this.setData({ active: 4 });
                } else if (item.status === 2) {
                    this.setData({
                        active: 3,
                        hintShow: true,
                        cause: item.cause
                    })
                }
            }

        });
    },
    changeHint() {
        this.setData({ hintShow: false });
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