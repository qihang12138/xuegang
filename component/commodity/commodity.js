// component/commodity/commodity.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        for: {
            type: Array,
            value: ""
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        spec: '',
        cartShow: false,
        sidIndex: 0,
        g_name: '',
        gid: '',
        sid: '',
        num: 1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cart(e) {
            var gid = e.currentTarget.dataset.gid;
            this.setData({ gid: gid })
            app.http({
                url: app.api.ApiGoodsDetail,
                data: { gid: gid }
            }).then(res => {
                let { error_code, data } = res;
                if (error_code === 0) {
                    this.setData({
                        cartShow: true,
                        spec: data.spec,
                        g_name: data.goods.g_name,
                        sid: data.spec[0].sid
                    })
                }
            })
        },
        onClose() {
            this.setData({ cartShow: false });
        },
        stepper(event) {
            this.setData({ num: event.detail });
        },
        changeSpec(e) {
            var sid = e.currentTarget.dataset.sid;
            this.setData({ sid: sid });
        },
        submit() {
            var data = this.data;
            app.http({
                url: app.api.ApiSaveCar,
                data: {
                    gid: data.gid,
                    sid: data.sid,
                    num: data.num
                },
                method: 'POST'
            }).then(res => {
                if (res.error_code === 0) {
                    this.setData({
                        cartShow: false,
                    })
                    app.util.toast({
                        title: '添加成功'
                    })
                }
            })
        },
    }
})